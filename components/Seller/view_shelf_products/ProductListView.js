import {Icon, Box, Center, Image, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeliverButton from './DeliverButton';

const ProductListView = ({product, handleViewDetails}) => {
  return (
    <Box flexDirection={'row'} bg={'white'} shadow={'1'} borderRadius={'xl'}>
      <TouchableOpacity onPress={handleViewDetails}>
        <Center mr={'2'} borderRadius={'xl'} bg={'muted.300'} h={'24'} w={'24'}>
          {/* <Image /> */}
          {product?.images.length > 0 ? (
            <Image
              borderRadius={'xl'}
              source={{uri: product.images[0]}}
              alt={product._id}
              w={'full'}
              h={'full'}
            />
          ) : (
            <Icon
              size={'10'}
              color={'white'}
              as={<Ionicons name={'shirt'} />}
            />
          )}
        </Center>
      </TouchableOpacity>

      <Box mt={'1'} flexGrow={'1'}>
        <Text mb={'0.5'} fontSize={'md'} fontWeight={'semibold'}>
          {product?.product_name}
        </Text>

        <Text fontWeight={'medium'} color={'muted.500'} fontSize={'12px'}>
          Price(kshs): {product?.price}
        </Text>
        <Text fontWeight={'medium'} color={'muted.500'} fontSize={'12px'}>
          Category: {product?.category.name}
        </Text>
        <Text fontWeight={'medium'} color={'muted.500'} fontSize={'12px'}>
          Color: {product?.color}
        </Text>

        <DeliverButton
          minWidth={'90px'}
          py={'1.5'}
          position={'absolute'}
          bottom={'-6'}
          right={'1.5'}
        />
      </Box>
    </Box>
  );
};

export default ProductListView;
