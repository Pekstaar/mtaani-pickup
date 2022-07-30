import React, {useState} from 'react';
import {
  Actionsheet,
  Image,
  Center,
  Box,
  Icon,
  Text,
  HStack,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {assets} from '../../../constants';
import DeliverButton from './DeliverButton';
import ImageBox from '../add_product/ImageBox';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SheetModal = ({product, isOpen, onClose, onEdit, handleDeliver}) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Pressable
          _pressed={{opacity: '80'}}
          onPress={onClose}
          borderRadius={'full'}
          p={'1'}
          position={'absolute'}
          top={'2'}
          right={'2'}
          bg={'trueGray.100'}>
          <Icon
            color={'trueGray.500'}
            size={'5'}
            as={<Ionicons name={'close'} />}
          />
        </Pressable>
        <ScrollView py={2} px={6} w={'full'}>
          <Box
            borderRadius={'xl'}
            bg={'white'}
            shadow={'1'}
            w={'full'}
            mb={'2'}>
            <Box overflow={'hidden'} borderRadius={'xl'} w={'full'} h={'280px'}>
              <Image
                source={
                  product?.images?.length > 0
                    ? {
                        uri: product?.images[currentImage],
                      }
                    : assets.empty_2
                }
                alt={'product image'}
                h={'5/6'}
                w={'full'}
                resizeMode={product?.images?.length > 0 ? 'cover' : 'contain'}
                borderWidth={'1'}
                borderColor={'muted.200'}
              />

              <HStack py={1} space={3} px={2} justifyContent={'flex-end'}>
                {product?.images?.map((image, i) =>
                  image ? (
                    <Pressable
                      key={i}
                      _pressed={{opacity: '70'}}
                      onPress={() => setCurrentImage(i)}>
                      <ImageBox image={image} />
                    </Pressable>
                  ) : (
                    <Box
                      key={i}
                      borderRadius={'sm'}
                      bg={'muted.300'}
                      height={10}
                      width={10}
                    />
                  ),
                )}
              </HStack>
            </Box>

            <HStack flexWrap={'wrap'} px={5} pb={5}>
              <Box
                mb={1}
                w={'full'}
                _text={{
                  fontWeight: '700',
                  fontSize: 'md',
                  color: 'trueGray.700',
                }}
                fontSize={'lg'}>
                {product?.product_name}
              </Box>

              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Stock:{' '}
                </Text>
                {product?.qty}
              </Box>

              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Price(kshs):{' '}
                </Text>
                {product?.price}
              </Box>
              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Category:{' '}
                </Text>
                {product?.category?.name}
              </Box>

              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Min Order:{' '}
                </Text>
                {product?.min_order || 0}
              </Box>

              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Discount:{' '}
                </Text>
                {'None'}
              </Box>

              <Box
                w={'full'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Colors:{' '}
                </Text>
                {product?.colors?.map(c => `${c}, `)}
              </Box>

              <Box
                w={'1/2'}
                flexDir={'row'}
                _text={{fontWeight: '600', fontSize: '13', color: '#696969'}}>
                <Text color={'muted.500'} fontSize={'xs'}>
                  Size:{' '}
                </Text>
                {product?.size?.map(s => `${s} `)}
              </Box>
            </HStack>

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

              <DeliverButton onPress={handleDeliver} />
            </HStack>
          </Box>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SheetModal;
