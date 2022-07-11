import React, {useEffect, useState, useMemo} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  ScrollView,
  // ScrollView,
  Spinner,
  Stack,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {assets} from '../constants';
import {SIZES} from '../constants';
import {PasswordInput, TextInput} from '../components/Input';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

// import { MODAL_TIMEOUT } from "../globals/Utils";
import {LoadingButton, SubmitButton} from './Credentials';
import AuthService from '../services/AuthService';
import AsyncStorageService from '../services/AsyncStorageService';
import Toast from '../components/general/toasts';
// import {loginWithFacebook, loginWithGoogle} from '../Redux/reducers/authSlice';

const Login = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const toast = useToast();

  const NEXT_SCREEN = useMemo(() => 'main', []);
  const TOAST_PROPS = useMemo(
    () => ({placement: 'bottom', duration: 3000}),
    [],
  );

  // manage state
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  // const {isSuccess, isLoading, isError, message} = useSelector(
  //   state => state.auth,
  // );

  const validateCredentials = () => {
    if (phone === '') {
      toast.show({
        render: () => {
          return <Toast.error message={'please provide your phone number!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (phone.length < 9 || phone.length > 10) {
      // setValidation({
      //   isError: true,
      //   message: 'Invalid phone number!',
      //   isSuccess: false,
      // });
      toast.show({
        render: () => {
          return <Toast.error message={'invalid phone number!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (password === '') {
      toast.show({
        render: () => {
          return <Toast.error message={'please provide password!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    const isValidationSuccessful = validateCredentials();

    setLoading(true);

    if (isValidationSuccessful) {
      AuthService.loginUser({
        phone_number: phone,
        password,
      })
        .then(async user => {
          console.log(user);
          await AsyncStorageService.setData('user', JSON.stringify(user));

          toast.show({
            render: () => {
              return <Toast.success message={'Login successful!!'} />;
            },
            placement: TOAST_PROPS.placement,
            duration: TOAST_PROPS.duration,
          });

          if (user?.token) {
            // navigation.navigate(NEXT_SCREEN);
          }
        })
        .catch(e => {
          toast.show({
            render: () => {
              return (
                <Toast.error
                  message={e?.response?.data?.message || e?.message || e}
                />
              );
            },
            placement: TOAST_PROPS.placement,
            duration: TOAST_PROPS.duration,
          });

          setLoading(false);
          console.log(e);
          return;
        });
    } else {
      setLoading(false);
      return;
    }
  };

  const handleSocialUser = async userDetails => {
    setLoading(true);
    const response = await AuthService.authenticateUserSocially({
      f_name: userDetails?.name.split(' ')[0],
      l_name: userDetails?.name.split(' ')[1],
      email: userDetails?.email,
      password: '',
    });

    // console.log(response);

    const userExistsInDb = response.status === 201;
    const userDoesNotExist = response.status === 200;

    await AsyncStorageService?.setData('user', JSON.stringify(response?.data));

    if (userExistsInDb) {
      // setLoading(false);

      navigation.navigate(NEXT_SCREEN);

      toast.show({
        render: () => {
          return <Toast.success message={'Login Successful!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });
    } else if (userDoesNotExist) {
      // setLoading(false);

      navigation.navigate('credentials', {
        details: {
          name: userDetails?.name,
          email: userDetails?.email,
        },
        socialLogin: true,
      });
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const {accessToken} = await AuthService.facebookLogin();

      const userDetails = await AuthService.fetchFacebookUserDetails(
        accessToken,
      );

      handleSocialUser(userDetails);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      return;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googleUserDetails = await AuthService.googleLogin();

      handleSocialUser(googleUserDetails);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      return;
    }
  };

  const handleRecoverPassword = () => {
    navigation.navigate('password_recovery_method');
  };

  useEffect(() => {
    setLoading(false);

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

  // Use Effect

  if (pageLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color={'primary'} />
      </Center>
    );

  return (
    <Box flex={'1'}>
      <Stack position={'relative'} height="full" bg={'white'}>
        <Box>
          <Image
            h={'80px'}
            w={'80px'}
            alt={'pickup logo'}
            position={'absolute'}
            resizeMode={'contain'}
            alignSelf={'center'}
            top={50}
            zIndex={'3'}
            source={assets.pickupLogoPng}
          />
          <Image h={'300px'} alt={'map background'} source={assets.bgImage} />
        </Box>
        <VStack
          position={'absolute'}
          bottom={0}
          left={'0'}
          right="0"
          height={'4/6'}
          mx={5}
          space={6}>
          {/* title */}
          <Header title={'Enter login details'} />

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
              Forgot Password?
              <Text
                fontWeight={700}
                textDecorationLine={'underline'}
                onPress={handleRecoverPassword}>
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
              ------&nbsp; Or continue with &nbsp; -------
            </Text>

            <HStack space={5} py={3}>
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
          </Center>
        </VStack>
        <Box
          pl={'4'}
          position={'absolute'}
          w={'full'}
          bottom={'4'}
          justifyContent={'center'}
          mx={'auto'}>
          <Text color="gray.500" mt={1} fontWeight={600}>
            Don't have an account?&nbsp;
            <Text
              color={'secondary'}
              textDecorationLine={'underline'}
              onPress={() => navigation.navigate('roles')}>
              Register here
            </Text>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;

export const Header = ({title}) => (
  <HStack px={1} py={3} alignItems={'center'} space={2}>
    {/* <Line /> */}
    <Box
      width={1}
      my={1}
      height={'full'}
      borderRadius={'full'}
      bg={'primary'}
    />

    <Text fontWeight={'700'} fontSize={SIZES.lg}>
      {title}
    </Text>
  </HStack>
);
