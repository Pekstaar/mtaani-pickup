import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {LoadingButton, SubmitButton} from './Credentials';
import {Header} from './Login';
import Toast from '../components/general/toasts';
import AuthService from '../services/AuthService';
import CButton from '../components/general/Buttons';

const EmailVerification = ({route: {params}}) => {
  // input references:

  let otpInputRef = useRef();
  const toast = useToast();

  const [otp, setOtp] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const navigation = useNavigation();
  const {user} = params || {};
  // const dispatch = useDispatch();

  const VERIFICATION_LENGTH = useMemo(() => 5, []);

  const codeArray = new Array(VERIFICATION_LENGTH).fill(0);

  const handleVerify = () => {
    setLoading(true);
    if (otp?.length < 5) {
      toast.show({
        render: () => {
          return <Toast.error message={'Invalid Code!'} />;
        },
      });
      setLoading(false);

      return;
    }

    const code = parseInt(otp?.join(''));
    // dispatch(verifyUser({id: user?._id || id, code: code}));

    AuthService.activateUser({id: user?._id, code})
      .then(r => {
        toast.show({
          render: () => {
            return <Toast.success message={r?.message} />;
          },
        });

        setLoading(false);
        navigation.navigate('about_business');
      })
      .catch(err => {
        toast.show({
          render: () => {
            return (
              <Toast.error
                message={JSON.stringify(err?.response?.data?.message)}
              />
            );
          },
        });

        setLoading(false);
      });
    // navigation.navigate('login');
  };

  // const handleFocus = () => {
  //   ref.current.focus();
  // };
  // handle verification input press
  const handlePress = () => {
    otpInputRef.current.focus();
    // console.log('Input pressed');
    setInputIsFocused(true);
    // Keyboard?.emit;
  };

  // useEffect(() => {
  //   handleFocus();
  // }, []);

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

  const handleResend = () => {
    setResending(true);
    AuthService.resendVerificationCode(user?._id)
      .then(r => {
        //
        toast.show({
          render: () => {
            return <Toast.success message={r?.message} />;
          },
        });
        setResending(false);
      })
      .catch(err => {
        console.log(err?.response?.data?.message);
        setResending(false);
      });
  };

  return (
    <>
      <Box safeArea p={3}>
        {/* Header */}
        <Header title={'Verify Email'} />

        <TextInput
          ref={otpInputRef}
          keyboardType="number-pad"
          style={{
            backgroundColor: '#ddd',
            bottom: 0,
            right: 0,
            opacity: 0,
            position: 'absolute',
            width: 5,
            height: 5,
          }}
          onChangeText={text => setOtp(text.split(''))}
          maxLength={5}
        />
        {/* <Button onPress={() => ref.current.focus()}> Press</Button> */}

        <Box>
          <Text
            color={'gray.500'}
            my={2}
            fontWeight={600}
            fontSize={SIZES.sm + 0.5}>
            A {VERIFICATION_LENGTH} digit code has been sent via email to{' '}
            {user?.email}. Please type in the code
          </Text>
          {/* <Text>{JSON.stringify(otp)}</Text> */}

          <Center>
            <Box>
              <HStack space={3} justifyContent={'center'} py={5}>
                {codeArray?.map(fillCodeDigitInput)}
              </HStack>
              <VStack space={'2'}>
                {loading || resending ? (
                  <LoadingButton
                    w={'full'}
                    text={
                      resending ? 'resending code . . .' : 'verifying . . .'
                    }
                  />
                ) : (
                  <SubmitButton
                    width={'full'}
                    text={'VERIFY CODE'}
                    handlePress={handleVerify}
                  />
                )}

                <Box
                  _text={{
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 'lg',
                  }}>
                  or
                </Box>

                <CButton.outlined
                  _text={{color: 'black', fontWeight: '600'}}
                  text={'Verify via SMS'}
                  onPress={() => navigation.navigate('verification')}
                />
              </VStack>
            </Box>

            <Box flexDir={'row'} my={'6'} justifyContent={'center'}>
              Didn't receive code?{' '}
              <Text
                textDecorationLine={'underline'}
                fontWeight={'700'}
                onPress={handleResend}>
                Click here to Resend
              </Text>
            </Box>
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

export default EmailVerification;
