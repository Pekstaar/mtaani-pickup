import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Center, Text} from 'native-base';

const DeliverButton = ({onPress, ...rest}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Center
        minWidth={'126px'}
        bg={'muted.500'}
        borderRadius={'full'}
        py={2}
        {...rest}
        px={4}>
        <Text color={'primary'} fontWeight={'semibold'}>
          Deliver
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

export default DeliverButton;
