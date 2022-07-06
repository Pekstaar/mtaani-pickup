import {Center, Text, Spinner} from 'native-base';
import React from 'react';
import {SIZES} from '../../constants';

const Loader = ({showText = true, ...rest}) => {
  return (
    <Center
      position={'absolute'}
      p={2}
      bg={'white'}
      zIndex={4}
      borderRadius={'xl'}
      shadow={'2'}
      w={'100px'}
      h={'100px'}
      top={SIZES.height * 0.3}
      left={SIZES.width * 0.35}
      {...rest}>
      <Spinner color={'primary'} size={'lg'} mb={2} />
      {showText && (
        <Text fontSize={'xs'} color={'primary'} fontWeight={'medium'}>
          Loading . . .
        </Text>
      )}
    </Center>
  );
};

export default Loader;
