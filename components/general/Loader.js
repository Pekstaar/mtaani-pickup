import {Center, Text, Spinner} from 'native-base';
import React from 'react';
import {SIZES} from '../../constants';

const Loader = () => {
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
      top={SIZES.height * 0.4}
      left={SIZES.width * 0.35}>
      <Spinner color={'primary'} size={'lg'} mb={2} />
      <Text fontSize={'md'} fontWeight={'medium'}>
        Loading
      </Text>
    </Center>
  );
};

export default Loader;
