import {Box, Text, VStack} from 'native-base';
import React from 'react';
import TopSellerItem from './TopSellerItem';

const TopSellers = () => {
  return (
    <Box>
      {/* header */}
      <Box>
        <Text m={0} fontSize={'lg'} color={'gray.500'}>
          This Week
        </Text>
        <Text lineHeight={'xs'} fontWeight={'800'} m={0} fontSize={'xl'}>
          Top sellers
        </Text>
      </Box>

      {/* top seller list */}
      {/* list */}
      <VStack space={'2'} py={2} mt={'1'}>
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
      </VStack>
    </Box>
  );
};

export default TopSellers;
