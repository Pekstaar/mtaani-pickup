import React from 'react';
import {Box, HStack, Icon, Image, Text} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

const TopSellerItem = () => {
  return (
    <HStack space={3} alignItems={'center'}>
      {/* image */}
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/bakery-logo-food-business-template-branding-design-vector_53876-136255.jpg?w=2000',
        }}
        h={12}
        w={12}
        alt={'image'}
        borderColor={'gray.500'}
        borderWidth={'1'}
        borderRadius={'lg'}
      />
      {/* HStack */}
      <HStack
        flexGrow={'1'}
        p={1}
        borderBottomWidth={'1'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderColor={'primary'}>
        <Box>
          <Text fontWeight={'bold'} fontSize="md">
            Style smith
          </Text>
          <Box flexDir={'row'} alignItems={'center'}>
            <Icon as={<Ionicon name={'logo-instagram'} />} /> @bizivity
          </Box>
        </Box>

        <Box borderRadius={'lg'} px={'1'} bg={'#FDF7D3'}>
          #Beauty
        </Box>
      </HStack>

      <Box w={12}>123 Orders</Box>
    </HStack>
  );
};

export default TopSellerItem;
