import React, {useState} from 'react';
import {HStack, Text} from 'native-base';
import CategoryButton from '../../general/CategoryButton';

import {SIZES} from '../../../constants';

export const SelectSize = ({manageSizes, details}) => {
  const [sizes] = useState([
    {
      name: 'xs',
      _id: 1,
    },
    {
      name: 'small',
      _id: 2,
    },
    {
      name: 'medium',
      _id: 3,
    },
    {
      name: 'large',
      _id: 4,
    },
    {
      name: 'xl',
      _id: 5,
    },
    {
      name: 'xxl',
      _id: 6,
    },
  ]);

  return (
    <>
      <Text fontWeight={'medium'} fontSize={SIZES.base + 1}>
        Select Size
      </Text>
      <HStack
        display={'flex'}
        flexDirection="row"
        flexWrap="wrap"
        space={2}
        py={'1'}>
        {sizes.map((size, i) => (
          <CategoryButton
            key={i}
            name={size?.name || ''}
            handlePress={() => manageSizes(size)}
            isSelected={details?.sizes?.includes(size.name)}
          />
        ))}
        {/* <CategoryButton
          name={'Other'}
          // handlePress={toggleCategoryInput}
          // isSelected={showCategoryInput}
        /> */}
      </HStack>
    </>
  );
};
