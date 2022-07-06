import {Icon, HStack, VStack, Text} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// icons: checkmark-circle,
// AntDesign: exclamationcircle
// Entypo: info-with-cirle, warning

const success = ({message}) => {
  return (
    <HStack
      px={'5'}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#4AA255'}
      mx={'auto'}
      maxW={'95%'}>
      <Icon
        size={7}
        color={'white'}
        as={<Ionicons name={'checkmark-circle'} />}
      />

      <VStack space={1}>
        <Text fontWeight={'semibold'} color={'white'}>
          Success
        </Text>

        <Text fontSize={'xs'} color={'white'}>
          {message}
        </Text>
      </VStack>
    </HStack>
  );
};

const error = ({message}) => {
  return (
    <HStack
      px={'5'}
      maxW={'95%'}
      mx={'auto'}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#C74243'}>
      <Icon
        size={7}
        color={'white'}
        as={<AntDesign name={'exclamationcircle'} />}
      />

      <VStack space={'1'}>
        <Text fontWeight={'semibold'} color={'white'}>
          Error!
        </Text>

        <Text fontSize={'xs'} color={'white'}>
          {message}
        </Text>
      </VStack>
    </HStack>
  );
};

const info = ({message}) => {
  return (
    <HStack
      px={'5'}
      maxW={'95%'}
      mx={'auto'}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#3DABC6'}>
      <Icon
        size={7}
        color={'white'}
        as={<Entypo name={'info-with-circle'} />}
      />

      <VStack space={'1'}>
        <Text fontWeight={'semibold'} color={'white'}>
          Info!
        </Text>

        <Text fontSize={'xs'} color={'white'}>
          {message}
        </Text>
      </VStack>
    </HStack>
  );
};

const warning = ({message}) => {
  return (
    <HStack
      px={'5'}
      maxW={'95%'}
      mx={'auto'}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#DF954B'}>
      <Icon size={7} color={'white'} as={<Entypo name={'warning'} />} />

      <VStack space={'1'}>
        <Text fontWeight={'semibold'} color={'white'}>
          Warning
        </Text>

        <Text fontSize={'xs'} color={'white'}>
          {message}
        </Text>
      </VStack>
    </HStack>
  );
};

const Toast = {
  success,
  error,
  info,
  warning,
};

export default Toast;
