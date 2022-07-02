import React from 'react';
import {Actionsheet, Image, Center, Box, Icon, Text, HStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {assets} from '../../../constants';
import DeliverButton from './DeliverButton';

const SheetModal = ({product, isOpen, onClose, onEdit}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content py={2} px={6}>
        <Box borderRadius={'xl'} bg={'white'} shadow={'1'} w={'full'}>
          <Box borderRadius={'xl'} w={'full'} h={'300px'} bg={'muted.200'}>
            <Image
              source={
                product?.images?.length > 0
                  ? {
                      uri: product?.images[0],
                    }
                  : assets.empty_2
              }
              alt={'product image'}
              borderRadius={'xl'}
              h={'full'}
              w={'full'}
              resizeMode={product?.images?.length > 0 ? 'cover' : 'contain'}
              borderWidth={'1'}
              borderColor={'muted.200'}
            />
          </Box>

          <Box p={5}>
            <Text
              mb={1}
              fontSize={'lg'}
              fontWeight={'semibold'}
              color={'black'}>
              {product.product_name}
            </Text>

            <Text fontWeight={'medium'} color={'muted.600'}>
              Size: {product.size || 'medium'}
            </Text>
            <Text fontWeight={'medium'} color={'muted.600'}>
              Stock: {product.stock || 0}
            </Text>
            <Text fontWeight={'medium'} color={'muted.600'}>
              Color: {product.color}
            </Text>
            <Text fontWeight={'medium'} color={'muted.600'}>
              Category: {product.category?.name}
            </Text>
            <Text fontWeight={'medium'} color={'muted.600'}>
              Min Order: {product.min_order || 0}
            </Text>
          </Box>

          <HStack justifyContent={'space-around'} p={4}>
            <TouchableOpacity onPress={() => onEdit(product?._id)}>
              <Center
                minWidth={'126px'}
                bg={'gray.200'}
                borderRadius={'full'}
                py={2}
                px={4}>
                <Text fontWeight={'semibold'}>Edit Product</Text>
              </Center>
            </TouchableOpacity>

            <DeliverButton />
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SheetModal;
