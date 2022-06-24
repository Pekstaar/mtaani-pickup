import {Button, Text} from 'native-base';
import React from 'react';
import {COLORS, SIZES} from '../../constants';

const CategoryButton = ({name, isSelected, handlePress}) => (
  <Button
    bg={isSelected ? 'primary' : COLORS.lightGray2}
    borderRadius={'2xl'}
    p={2}
    px={2.5}
    my={1}
    width={'30%'}
    onPress={handlePress}>
    <Text color={'black'} fontWeight={700} fontSize={SIZES.sm}>
      {name}
    </Text>
  </Button>
);

export default CategoryButton;
