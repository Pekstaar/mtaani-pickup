import {useNavigation} from '@react-navigation/native';
import {combineReducers} from '@reduxjs/toolkit';
import {Box, Text, useToast} from 'native-base';
import React, {useState} from 'react';
import Toast from '../../components/general/toasts';
import {LabeledInput} from '../../components/Input';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import AuthService from '../../services/AuthService';
import {LoadingButton, SubmitButton} from '../Credentials';
import {Header} from '../Login';

const SmsRecovery = ({
  route: {
    params: {phone_number},
  },
}) => {
  const navigation = useNavigation();
  const toast = useToast();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const validateCode = () => {
    if (code === '') {
      toast.show({
        render: () => {
          return (
            <Toast.error
              message={JSON.stringify(
                'Please pass in the code sent to your phone',
              )}
            />
          );
        },
      });
      return false;
    } else if (code.length < 5 || code.length > 5) {
      toast.show({
        render: () => {
          return (
            <Toast.error
              message={JSON.stringify(
                'Invalide code. The code should be atleast 5 characters',
              )}
            />
          );
        },
      });
      return false;
    }

    return true;
  };

  const handleVerificaiton = () => {
    const isValid = validateCode();

    if (!isValid) return;

    setLoading(true);
    AuthService.confirmRecoveryVerification({
      phone_number,
      code,
    })
      .then(r => {
        toast.show({
          render: () => {
            return <Toast.success message={JSON.stringify(r?.message)} />;
          },
        });
        setLoading(false);
        navigation.navigate('password_create_new', {phone: phone_number});
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

        console.log(err);
      });
  };

  return (
    <Box px={'4'}>
      <Header title={'Password SMS recovery'} />

      <Text color={'gray.600'} fontWeight={'semibold'}>
        A code was sent by SMS to {phone_number || ''}. Type in the code to
        verify the number
      </Text>

      <Box h={'24'}>
        <LabeledInput
          label={''}
          placeholder={'code'}
          value={code}
          handleChange={txt => setCode(txt)}
        />
      </Box>

      <Box>
        {loading ? (
          <LoadingButton text="Verifying code . . ." />
        ) : (
          <SubmitButton handlePress={handleVerificaiton} text={'Verify Code'} />
        )}
      </Box>
      <Box flexDir={'row'} my={'4'} justifyContent={'center'}>
        Didn't receive code?{' '}
        <Text textDecorationLine={'underline'} fontWeight={'800'}>
          Click here to Resend
        </Text>
      </Box>

      <CurrentScreenSelector currentScreen={'recovery_code'} />
    </Box>
  );
};

export default SmsRecovery;
