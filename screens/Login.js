import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  // ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IONIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../constants';
import {SIZES} from '../constants';
import Line from '../components/Line';
import {PasswordInput, TextInput} from '../components/Input';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

// import { MODAL_TIMEOUT } from "../globals/Utils";
import {ErrorAlert, SuccessAlert} from '../components';
import {LoadingButton, SubmitButton} from './Credentials';
import {MODAL_TIMEOUT} from '../globals/Utils';
import AuthService from '../services/AuthService';
import AsyncStorageService from '../services/AsyncStorageService';
import {useDispatch, useSelector} from 'react-redux';
import {loginWithFacebook, loginWithGoogle} from '../Redux/reducers/authSlice';

const Login = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  const NEXT_SCREEN = 'about_business';

  // manage state
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState({type: '', show: false});
  const [modalMessage, setModalMessage] = useState('');
  const [validation, setValidation] = useState({
    message: '',
    isError: false,
    isSuccess: false,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const {isSuccess, isLoading, isError, message} = useSelector(
    state => state.auth,
  );

  // METHODS
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

  const validateCredentials = () => {
    if (phone === '') {
      setValidation({
        isError: true,
        message: 'please input Phone number!',
        isSuccess: false,
      });

      return false;
    } else if (phone.length < 9 || phone.length > 10) {
      setValidation({
        isError: true,
        message: 'Invalid phone number!',
        isSuccess: false,
      });

      return false;
    } else if (password === '') {
      setValidation({
        isError: true,
        message: 'please input your password!',
        isSuccess: false,
      });

      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setLoading(true);

    const isValidationSuccessful = validateCredentials();

    if (isValidationSuccessful) {
      AuthService.loginUser({
        phone_number: phone,
        password,
      })
        .then(user => {
          showSuccessModal('Login Succesful!');
          resetModalOnTimeout(MODAL_TIMEOUT);

          if (user?.token) {
            navigation.navigate('about_business');
          }
        })
        .catch(e => {
          showErrorModal(e?.response?.data?.message || e?.message || e);

          resetModalOnTimeout(MODAL_TIMEOUT);

          setLoading(false);
          console.log(e);
          return;
        });
    } else {
      setLoading(false);
      return;
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const {accessToken} = await AuthService.facebookLogin();

      const userDetails = await AuthService.fetchFacebookUserDetails(
        accessToken,
      );

      const userExistsInDb = await AuthService.isExisting(userDetails?.email);
      if (userExistsInDb) {
        console.log('User Exists!');
      } else {
        // navigate to registration screen and pass parameters
        navigation.navigate('credentials', {
          details: userDetails,
        });

        // register user to db:
        // fields to collect:
        // all
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);

      return;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googleUserDetails = await AuthService.googleLogin();

      const userExistsInDb = await AuthService.isExisting(
        googleUserDetails?.email,
      );

      if (userExistsInDb) {
        console.log('User exists in database!');
      } else {
        navigation.navigate('credentials', {
          details: googleUserDetails,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      return;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setPageLoading(true);

      const user = await JSON.parse(await AsyncStorageService.getData('user'));

      if (user?.token) {
        setPageLoading(false);
        navigation.navigate(NEXT_SCREEN);
      } else {
        setPageLoading(false);
      }
    };

    fetchUser();

    return () => {
      setPageLoading(false);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      setModalMessage(message);
      setShowModal({type: 'error', show: true});

      setTimeout(function () {
        setShowModal(prev => ({...prev, show: false}));
        setModalMessage('');
      }, 2500);
    }

    if (isSuccess) {
      console.log('Facebook  Successfull!');

      // navigation.navigate(NEXT_SCREEN);
      //
    }

    if (isLoading) {
      console.log('loading...');
      setLoading(true);
    }

    return () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (validation?.isError) {
      showErrorModal(validation?.message);

      resetModalOnTimeout(MODAL_TIMEOUT);
    }

    if (validation?.isSuccess) {
      // navigation.navigate(NEXT_SCREEN);
    }

    return () => {
      setLoading(false);
    };
  }, [validation]);

  // Use Effect

  if (pageLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color={'primary'} />
      </Center>
    );

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
      <Box position={'relative'} height="full">
        <VStack
          position={'absolute'}
          bottom={0}
          left={'0'}
          right="0"
          height={'4/6'}
          mx={5}
          space={8}>
          {/* title */}
          <Header title={'Enter  details'} />

          {/* inputs */}
          <TextInput
            icon={<SimpleLineIcons name="screen-smartphone" />}
            placeholder={'phone number'}
            preInputText={'+254'}
            value={phone}
            handleChange={number => setPhone(number)}
          />

          {/* password */}
          <Box>
            <PasswordInput
              icon={<AntDesign name="lock" />}
              placeholder={'Enter password'}
              preInputText={'Password'}
              type={'password'}
              value={password}
              handleChange={pwd => setPassword(pwd)}
            />

            <Text ml={6} fontWeight={600} fontSize={'xs'} mt={2}>
              Forgot Password?{' '}
              <Text
                fontWeight={700}
                fontSize={SIZES.sm + 1}
                textDecorationLine={'underline'}>
                Click Here
              </Text>
            </Text>
          </Box>

          {loading ? (
            <LoadingButton />
          ) : (
            <SubmitButton text={'LOG IN'} handlePress={handleLogin} />
          )}

          {/* social icons */}
          <Center>
            <Text fontWeight={700} fontSize={SIZES.md - 1}>
              --------&nbsp; Or continue with &nbsp; ---------
            </Text>

            <HStack space={6} py={3}>
              {/* Google connect button */}
              <Button
                bg={'secondary'}
                borderRadius={'full'}
                p="3"
                onPress={handleGoogleLogin}>
                <Icon size={7} color="primary" as={<FIcon name="google" />} />
              </Button>

              {/* Facebook button */}
              <Button
                bg={'secondary'}
                borderRadius={'full'}
                height={12}
                width={12}
                onPress={handleFacebookLogin}
                pl="5">
                <Icon
                  size={7}
                  color="primary"
                  as={<FIcon name="facebook-f" />}
                />
              </Button>
            </HStack>

            <Text color="gray.500" mt={3} fontWeight={600}>
              Don't have an account?&nbsp;
              <Text
                color={'secondary'}
                textDecorationLine={'underline'}
                onPress={() => navigation.navigate('credentials')}>
                Register here
              </Text>
            </Text>
          </Center>
        </VStack>
      </Box>
    </>
  );
};

export default Login;

export const Header = ({title}) => (
  <HStack px={1} alignItems={'center'}>
    {/* <Line /> */}

    <Text fontWeight={700} fontSize={SIZES.lg}>
      {title}
    </Text>
  </HStack>
);
