import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {SIZES} from '../../constants';

import CustomHeader from '../../components/Seller/view_shelf_products/Header';
import Product from '../../components/Seller/view_shelf_products/Product';
import {useState} from 'react';
import SheetModal from '../../components/Seller/view_shelf_products/SheetModal';
import AboutBusinessService from '../../services/AboutBusinessService';
import ProductListView from '../../components/Seller/view_shelf_products/ProductListView';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProductsOnShelf,
  setSelectedProduct,
} from '../../Redux/reducers/productsOnShelfSlice';
import Loader from '../../components/general/Loader';
import DeliverButton from '../../components/Seller/view_shelf_products/DeliverButton';
import ImageBox from '../../components/Seller/add_product/ImageBox';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EmptyShelf from '../../components/Seller/view_shelf_products/EmptyShelf';

const ViewShelfProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {products, isLoading} = useSelector(state => state.shelf);

  const [currentProduct, setCurrentProduct] = useState({});
  const [viewModal, setViewModal] = useState(false);
  // const [products, setProducts] = useState(shelfProducts);
  const [currentLayout, setCurrentLayout] = useState('list');
  const [empty, setEmpty] = useState(true);

  const handleClose = () => {
    setViewModal(false);
  };

  const fetchShelfProducts = () => {
    dispatch(fetchProductsOnShelf());
  };

  const handleLayoutChange = layout => {
    setCurrentLayout(layout);
  };

  const handleSelectProduct = id => {
    dispatch(setSelectedProduct(id));
    setViewModal(false);
    navigation.navigate('add_product', {
      mode: 'update',
      product: currentProduct,
    });
  };

  useEffect(() => {
    fetchShelfProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader bg={'gray.100'} shadow={'0'} showText={true} />}

      <SheetModal
        onEdit={handleSelectProduct}
        product={currentProduct}
        isOpen={viewModal}
        onClose={handleClose}
        handleDeliver={() => navigation.navigate('deliver_product')}
      />

      <Box safeArea>
        {/* header */}
        <CustomHeader
          title={'Product List'}
          handleChangeLayout={handleLayoutChange}
          layout={currentLayout}
        />
        {/* list */}
        {/* {empty && <EmptyShelf />} */}

        <ScrollView mb={'100px'}>
          {currentLayout === 'grid' ? (
            <Stack
              flexDirection={'row'}
              flexWrap={'wrap'}
              //   px={'3'}
              justifyContent={'flex-start'}>
              {products?.map((item, index) => (
                <Product
                  handlePress={() => {
                    setCurrentProduct(item);
                    setViewModal(true);
                  }}
                  key={index}
                  details={item}
                />
              ))}
            </Stack>
          ) : (
            <VStack space={2} p={3}>
              {products?.map(item => {
                console.log(item._id === currentProduct?._id);
                return (
                  <Box key={item?._id}>
                    {item._id === currentProduct?._id ? (
                      <ViewFull
                        onEdit={handleSelectProduct}
                        onClose={() => setCurrentProduct({})}
                        product={item}
                      />
                    ) : (
                      <ProductListView
                        handleViewDetails={() => {
                          setCurrentProduct(item);
                        }}
                        product={item}
                        handleDeliver={() =>
                          navigation.navigate('deliver_product')
                        }
                      />
                    )}
                  </Box>
                );
              })}
            </VStack>
          )}
        </ScrollView>
      </Box>
      {!currentProduct._id && (
        <Button
          onPress={() => navigation?.navigate('add_product')}
          bg={'primary'}
          minW={'160px'}
          borderRadius={'full'}
          position={'absolute'}
          right={'3'}
          shadow={'2'}
          bottom={'3'}
          _text={{
            textTransform: 'uppercase',
            color: 'secondary',
            fontWeight: 'semibold',
            fontSize: 'xs',
          }}>
          + Add Product
        </Button>
      )}
    </>
  );
};

export default ViewShelfProducts;

const ViewFull = ({product, handleDeliver, onEdit, onClose}) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <ScrollView py={2} w={'full'} zIndex={'10'}>
      <Box borderRadius={'xl'} bg={'white'} shadow={'1'} w={'full'} mb={'2'}>
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
          <Pressable
            _pressed={{opacity: '80'}}
            onPress={onClose}
            borderRadius={'full'}
            p={'1'}
            position={'absolute'}
            top={'5'}
            right={'5'}
            bg={'trueGray.100'}>
            <Icon
              color={'trueGray.500'}
              size={'5'}
              as={<Ionicons name={'ios-chevron-up'} />}
            />
          </Pressable>
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
              Size:{' '}
            </Text>
            {product?.size}
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
  );
};
