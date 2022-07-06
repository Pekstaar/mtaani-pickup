import React, {useEffect, useState} from 'react';
import {HStack, Text} from 'native-base';
import CategoryButton from '../../general/CategoryButton';
import AboutBusinessService from '../../../services/AboutBusinessService';
import AsyncStorageService from '../../../services/AsyncStorageService';
import {SIZES} from '../../../constants';

export const SelectColor = ({manageColor, details}) => {
  const [colors] = useState([
    {
      name: 'Black',
      _id: 1,
    },
    {
      name: 'Red',
      _id: 2,
    },
    {
      name: 'Blue',
      _id: 3,
    },
    {
      name: 'White',
      _id: 4,
    },
    {
      name: 'pink',
      _id: 5,
    },
    {
      name: 'green',
      _id: 6,
    },
    {
      name: 'brown',
      _id: 7,
    },
  ]);

  return (
    <>
      <Text fontWeight={'medium'} fontSize={SIZES.base + 1}>
        Select Color
      </Text>
      <HStack
        display={'flex'}
        flexDirection="row"
        flexWrap="wrap"
        space={2}
        py={'1'}>
        {colors.map((color, i) => (
          <CategoryButton
            key={i}
            name={color?.name || ''}
            handlePress={() => manageColor(color)}
            isSelected={details?.colors.includes(color.name)}
          />
        ))}
        <CategoryButton
          name={'Other'}
          // handlePress={toggleCategoryInput}
          // isSelected={showCategoryInput}
        />
      </HStack>
    </>
  );
};
