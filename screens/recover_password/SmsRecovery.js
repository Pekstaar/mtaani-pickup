import {useNavigation} from '@react-navigation/native';
import {Box, Text} from 'native-base';
import React from 'react';
import {LabeledInput} from '../../components/Input';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import {SubmitButton} from '../Credentials';
import {Header} from '../Login';

const SmsRecovery = ({
  route: {
    params: {phone_number},
  },
}) => {
  const navigation = useNavigation();

  const handleVerificaiton = () => {
    navigation.navigate('password_create_new');
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
          //   value={credentials.password}
          //   handleChange={pwd =>
          //     setCredentials(prev => ({...prev, password: pwd}))
          //   }
        />
      </Box>

      <SubmitButton handlePress={handleVerificaiton} text={'Verify Code'} />

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
