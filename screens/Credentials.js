import {useNavigation} from '@react-navigation/native';
import {
  Text,
  Box,
  VStack,
  HStack,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  useToast,
  Center,
} from 'native-base';
import React, {useEffect, useState, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from '../components/general/toasts';
import {LabeledInput} from '../components/Input';
import AuthService from '../services/AuthService';
import {Header} from './Login';
// import Success from '../components/general/toasts'

const Credentials = ({route}) => {
  const {selectedRole} = useSelector(state => state.auth);

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    socialAuth: false,
    role: selectedRole?._id,
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();

  // const NEXT_SCREEN = useMemo(() => 'main', []);
  const TOAST_PROPS = useMemo(
    () => ({placement: 'bottom', duration: 3000}),
    [],
  );

  const validateFields = () => {
    const {firstName, lastName, phone, password, confirmPassword, role, email} =
      credentials;

    if (firstName === '' || firstName === null || !firstName) {
      toast.show({
        render: () => {
          return <Toast.error message={'First name required!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (phone === '' || phone === null || !phone) {
      toast.show({
        render: () => {
          return <Toast.error message={'Phone number required!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (email === '' || email === null || !email) {
      toast.show({
        render: () => {
          return <Toast.error message={'Email required!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (
      !credentials?.socialAuth &&
      (password === '' || password === null || !password)
    ) {
      toast.show({
        render: () => {
          return <Toast.error message={'password required!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (
      !credentials?.socialAuth &&
      (confirmPassword === '' || confirmPassword === null || !confirmPassword)
    ) {
      toast.show({
        render: () => {
          return <Toast.error message={'please confirm password!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    } else if (!credentials?.socialAuth && confirmPassword !== password) {
      toast.show({
        render: () => {
          return <Toast.error message={'Passwords do not match!'} />;
        },
        placement: TOAST_PROPS.placement,
        duration: TOAST_PROPS.duration,
      });

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (route.params) {
      toast.show({
        title: 'Info',
        description: 'Please provide the details above!',
      });

      const {details, socialLogin} = route.params;
      setCredentials(prev => ({
        ...prev,
        firstName: details?.name?.split(' ')[0] || '',
        lastName: details?.name?.split(' ')[1] || '',
        email: details?.email || '',
        socialAuth: socialLogin,
      }));
    }
  }, [route.params]);

  const handleContinue = async () => {
    // navigation.navigate('verification', {
    //   phone: '',
    // });
    // return;

    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);
    const {firstName, lastName, phone, password, role, email} = credentials;

    if (credentials?.socialAuth) {
      //
      try {
        await AuthService?.updateUser({
          f_name: credentials?.firstName,
          l_name: credentials?.lastName,
          email: credentials?.email,
          phone_number: credentials?.phone,
        });

        if (
          await JSON.parse(await AsyncStorageService.getData('user'))?.token
        ) {
          navigation.navigate('dashboard');
        } else {
          navigation.navigate('login');
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.show({
          title: 'ERROR!',
          description: JSON.stringify(
            error || error?.message || error?.response.data,
          ),
        });
        setLoading(false);
        return;
      }
    } else {
      AuthService.registerUser({
        username: firstName.trim() + lastName.trim(),
        f_name: firstName.trim(),
        l_name: lastName.trim(),
        role: role,
        phone_number: phone.trim(),
        password: password.trim(),
        email: email.trim(),
      })
        .then(({saved}) => {
          if (saved._id) {
            toast.show({
              render: () => {
                return (
                  <Toast.success message={'Account created successfully'} />
                );
              },
              placement: TOAST_PROPS.placement,
              duration: TOAST_PROPS.duration,
            });

            navigation.navigate('verification', {user: saved});
          }
          setLoading(false);
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
            placement: TOAST_PROPS.placement,
            duration: TOAST_PROPS.duration,
          });

          setLoading(false);
        });
    }
  };

  return (
    <>
      {/* // if (showModal) { */}

      <Box p={3} safeArea style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
            {/* Header  */}
            <Header title={'Credentials'} />
            {/* inputs */}
            <VStack py={3} space={4}>
              <HStack space={3}>
                <LabeledInput
                  label={'First Name'}
                  placeholder={'First name'}
                  value={credentials.firstName}
                  handleChange={name =>
                    setCredentials(prev => ({...prev, firstName: name}))
                  }
                />
                <LabeledInput
                  label={'Last Name'}
                  placeholder={'Last name'}
                  value={credentials.lastName}
                  handleChange={name =>
                    setCredentials(prev => ({...prev, lastName: name}))
                  }
                />
              </HStack>

              <Box height={20}>
                <LabeledInput
                  label={'Phone Number'}
                  placeholder={'+254'}
                  value={credentials.phone}
                  handleChange={phone =>
                    setCredentials(prev => ({...prev, phone}))
                  }
                />
              </Box>

              <Box height={20}>
                <LabeledInput
                  label={'Email'}
                  placeholder={'E.g. username@email.com'}
                  value={credentials.email}
                  handleChange={email =>
                    setCredentials(prev => ({...prev, email}))
                  }
                />
              </Box>

              {/* passwords */}
              <VStack space={4}>
                {!credentials?.socialAuth && (
                  <Box height={24}>
                    <LabeledInput
                      label={'Create Password'}
                      placeholder={'create a 6 digit password'}
                      exp={
                        'choose an 8 word password, with atleast 1 numerical character.'
                      }
                      type={'password'}
                      value={credentials.password}
                      handleChange={pwd =>
                        setCredentials(prev => ({...prev, password: pwd}))
                      }
                    />
                  </Box>
                )}
                {!credentials?.socialAuth && (
                  <Box height={20} mt={4}>
                    <LabeledInput
                      label={'Confirm Password'}
                      placeholder={'Re-type your password'}
                      type={'password'}
                      value={credentials.confirmPassword}
                      handleChange={cpwd =>
                        setCredentials(prev => ({
                          ...prev,
                          confirmPassword: cpwd,
                        }))
                      }
                    />
                  </Box>
                )}
              </VStack>

              {loading ? (
                <LoadingButton />
              ) : (
                <SubmitButton
                  text={credentials?.socialAuth ? 'UPDATE' : 'CONTINUE'}
                  handlePress={handleContinue}
                />
              )}
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
};

export const LoadingButton = ({text = 'Loading . . .'}) => (
  <Button
    bg={'primary'}
    opacity={'60'}
    borderRadius={'full'}
    mt={4}
    width={'full'}

    // onPress={handleContinue}
  >
    <HStack space={2}>
      <Spinner color={'gray.600'} />
      <Text color={'gray.600'} fontWeight={700} fontSize={'md'} Text>
        {text}
      </Text>
    </HStack>
  </Button>
);

export const SubmitButton = ({text, handlePress, ...rest}) => (
  <TouchableOpacity onPress={handlePress}>
    <Center
      bg={'primary'}
      borderRadius={'full'}
      mt={4}
      width={'full'}
      py={2.5}
      {...rest}>
      <Text color={'secondary'} textTransform={'uppercase'} fontWeight={'800'}>
        {text}
      </Text>
    </Center>
  </TouchableOpacity>
);

export default Credentials;
