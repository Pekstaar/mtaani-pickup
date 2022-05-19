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
// import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  reset,
  fetchUserFromStorage,
} from '../Redux/reducers/authSlice';
// import { MODAL_TIMEOUT } from "../globals/Utils";
import {ErrorAlert, SuccessAlert} from '../components';
import {LoadingButton, SubmitButton} from './Credentials';
import {MODAL_TIMEOUT} from '../globals/Utils';
``;

const Login = () => {
  const {isSuccess, isLoading, isError, message, user, isLoadingPage} =
    useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

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
  // const [pageLoading, setPageLoading] = useState(false);

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

  const handleLogin = () => {
    setLoading(true);

    if (phone === '') {
      setValidation({
        isError: true,
        message: 'please input your email!',
        isSuccess: false,
      });

      setLoading(false);
      return;
    } else if (password === '') {
      setValidation({
        isError: true,
        message: 'please input your password!',
        isSuccess: false,
      });

      setLoading(false);
      return;
    }

    try {
      dispatch(
        loginUser({phone_number: phone.trim(), password: password.trim()}),
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  // Use Effect

  useEffect(() => {
    dispatch(fetchUserFromStorage());
    if (user?.token) {
      navigation.navigate('dashboard');
      console.log(user);
    }

    return () => {
      dispatch(reset());
    };
  }, [user]);

  useEffect(() => {
    if (validation?.isError) {
      showErrorModal(validation?.message);

      resetModalOnTimeout(MODAL_TIMEOUT);
    }

    if (validation?.isSuccess) {
      // navigation.navigate("login");
      console.log('Login SUccess');
    }

    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (isSuccess) {
      showSuccessModal('Login Successfull!');

      resetModalOnTimeout(MODAL_TIMEOUT);
    }

    if (user?.token) {
    }
    return () => {
      dispatch(reset());
      setLoading(false);
    };
  }, [isSuccess, isLoadingPage, isLoading, isError, message, validation, user]);

  // if (pageLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Spinner color={'primary'} size="lg" />
  //     </View>
  //   );
  // }

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
          <Header title={'Enter login details'} />

          {/* inputs */}
          <TextInput
            icon={<SimpleLineIcons name="screen-smartphone" />}
            placeholder={'youremail@mail.com'}
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
                onPress={() => console.log('Google Pressed!')}>
                <Icon size={7} color="primary" as={<FIcon name="google" />} />
              </Button>

              {/* Facebook button */}
              <Button
                bg={'secondary'}
                borderRadius={'full'}
                height={12}
                width={12}
                onPress={() => console.log('Google Pressed!')}
                pl="5">
                <Icon
                  size={7}
                  color="primary"
                  as={<FIcon name="facebook-f" />}
                />
              </Button>

              {/* Facebook button */}
              <Button
                bg={'secondary'}
                borderRadius={'full'}
                height={12}
                width={12}
                onPress={() => console.log('Google Pressed!')}>
                <Icon
                  size={7}
                  color="primary"
                  as={<IONIcon name="phone-portrait" />}
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
