import {Icon, HStack, VStack, Text, Box} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {SIZES} from '../../constants';
// icons: checkmark-circle,
// AntDesign: exclamationcircle
// Entypo: info-with-cirle, warning

const success = ({message}) => {
  return (
    <HStack
      px={'5'}
      w={SIZES.width * 0.9}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#4AA255'}
      mx={'auto'}>
      <VStack space={1} w={'full'}>
        <Box
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text fontWeight={'semibold'} color={'white'}>
            Success
          </Text>

          <Icon
            size={6}
            color={'white'}
            as={<Ionicons name={'checkmark-circle'} />}
          />
        </Box>

        <Box _text={{fontSize: 'xs', color: 'white'}} maxW={'98%'}>
          {message}
        </Box>
      </VStack>
    </HStack>
  );
};

const error = ({message, title = 'Error'}) => {
  return (
    <HStack
      px={'5'}
      w={SIZES.width * 0.9}
      mx={'auto'}
      borderRadius={'md'}
      p={'3'}
      alignItems={'center'}
      space={'3'}
      bg={'#D45526'}>
      <VStack space={'1'} w={'full'}>
        <Box
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text fontSize={'md'} fontWeight={'800'} color={'white'}>
            {title}
          </Text>
          <Icon size={5} color={'white'} as={<Feather name={'x-circle'} />} />
        </Box>

        <Box _text={{color: 'white'}} maxW={'98%'}>
          {message}
        </Box>
      </VStack>
    </HStack>
  );
};

const info = ({message}) => {
  return (
    <HStack
      px={'5'}
      w={SIZES.width * 0.9}
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

      <VStack space={'1'} w={'full'}>
        <Text fontWeight={'semibold'} color={'white'}>
          Info!
        </Text>

        <Box _text={{fontSize: 'xs', color: 'white'}} maxW={'98%'}>
          {message}
        </Box>
      </VStack>
    </HStack>
  );
};

const warning = ({message}) => {
  return (
    <HStack
      px={'5'}
      maxW={SIZES.width * 0.9}
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
