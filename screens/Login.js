import React, {useEffect, useState, useMemo} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {assets} from '../constants';
import {SIZES} from '../constants';
import {PasswordInput, TextInput} from '../components/Input';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import {LoadingButton, SubmitButton} from './Credentials';
import AuthService from '../services/AuthService';
import AsyncStorageService from '../services/AsyncStorageService';
import Toast from '../components/general/toasts';
import {useDispatch, useSelector} from 'react-redux';

import {fetchProfileDetails, storeDetailsToLocalStorage} from '../src/Utils';
import {setUser} from '../Redux/reducers/authSlice';
// import {loginWithFacebook, loginWithGoogle} from '../Redux/reducers/authSlice';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const NEXT_SCREEN = useMemo(() => 'drawer', []);
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
  const {user: rUser} = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(false);

    if (rUser?.token) {
      // setLoading(false);
      console.log(rUser);

      navigation.navigate(NEXT_SCREEN);

      return;
    }
    const fetchUser = async () => {
      setPageLoading(true);

      const user = await JSON.parse(await AsyncStorageService.getData('user'));

      if (user?.token) {
        dispatch(setUser(user));

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
    } else if (phone.length < 9 || phone.length > 13) {
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
          // await AsyncStorageService.setData('user', JSON.stringify(user));
          // fetch profile details
          const fetchedDetails = await fetchProfileDetails(user?._id, {
            token: user?.token,
          });

          // console.log(fetchedDetails);

          // store details to redux
          dispatch(setUser(fetchedDetails));

          await storeDetailsToLocalStorage('user', fetchedDetails);

          toast.show({
            render: () => {
              return <Toast.success message={'Login successful!!'} />;
            },
            placement: TOAST_PROPS.placement,
            duration: TOAST_PROPS.duration,
          });

          // console.log(user);
          setLoading(false);
          setPhone('');
          setPassword('');

          if (user?.token) {
            navigation.navigate(NEXT_SCREEN);
          }
        })
        .catch(e => {
          toast.show({
            render: () => {
              return (
                <Toast.error
                  message={e?.response?.data?.message || e?.message}
                />
              );
            },
            placement: TOAST_PROPS.placement,
            duration: TOAST_PROPS.duration,
          });

          setLoading(false);
          return;
        });
    } else {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (loading) {
        // setLoading();
        toast.show({
          render: () => {
            return <Toast.error message={'Request timeout try again later'} />;
          },
          placement: TOAST_PROPS.placement,
          duration: TOAST_PROPS.duration,
        });
        setLoading(false);
      }
    }, 6500);
  };

  const handleSocialUser = async userDetails => {
    try {
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

      if (userExistsInDb && response?.data?.phone_number) {
        await AsyncStorageService?.setData(
          'user',
          JSON.stringify(response?.data),
        );
        // setLoading(false);
        const fetchedDetails = await fetchProfileDetails(response?.data?._id, {
          token: response?.data?.token,
        });
        // console.log(response?.data?.token);

        // console.log(fetchedDetails);

        // store details to redux
        dispatch(setUser(fetchedDetails));

        console.log('Fetched Social details: ', fetchProfileDetails);

        await storeDetailsToLocalStorage('user', fetchedDetails);

        // navigation.navigate(NEXT_SCREEN);

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
    } catch (error) {
      console.log(error);
      toast.show({
        render: () => {
          return <Toast.error message={'Social Login Error!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
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

  // Use Effect

  if (pageLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color={'primary'} />
      </Center>
    );

  return (
    // <PrivateSeller>
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
          <Image
            h={'300px'}
            alt={'map background'}
            source={require('../assets/images/image_bg.jpg')}
          />
        </Box>
        <ScrollView
          position={'absolute'}
          bottom={0}
          left={'0'}
          right="0"
          height={'4/6'}
          mx={5}>
          <VStack space={6}>
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

              <Text ml={6} fontSize={'xs'} mt={2}>
                Forgot Password?&nbsp;
                <Text
                  fontWeight={'800'}
                  textDecorationLine={'underline'}
                  onPress={handleRecoverPassword}
                  py={'2'}>
                  Click Here
                </Text>
              </Text>
            </Box>

            {loading ? (
              <LoadingButton text={'logging in ...'} />
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
                  <Icon
                    size={25}
                    color="primary"
                    as={<FIcon name="google" />}
                  />
                </Button>

                {/* Facebook button */}
                <Button
                  bg={'secondary'}
                  borderRadius={'full'}
                  height={12}
                  width={12}
                  p="3"
                  onPress={handleFacebookLogin}>
                  <Icon
                    size={7}
                    ml={'2'}
                    color="primary"
                    as={<FIcon name="facebook-f" />}
                  />
                </Button>
              </HStack>

              <Box pl={'4'} w={'full'} justifyContent={'center'} mx={'auto'}>
                <Text color="gray.500" textAlign={'center'}>
                  Don't have an account?&nbsp;
                  <Text
                    color={'secondary'}
                    textDecorationLine={'underline'}
                    onPress={() => navigation.navigate('roles')}
                    fontWeight={'700'}>
                    Register here
                  </Text>
                </Text>
              </Box>
            </Center>
          </VStack>
        </ScrollView>
      </Stack>
    </Box>
    // </PrivateSeller>
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
