import React, {useEffect, useState} from 'react';
import {HStack, Text} from 'native-base';
import CategoryButton from './CategoryButton';
import AboutBusinessService from '../../services/AboutBusinessService';
import AsyncStorageService from '../../services/AsyncStorageService';
import {SIZES} from '../../constants';

export const SelectCategory = ({
  categories,
  manageCategory,
  details,
  toggleCategoryInput,
}) => {
  // const [categories, setCategories] = useState(categories);

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const user = await JSON.parse(
  //         await AsyncStorageService.getData('user'),
  //       );

  //       if (user?.token) {
  //         const businessCategories =
  //           await AboutBusinessService.fetchBusinessCategories();

  //         const cats = [];
  //         businessCategories.Categories.map(({name, _id}) =>
  //           cats.push({name, id: _id}),
  //         );

  //         setCategories(cats);
  //       } else {
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       return;
  //     }
  //   };

  //   fetch();
  // }, []);

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
          // isSelected={showCategoryInput}
        />
      </HStack>
    </>
  );
};
