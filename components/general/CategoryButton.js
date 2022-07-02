import {Button, Center, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const CategoryButton = ({name, isSelected, handlePress}) => (
  <TouchableOpacity onPress={handlePress}>
    <Center
      bg={isSelected ? 'primary' : COLORS.lightGray2}
      borderRadius={'2xl'}
      p={2}
      px={2.5}
      my={1}
      // width={'30%'}
    >
      <Text color={'black'} fontWeight={700} fontSize={SIZES.sm}>
        {name}
      </Text>
    </Center>
  </TouchableOpacity>
);

export default CategoryButton;
