import {useNavigation} from '@react-navigation/native';
import {Box, Text, useToast} from 'native-base';
import React, {useState} from 'react';
import Toast from '../../components/general/toasts';
import {LabeledInput} from '../../components/Input';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import AuthService from '../../services/AuthService';
import {LoadingButton, SubmitButton} from '../Credentials';
import {Header} from '../Login';

const NewPassword = () => {
  // navigation var
  const navigation = useNavigation();
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // new password state
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // confrim new password state

  // send state to backend
  const handleResetPassword = () => {
    // auth service.createNewPassword
    setLoading(true);

    AuthService.createNewPassword({
      new_password: password,
      confirm_password: confirmPassword,
    })
      .then(r => {
        toast.show({
          render: () => {
            return <Toast.success message={JSON.stringify(r?.message)} />;
          },
        });
        setLoading(false);

        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);

        setLoading(false);

        toast.show({
          render: () => (
            <Toast.error
              message={JSON.stringify(err.response?.data?.message)}
            />
          ),
        });
      });
  };
  return (
    <Box px={'4'}>
      <Header title={'Create a new password'} />

      <Text color={'gray.600'} fontWeight={'semibold'}>
        Make sure to follow the password creation criteria, and don’t share your
        new password with anyone.
      </Text>

      <Box h={'20'} my={'6'}>
        <LabeledInput
          label={'New Password'}
          type={'password'}
          placeholder={'**********'}
          value={password}
          handleChange={pwd => setNewPassword(pwd)}
        />
      </Box>

      <Box h={'24'}>
        <LabeledInput
          label={'Confirm Password'}
          type={'password'}
          placeholder={'**********'}
          value={confirmPassword}
          handleChange={pwd => setConfirmPassword(pwd)}
        />
      </Box>
      {loading ? (
        <LoadingButton text="Resetting password . . ." />
      ) : (
        <SubmitButton
          handlePress={handleResetPassword}
          text={'Reset Password'}
        />
      )}

      <Box mt={'5'}>
        <CurrentScreenSelector currentScreen={'new_password'} />
      </Box>
    </Box>
  );
};

export default NewPassword;
