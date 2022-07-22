import {Icon, Box, Center, Image, Text, Pressable, VStack} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeliverButton from './DeliverButton';

const ProductListView = ({product, handleViewDetails, handleDeliver}) => {
  return (
    <Pressable _pressed={{opacity: '90'}} onPress={handleViewDetails}>
      <Box
        flexDirection={'row'}
        bg={'white'}
        shadow={'1'}
        borderRadius={'xl'}
        alignItems={'center'}>
        {/* <TouchableOpacity onPress={handleViewDetails}> */}
        <Center
          mr={'2'}
          borderRadius={'xl'}
          bg={'muted.300'}
          h={'24'}
          w={'24'}
          ml={'2'}>
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
        {/* </TouchableOpacity> */}

        <VStack flex={'1'}>
          <Box mt={'1'} flexGrow={'1'}>
            <Text mb={'0.5'} fontSize={'md'} fontWeight={'semibold'}>
              {product?.product_name}
            </Text>
            <Box
              flexDir={'row'}
              _text={{fontWeight: '700', color: '#696969', fontSize: 'xs'}}>
              <Text color={'muted.500'} fontSize={'12'}>
                Price(kshs):{' '}
              </Text>
              {product?.price}
            </Box>
            <Box
              flexDir={'row'}
              _text={{fontWeight: '700', color: '#696969', fontSize: 'xs'}}>
              <Text color={'muted.500'} fontSize={'12'}>
                Category:{' '}
              </Text>
              {product?.category.name}
            </Box>
            <Box
              flexDir={'row'}
              _text={{fontWeight: '700', color: '#696969', fontSize: 'xs'}}>
              <Text color={'muted.500'} fontSize={'12px'}>
                Colors:{' '}
              </Text>
              {product?.colors?.map(c => `${c}, `)}
            </Box>
          </Box>
          <Box flexDir={'row'} justifyContent={'flex-end'} py={'1'} px={'2'}>
            <DeliverButton
              onPress={handleDeliver}
              minWidth={'90px'}
              py={'1.5'}
              // position={'absolute'}
              // bottom={'-6'}
              // right={'1.5'}
            />
          </Box>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ProductListView;
