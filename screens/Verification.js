import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Pressable,
  Text,
  useToast,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorAlert, SuccessAlert} from '../components';
import {COLORS, FONTS, SIZES} from '../constants';
import {MODAL_TIMEOUT} from '../src/Utils';
import {reset, verifyUser} from '../Redux/reducers/authSlice';
import {LoadingButton, SubmitButton} from './Credentials';
import {Header} from './Login';
import {Keyboard} from 'react-native';
import Toast from '../components/general/toasts';
import AuthService from '../services/AuthService';

const Verification = ({route: {params}}) => {
  // input references:
  const VerificationInputRef = useRef();
  const toast = useToast();

  const [otp, setOtp] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const [validation, setValidation] = useState({
    isError: false,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const {user} = params;
  // const dispatch = useDispatch();

  const codeArray = new Array(5).fill(0);

  useEffect(() => {
    VerificationInputRef.current.focus();
  }, [inputIsFocused]);

  const handleVerify = () => {
    setLoading(true);
    if (otp?.length < 5) {
      setValidation({
        isError: true,
        message: 'Invalid Code!',
        isSuccess: false,
      });

      toast.show({
        render: () => {
          return <Toast.error message={'Invalid Code!'} />;
        },
        placement: 'top',
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    const code = otp?.join();
    // dispatch(verifyUser({id: user?._id || id, code: code}));

    AuthService.activateUser({id: user?._id, code})
      .then(r => {
        console.log(r);

        setLoading(false);
      })
      .catch(err => {
        toast.show({
          render: () => {
            return (
              <Toast.error message={JSON.stringify(err?.response?.data)} />
            );
          },
          placement: 'top',
          duration: 3000,
        });

        setLoading(false);
      });
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
        key={index}
        current={isDigitFocused && inputIsFocused}
        handlePress={handlePress}
        code={digit}
      />
    );
  };

  return (
    <>
      <Box safeArea p={3}>
        {/* Header */}
        <Header title={'Verify Phone number'} />

        <Box>
          <Text
            color={'gray.500'}
            my={2}
            fontWeight={600}
            fontSize={SIZES.sm + 0.5}>
            A 4 digit code has been sent via SMS to {user?.phone_number}. Paste
            the code here
          </Text>
          {/* <Text>{JSON.stringify(otp)}</Text> */}

          <Center>
            <HStack space={3} justifyContent={'center'} py={5}>
              {codeArray?.map(fillCodeDigitInput)}
              <Input
                position="absolute"
                width={1}
                height={1}
                keyboardType="number-pad"
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
              <SubmitButton
                width={'220px'}
                text={'VERIFY CODE'}
                handlePress={handleVerify}
              />
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
