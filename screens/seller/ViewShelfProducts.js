import {
  Box,
  Button,
  Center,
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

const ViewShelfProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.shelf);

  const [currentProduct, setCurrentProduct] = useState({});
  const [viewModal, setViewModal] = useState(false);
  // const [products, setProducts] = useState(shelfProducts);
  const [currentLayout, setCurrentLayout] = useState('list');

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
    navigation.navigate('add_product');
  };

  useEffect(() => {
    fetchShelfProducts();
  }, []);

  return (
    <>
      <SheetModal
        onEdit={handleSelectProduct}
        product={currentProduct}
        isOpen={viewModal}
        onClose={handleClose}
      />

      <Box safeArea>
        {/* header */}
        <CustomHeader
          title={'Product List'}
          handleChangeLayout={handleLayoutChange}
          layout={currentLayout}
        />
        {/* list */}
        <ScrollView>
          {currentLayout === 'grid' ? (
            <Stack
              flexDirection={'row'}
              flexWrap={'wrap'}
              //   px={'3'}
              justifyContent={'center'}>
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
              {products?.map(item => (
                <ProductListView
                  handleViewDetails={() => {
                    setCurrentProduct(item);
                    setViewModal(true);
                  }}
                  key={item?._id}
                  product={item}
                />
              ))}
            </VStack>
          )}
        </ScrollView>
      </Box>
      <Button
        onPress={() => navigation?.navigate('add_product')}
        bg={'primary'}
        w={'130px'}
        borderRadius={'full'}
        position={'absolute'}
        right={'3'}
        bottom={'3'}
        _text={{
          textTransform: 'uppercase',
          color: 'secondary',
          fontWeight: 'semibold',
          fontSize: 'xs',
        }}>
        + Add Product
      </Button>
    </>
  );
};

export default ViewShelfProducts;
