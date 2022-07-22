import React, {useEffect, useState} from 'react';
import {HStack, Text} from 'native-base';
import CategoryButton from './CategoryButton';
import AboutBusinessService from '../../services/AboutBusinessService';
import AsyncStorageService from '../../services/AsyncStorageService';
import {SIZES} from '../../constants';
import {LabeledInput} from '../Input';

export const SelectCategory = ({
  categories,
  manageCategory,
  details,
  toggleCategoryInput,
  showCategoryInput = true,
  handleOtherCategoryChange,
}) => {
  // const [categories, setCategories] = useState(categories);

  return (
    <>
      <Text fontWeight={'medium'} fontSize={SIZES.base + 1}>
        Select category
      </Text>
      <HStack
        display={'flex'}
        flexDirection="row"
        flexWrap="wrap"
        space={2}
        mt={1}
        py={'2'}>
        {categories.map((cat, i) => (
          <CategoryButton
            key={i}
            name={cat?.name || ''}
            handlePress={() => manageCategory(cat)}
            isSelected={details?.category === cat.id}
          />
        ))}
        <CategoryButton
          name={'Other'}
          handlePress={toggleCategoryInput}
          isSelected={showCategoryInput}
        />
      </HStack>

      {showCategoryInput && (
        <LabeledInput
          label={'category'}
          placeholder={'other category'}
          value={details?.itemSold}
          handleChange={handleOtherCategoryChange}
        />
      )}
    </>
  );
};
