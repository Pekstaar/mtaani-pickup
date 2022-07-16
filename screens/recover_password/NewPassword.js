import {useNavigation} from '@react-navigation/native';
import {Box, Text, VStack, useToast, ScrollView} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import Toast from '../../components/general/toasts';
import {LabeledInput} from '../../components/Input';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import AuthService from '../../services/AuthService';
import {validatePasswordRequirements} from '../../src/Utils';
import {LoadingButton, SubmitButton} from '../Credentials';
import {Header} from '../Login';

import Validation from '../../components/Seller/password/Validation';

const NewPassword = ({route: {params}}) => {
  // navigation var
  const navigation = useNavigation();
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // new password state
  const [password, setNewPassword] = useState('');
  // confrim new password state
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validation, setValidation] = useState({
    length: false,
    case: false,
    numeral: false,
    special: false,
  });

  const isPasswordValid = useMemo(() => {
    if (
      validation.length &&
      validation.case &&
      validation.numeral &&
      validation.special
    ) {
      return true;
    }
    return false;
  }, [validation]);

  useEffect(() => {
    setLoading(false);
    setValidation({...validatePasswordRequirements(password)});
  }, [password]);

  // send state to backend
  const handleResetPassword = () => {
    // auth service.createNewPassword
    setLoading(true);
    if (!isPasswordValid) {
      toast.show({
        render: () => (
          <Toast.error
            message={'Please Ensure password meets the required criteria'}
          />
        ),
      });
      setLoading(false);

      return;
    }

    AuthService.createNewPassword({
      new_password: password,
      confirm_password: confirmPassword,
      phone_number: params?.phone || null,
      email: params?.email || null,
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
      <ScrollView>
        <Text color={'gray.600'} fontWeight={'semibold'}>
          Make sure to follow the password creation criteria, and don’t share
          your new password with anyone.
        </Text>

        <VStack space={'3'}>
          <Box h={'20'} mt={'6'}>
            <LabeledInput
              label={'New Password'}
              type={'password'}
              placeholder={'**********'}
              value={password}
              handleChange={pwd => setNewPassword(pwd)}
            />
          </Box>

          <VStack
            space={'1'}
            bg={'trueGray.200'}
            px={'2'}
            py={'4'}
            borderRadius={'md'}>
            <Text fontWeight={'600'}>Password Criteria</Text>

            <Validation
              isCurrent={validation?.length}
              value={'Be at least 8 characters in length'}
            />
            <Validation
              isCurrent={validation?.case}
              value={
                'Contain both upper and lowercase alphabetic characters (e.g. A-Z, a-z)'
              }
            />
            <Validation
              isCurrent={validation?.numeral}
              value={'Have at least one numerical character (e.g. 0-9)'}
            />
            <Validation
              isCurrent={validation?.special}
              value={
                'Have at least one special character (e.g. ~!@#$%^&*()_-+=)'
              }
            />
          </VStack>

          <Box h={'24'}>
            <LabeledInput
              label={'Confirm Password'}
              type={'password'}
              placeholder={'**********'}
              value={confirmPassword}
              handleChange={pwd => setConfirmPassword(pwd)}
            />
          </Box>
        </VStack>
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
      </ScrollView>
    </Box>
  );
};

export default NewPassword;
