import {Icon, Box, HStack, Text} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Validation = ({value, isCurrent}) => {
  return (
    <HStack space={'2'} alignItems={'center'}>
      {/* label */}
      <Box>
        <Icon
          size={3}
          color={!isCurrent ? 'error.400' : 'black'}
          as={<Feather name={!isCurrent ? 'x-circle' : 'circle'} />}
        />
      </Box>

      {/* text */}
      <Text
        color={!isCurrent ? 'error.400' : 'black'}
        as={<Feather name={'circle'} />}
        fontSize={'xs'}
        fontWeight={'600'}>
        {value}
      </Text>
    </HStack>
  );
};

export default Validation;
