import {
  Box,
  Checkbox,
  Pressable,
  Text,
  HStack,
  VStack,
  Icon,
} from 'native-base';
import React, {useState} from 'react';
import {Header} from '../Login';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LabeledInput} from '../../components/Input';
import {SubmitButton} from '../Credentials';
import MethodInput from '../../components/Seller/password/MethodInput';
import CurrentScreenSelector from '../../components/Seller/password/CurrentScreenSelector';
import {useNavigation} from '@react-navigation/native';

const Method = () => {
  const navigation = useNavigation();

  const [current, setCurrent] = useState('');

  const handleContinue = () => {
    // navigate to recovery screen
    if (current === 'sms') {
      navigation.navigate('password_sms_recovery', {
        phone_number: '0799833222',
      });
    }
  };

  return (
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
              type={'password'}
              //   value={credentials.password}
              //   handleChange={pwd =>
              //     setCredentials(prev => ({...prev, password: pwd}))
              //   }
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
          disabled
        />

        <Box>
          <CurrentScreenSelector currentScreen={'method'} />

          <SubmitButton handlePress={handleContinue} text={'Send Code'} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Method;
