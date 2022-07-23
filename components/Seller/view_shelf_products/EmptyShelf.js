import React from 'react';
import {Center, Text} from 'native-base';
import {SIZES} from '../../../constants';

const EmptyShelf = () => {
  return (
    <Center h={SIZES.height * 0.8} bg={'orange.200'}>
      <Text>EmptyShelf</Text>
    </Center>
  );
};

export default EmptyShelf;
