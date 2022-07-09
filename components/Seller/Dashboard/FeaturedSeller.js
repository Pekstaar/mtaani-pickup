import {Avatar, Box, HStack, Icon, Image, Text, VStack} from 'native-base';
import React from 'react';
import CarouselSlider from './CarouselSlider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CButton from '../../general/Buttons';
const FeaturedSeller = () => {
  return (
    <Box>
      {/* Heading */}

      <Box>
        <Text m={0} fontSize={'lg'} color={'gray.500'}>
          Today's
        </Text>
        <Text
          fontWeight={'bold'}
          m={0}
          lineHeight={'xs'}
          color={'black'}
          fontSize={'xl'}>
          Featured Seller
        </Text>
      </Box>

      {/* carousel slider */}
      <Box
        my={'2'}
        borderRadius={'xl'}
        bg={'white'}
        w={'full'}
        shadow={'2'}
        //   h={'300px'}
      >
        {/* image */}
        <CarouselSlider />
        {/* Details */}

        <HStack p={'3'} space={'2'} alignItems={'center'}>
          {/* avatar */}
          <Avatar
            source={{
              uri: 'https://images-platform.99static.com//nlgsyuBTe7UV0HvYPJYUx-B06l0=/660x131:1200x671/fit-in/590x590/99designs-contests-attachments/32/32387/attachment_32387923',
            }}>
            MD
          </Avatar>
          {/* details */}
          <VStack>
            <Text fontSize={'xl'} fontWeight="bold">
              Bizivity
            </Text>
            <Box flexDir={'row'} alignItems={'center'}>
              <Icon as={<Ionicon name={'logo-instagram'} />} /> @bizivity
            </Box>
          </VStack>
          {/* button */}
          <CButton.outlined
            text={`More >`}
            ml={3}
            _text={{color: 'black', fontSize: 'md'}}
            border
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default FeaturedSeller;
