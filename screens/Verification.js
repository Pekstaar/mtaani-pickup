import {useNavigation} from '@react-navigation/native';
import {Box, Button, Center, HStack, Input, Pressable, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorAlert, SuccessAlert} from '../components';
import {COLORS, FONTS, SIZES} from '../constants';
import {MODAL_TIMEOUT} from '../globals/Utils';
import {reset, verifyUser} from '../Redux/reducers/authSlice';
import {LoadingButton, SubmitButton} from './Credentials';
import {Header} from './Login';
import {Keyboard} from 'react-native';

const Verification = ({
  route: {
    params: {phone, id},
  },
}) => {
  // input references:
  const VerificationInputRef = useRef();

  useEffect(() => {
    VerificationInputRef.current.focus();
  }, []);

  const [otp, setOtp] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const [validation, setValidation] = useState({
    isError: false,
    message: '',
  });
  const [showModal, setShowModal] = useState({
    type: '',
    show: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const {isSuccess, isError, message, user} = useSelector(state => state?.auth);
  const dispatch = useDispatch();

  const codeArray = new Array(5).fill(0);

  const showSuccessModal = pMessage => {
    setShowModal({
      type: 'success',
      show: true,
      message: pMessage,
    });
    setLoading(false);
  };

  const showErrorModal = pMessage => {
    setShowModal({
      type: 'error',
      show: true,
      message: pMessage,
    });
    setLoading(false);
  };

  const resetModal = () => {
    setShowModal({
      type: '',
      show: false,
      message: '',
    });
  };

  const resetModalOnTimeout = time => {
    setTimeout(function () {
      resetModal();
    }, time);
  };

  useEffect(() => {
    if (validation?.isError) {
      showErrorModal(validation?.message);

      resetModalOnTimeout(MODAL_TIMEOUT);
    }

    if (validation?.isSuccess) {
      navigation.navigate('login');
    }

    if (isSuccess) {
      showSuccessModal('Verification Successfull!');

      resetModalOnTimeout(MODAL_TIMEOUT);

      navigation.navigate('Login');
    }

    return () => {
      dispatch(reset());
      setLoading(false);
    };
  }, [isSuccess, isError, message, validation]);

  const handleVerify = () => {
    setLoading(true);
    if (otp?.length < 5) {
      setValidation({
        isError: true,
        message: 'Invalid Code!',
        isSuccess: false,
      });
      setLoading(false);
      return;
    }
    const code = otp?.join();
    dispatch(verifyUser({id: user?._id || id, code: code}));
    // navigation.navigate('login');
  };

  const handlePress = () => {
    setInputIsFocused(true);
    VerificationInputRef.current.focus();
    Keyboard?.emit;
  };

  const fillCodeDigitInput = (value, index) => {
    const emptyChar = ' ';
    // const code = otp?.split('');
    const digit = otp[index] || emptyChar;
    const isCurrentDigit = index === otp?.length;
    const isLastDigit = index === 4;
    const isCodeFull = otp.length === 5;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <CodeInput
        current={isDigitFocused && inputIsFocused}
        handlePress={handlePress}
        code={digit}
      />
    );
  };

  return (
    <>
      {showModal?.type === 'error' ? (
        <ErrorAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={showModal?.message}
        />
      ) : showModal?.type === 'success' ? (
        <SuccessAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={showModal?.message}
        />
      ) : (
        <></>
      )}

      <Box safeArea p={3}>
        {/* Header */}
        <Header title={'Verify Phone number'} />

        <Box>
          <Text
            color={'gray.500'}
            my={2}
            fontWeight={600}
            fontSize={SIZES.sm + 0.5}>
            A 4 digit code has been sent via SMS to {phone}. Paste the code here
          </Text>
          {/* <Text>{JSON.stringify(otp)}</Text> */}

          <Center>
            <HStack space={3} justifyContent={'center'} py={5}>
              {codeArray?.map(fillCodeDigitInput)}
              <Input
                position="absolute"
                width={1}
                height={1}
                keyboardType="number"
                returnKeyType="done"
                textContentType="oneTimeCode"
                ref={VerificationInputRef}
                onChangeText={text => setOtp(prev => text.split(''))}
                maxLength={5}
                opacity={0}
              />
            </HStack>

            {loading ? (
              <LoadingButton />
            ) : (
              <SubmitButton text={'VERIFY CODE'} handlePress={handleVerify} />
            )}
          </Center>
        </Box>
      </Box>
    </>
  );
};

const CodeInput = ({code, current, handlePress}) => (
  <Pressable onPress={handlePress}>
    <Center
      fontSize={'md'}
      borderColor={!current ? 'warmGray.400' : 'primary'}
      borderWidth={2}
      w={12}
      h={12}
      borderRadius={'lg'}>
      <Text fontSize={'lg'} fontWeight={'medium'}>
        {code}
      </Text>
    </Center>
  </Pressable>
);

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    width: 50,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: SIZES.xl,
    fontFamily: FONTS.semibold,
  },
});

export default Verification;
