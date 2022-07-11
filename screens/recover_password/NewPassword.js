import {Box, Text} from 'native-base';
import React from 'react';
import {LabeledInput} from '../../components/Input';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import {SubmitButton} from '../Credentials';
import {Header} from '../Login';

const NewPassword = () => {
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
          //   value={credentials.password}
          //   handleChange={pwd =>
          //     setCredentials(prev => ({...prev, password: pwd}))
          //   }
        />
      </Box>

      <Box h={'24'}>
        <LabeledInput
          label={'Confirm Password'}
          type={'password'}
          placeholder={'**********'}
          //   value={credentials.password}
          //   handleChange={pwd =>
          //     setCredentials(prev => ({...prev, password: pwd}))
          //   }
        />
      </Box>

      <CurrentScreenSelector currentScreen={'new_password'} />

      <SubmitButton text={'Reset Password'} />
    </Box>
  );
};

export default NewPassword;
