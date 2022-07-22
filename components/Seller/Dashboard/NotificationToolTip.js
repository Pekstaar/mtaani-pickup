import {useNavigation} from '@react-navigation/native';
import {HStack, Icon, Text, Box, Pressable, useNativeBase} from 'native-base';
import React from 'react';

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {SIZES} from '../../../constants';

const NotificationToolTip = ({user}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      _pressed={{
        opacity: '70',
      }}
      onPress={() => navigation.navigate('about_business', {user})}
      mb={'3'}
      mx={'3'}>
      <HStack
        borderRadius={'xl'}
        w={'full'}
        alignItems={'center'}
        bg={'#464646'}>
        <HStack
          borderLeftRadius={'xl'}
          p={'2'}
          w={'88%'}
          space={'2'}
          justifyContent={'space-between'}
          bg={'#28272D'}
          alignItems={'center'}>
          {/* Icon */}
          <Icon
            size={'7'}
            color={'#FCD948'}
            as={<Foundation name={'lightbulb'} />}
          />

          {/* Vstack */}
          <Box>
            <Text fontSize={'md'} color="#FCD948" fontWeight={'700'}>
              Pro tip!
            </Text>
            <Text
              w={'55%'}
              // flex={'1'}
              // flexGrow={'1'}
              fontSize={'xs'}
              fontWeight={'600'}
              color="#FCD948">
              {
                ' Please complete filling in your Profile to unlock your products analytics dashboard'
              }
            </Text>
          </Box>
        </HStack>
        <Box>
          <Icon
            size={'7'}
            color={'#FCD948'}
            as={<Ionicons name={'chevron-forward-sharp'} />}
          />
        </Box>
      </HStack>
      {/* icon */}
    </Pressable>
  );
};

export default NotificationToolTip;
