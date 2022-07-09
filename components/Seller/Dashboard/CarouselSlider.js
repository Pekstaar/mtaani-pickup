import React, {useRef, useEffect, useState} from 'react';
import {Box, Image} from 'native-base';
import {FlatList, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
const carouselImages = require('../../../src/data/CarouselImages.json');
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const CarouselSlider = () => {
  const flatListRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentImageIndex(changed[0].index);
    }
  });

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index});
  };

  const carouselItems = ({item}) => {
    // console.log(item.url);
    return (
      <Image
        source={{uri: item.url}}
        alt={item.id.toString()}
        h={250}
        w={SIZES.width * 0.9325}
        // my={'1'}
        borderTopRadius={'xl'}
        resizeMode={'cover'}
      />
    );
  };

  useEffect(() => {
    setTimeout(function () {
      if (currentImageIndex < carouselImages.length - 1) {
        scrollToIndex(currentImageIndex + 1);
      } else if (currentImageIndex === carouselImages.length - 1) {
        scrollToIndex(0);
      }
    }, 5000);
  }, [currentImageIndex]);

  return (
    <Box>
      <FlatList
        horizontal={true}
        data={carouselImages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={carouselItems}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref => {
          flatListRef.current = ref;
        }}
        style={{
          maxHeight: 300,
        }}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
      />

      <Box
        flexDir={'row'}
        justifyContent={'center'}
        position={'absolute'}
        w={'full'}
        bottom={'1'}
        my={3}>
        {carouselImages.map((_, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={{
              width: 10,
              height: 10,
              borderRadius: 50,
              backgroundColor:
                index === currentImageIndex ? COLORS.primary : 'white',
              marginHorizontal: 5,
            }}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CarouselSlider;
