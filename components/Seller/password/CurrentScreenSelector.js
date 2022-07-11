import {Center, Box, Pressable} from 'native-base';
import React from 'react';

const CurrentScreenSelector = ({currentScreen}) => {
  return (
    <Center flexDir={'row'}>
      <Indicator isCurrent={currentScreen === 'method'} />
      <Indicator isCurrent={currentScreen === 'recovery_code'} />
      <Indicator isCurrent={currentScreen === 'new_password'} />
    </Center>
  );
};

export default CurrentScreenSelector;

const Indicator = ({isCurrent = false}) => (
  <Pressable>
    <Box
      w={'3.5'}
      h={'3.5'}
      mx={'1'}
      borderRadius={'full'}
      borderWidth={'1.5'}
      borderColor={'primary'}
      bg={isCurrent ? '' : 'primary'}
    />
  </Pressable>
);
