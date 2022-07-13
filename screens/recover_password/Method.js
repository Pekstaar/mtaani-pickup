import {
  Box,
  Checkbox,
  Pressable,
  Text,
  HStack,
  VStack,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import {Header} from '../Login';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LabeledInput} from '../../components/Input';
import {LoadingButton, SubmitButton} from '../Credentials';
import MethodInput from '../../components/Seller/password/MethodInput';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../components/general/toasts';
import AuthService from '../../services/AuthService';

const Method = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [current, setCurrent] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    // navigate to recovery screen
    if (state === '') {
      toast.show({
        render: () => {
          return (
            <Toast.error
              message={JSON.stringify(
                'Please provide an email or Phone Number',
              )}
            />
          );
        },
      });

      return;
    }

    setLoading(true);
    if (current === 'sms') {
      AuthService.recoveryVerification({phone_number: state})
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Toast.success
                  message={JSON.stringify('Code sent to your Phone!')}
                />
              );
            },
          });
          navigation.navigate('password_sms_recovery', {
            phone_number: state,
          });

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
          });

          console.log(err);

          setLoading(false);
        });
    }
    if (current === 'email') {
      AuthService.recoveryVerification({email: state})
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Toast.success
                  message={JSON.stringify('Code sent to your Email!')}
                />
              );
            },
          });

          setLoading(false);

          navigation.navigate('password_email_recovery', {
            email: state,
          });
        })
        .catch(err => {
          console.log(err);

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
    }
  };

  return (
    // <KeyboardAvoidingView>
    <ScrollView>
      <Box px={'4'}>
        <Header title={'Choose a recovery Method'} />

        <Text color={'gray.600'} fontWeight={'semibold'}>
          Select your preferred recovery method, then a code will be sent
        </Text>

        <VStack py={'4'} space={'6'}>
          <MethodInput
            text={'Recover via SMS'}
            isCurrent={current === 'sms'}
            handlePress={() => setCurrent('sms')}
            icon={
              <Icon
                size={'5'}
                color={current === 'sms' ? 'primary' : 'secondary'}
                as={<SimpleLineIcons name="screen-smartphone" />}
              />
            }
          />

          {current === 'sms' && (
            <Box h={'125px'}>
              <LabeledInput
                label={'Phone number'}
                placeholder={'e.g. 0700 ...'}
                exp={
                  'Enter the phone number you used to register your account with'
                }
                value={state}
                handleChange={text => setState(text)}
              />
            </Box>
          )}

          <MethodInput
            text={'Recover via Email'}
            isCurrent={current === 'email'}
            handlePress={() => setCurrent('email')}
            icon={
              <Icon
                size={'5'}
                color={current === 'email' ? 'primary' : 'secondary'}
                as={<Ionicons name="mail-open-outline" />}
              />
            }
          />

          {current === 'email' && (
            <Box h={'125px'}>
              <LabeledInput
                label={'Email address'}
                placeholder={'e.g. yourmail@email.com'}
                type={'email'}
                exp={
                  'Enter the email address you used to register your account with'
                }
                value={state}
                handleChange={text => setState(text)}
              />
            </Box>
          )}

          <Box>
            {loading ? (
              <LoadingButton text="Sending code . . ." />
            ) : (
              <SubmitButton handlePress={handleContinue} text={'Send Code'} />
            )}
          </Box>
          <CurrentScreenSelector currentScreen={'method'} />
        </VStack>
      </Box>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Method;
