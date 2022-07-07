import {
  Box,
  HStack,
  useToast,
  VStack,
  ScrollView,
  Select,
  FormControl,
} from 'native-base';
import React, {useState, useEffect, useMemo} from 'react';
import {Header} from '../Login';
import {LabeledInput} from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorageService from '../../services/AsyncStorageService';
import AboutBusinessService from '../../services/AboutBusinessService';
import {LoadingButton, SubmitButton} from '../Credentials';
import AuthService from '../../services/AuthService';
import ProductUploader from '../../components/Seller/add_product/ProductUploader';
import {SelectCategory} from '../../components/general/SelectCategory';
import {SelectColor} from '../../components/Seller/add_product/SelectColor';

import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsOnShelf} from '../../Redux/reducers/productsOnShelfSlice';
import {SelectSize} from '../../components/Seller/add_product/Sizes';

const AboutBusiness = ({route: {params}}) => {
  const toast = useToast();
  const {selectedProduct: selectedProductId, products} = useSelector(
    state => state.shelf,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedProduct = useMemo(
    () => products.find(item => item._id === selectedProductId),
    [selectedProductId, products],
  );

  const mode = useMemo(() => {
    if (params?.mode === 'update') {
      return 'update';
    } else {
      return 'create';
    }
  }, [params]);

  const [details, setDetails] = useState({
    name: '',
    colors: [],
    category: '',
    price: '',
    sizes: '',
    quantity: '',
    quantity_unit: 'pieces',
  });
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (params?.mode === 'update') {
      setDetails({
        name: selectedProduct?.product_name,
        colors: [selectedProduct?.color],
        category: selectedProduct?.category._id,
        price: selectedProduct?.price?.toString(),
      });
    }
  }, [params]);

  useEffect(() => {
    if (mode === 'update' && selectedProduct?.images.length > 0) {
      const arr = [];
      selectedProduct.images.map(item => arr.push({uri: item}));

      setImages(arr);
    } else {
      setImages(new Array(5).fill(''));
    }
  }, [selectedProduct]);
  // product images;
  // let images = new Array(5).fill(null);

  const manageCategory = c => {
    const isContained = details?.category.id === c?.id;

    if (!isContained) {
      setDetails(prev => ({
        ...prev,
        category: c.id,
      }));
    } else {
      setDetails(prev => ({
        ...prev,
        category: '',
      }));
    }
  };

  const manageColor = color => {
    const isContained = details?.colors?.includes(color.name);

    if (!isContained) {
      setDetails(prev => ({
        ...prev,
        colors: [color.name, ...prev.colors],
      }));
    } else {
      const prevArrExcludeColor = details?.colors.filter(c => c !== color.name);
      setDetails(prev => ({
        ...prev,
        colors: prevArrExcludeColor,
      }));
    }
  };

  const manageSizes = size => {
    const isContained = details?.sizes?.includes(size.name);

    if (!isContained) {
      setDetails(prev => ({
        ...prev,
        sizes: [size.name, ...prev.sizes],
      }));
    } else {
      const prevArrExcludeColor = details?.sizes.filter(c => c !== size.name);
      setDetails(prev => ({
        ...prev,
        sizes: prevArrExcludeColor,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(details);
    // if (businessLogo) {
    try {
      // formData.append('images', images);

      if (selectedProductId && mode === 'update') {
        const data = {
          product_name: details?.name,
          color: details?.colors[0],
          price: details?.price,
          category: details?.category,
        };

        await AboutBusinessService.updateBusinessProduct(
          data,
          selectedProductId,
        );

        dispatch(fetchProductsOnShelf());
        setLoading(false);
        navigation.navigate('view_products');
      } else {
        // const formData = new FormData();
        let formData = new FormData();
        formData.append('product_name', details.name);
        formData.append('price', details.price);
        formData.append('category', details.category);
        formData.append('size', details.sizes[0]);
        formData.append('qty', details.quantity);
        formData.append('min_order', 2);

        // details?.colors.forEach(color => {
        //   formData.append('colors', color);
        // });
        images.forEach(img => {
          formData.append('images', {
            uri: img?.uri,
            name: img?.name,
            type: img?.type,
          });
        });
        await AboutBusinessService.createBusinessProduct(formData);

        dispatch(fetchProductsOnShelf());
        setLoading(false);
        navigation.navigate('view_products');
      }

      // navigation.navigate('view_products');
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);

      const err = JSON.stringify(
        error?.response.data || error?.message || error,
      );
      toast.show({
        title: 'Error!',
        status: 'error',
        description: err,
      });
      // setLoading(false);
      return;
    }
  };

  const toggleCategoryInput = () => {
    setShowCategoryInput(!showCategoryInput);
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(imgs => {
        setImages(() => [...imgs]);

        const uploadedImages = [];

        imgs.forEach(img => {
          const splitImageURI = img?.path?.split('/');
          const imageName = splitImageURI[splitImageURI?.length - 1];

          uploadedImages.push({
            uri: img?.path,
            name: imageName,
            type: img?.mime,
          });
        });
        setImages(() => [...uploadedImages]);

        // console.log(uploadedImages);
      })
      .catch(err => {
        toast.show({
          title: 'Error!',
          status: 'error',
          description: err?.message,
        });

        return;
      });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await JSON.parse(
          await AsyncStorageService.getData('user'),
        );

        if (user?.token) {
          const businessCategories =
            await AboutBusinessService.fetchBusinessCategories();

          const cats = [];
          businessCategories.Categories.map(({name, _id}) =>
            cats.push({name, id: _id}),
          );

          setCategories(cats);
        } else {
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      await AuthService.fetchFacebookUserDetails();
    };

    initFetch();
  }, []);

  return (
    <Box safeArea mb={10} p={3}>
      {/* header */}
      <Header title={'New Product'} />

      {/* body */}
      <ScrollView>
        <VStack py={3} space={3}>
          {/* profile image */}
          <ProductUploader
            images={images}
            // businessLogo={businessLogo}
            uploadImage={uploadImage}
          />

          {/* inputs */}
          <Box>
            <LabeledInput
              label={'Product name?'}
              placeholder={'e.g. shoes'}
              value={details?.name}
              handleChange={name => setDetails(prev => ({...prev, name}))}
            />
          </Box>

          {/* selling */}
          <Box>
            <LabeledInput
              label={'Selling Price'}
              placeholder={'e.g. 500'}
              value={details?.price}
              handleChange={name =>
                setDetails(prev => ({...prev, price: name}))
              }
            />
          </Box>

          {/* Select product category */}
          <SelectCategory
            categories={categories}
            manageCategory={manageCategory}
            details={details}
            toggleCategoryInput={toggleCategoryInput}
            showCategoryInput={showCategoryInput}
          />

          {/* select color */}
          <SelectColor manageColor={manageColor} details={details} />

          <FormControl display={'flex'} p={0}>
            <FormControl.Label _text={{color: 'black'}}>
              Quantity
            </FormControl.Label>
            <HStack alignItems={'center'} h={12} p={0} space={'1'}>
              <Select
                selectedValue={details.quantity_unit}
                // minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="--kg/ltr/pieces--"
                bg={'secondary'}
                color="primary"
                width={'160px'}
                borderRadius={'xl'}
                // style={{color: 'white'}}
                onValueChange={itemValue =>
                  setDetails(prev => ({...prev, quantity_unit: itemValue}))
                }>
                <Select.Item label="Kg" value="kg" />
                <Select.Item label="Litre" value="ltr" />
                <Select.Item label="Gram" value="gram" />
                <Select.Item label="Millilitre" value="ml" />
                <Select.Item label="Pieces" value="pieces" />
              </Select>

              <LabeledInput
                // label={'Selling Price'}
                mt={-5}
                placeholder={'eg. 20'}
                value={details?.quantity}
                handleChange={name =>
                  setDetails(prev => ({...prev, quantity: name}))
                }
              />
            </HStack>
          </FormControl>

          {/* sizes */}
          <SelectSize manageSizes={manageSizes} details={details} />

          {loading ? (
            <LoadingButton />
          ) : (
            <SubmitButton
              text={selectedProductId ? 'Update ' : 'Add Product'}
              handlePress={handleSubmit}
            />
          )}
          {/* </Button> */}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default AboutBusiness;
