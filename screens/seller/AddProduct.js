import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
  ScrollView,
  Select,
  FormControl,
  Input,
} from 'native-base';
import React, {useState, useEffect, useMemo} from 'react';
import {assets, COLORS, SIZES} from '../../constants';
import {Header} from '../Login';
import {LabeledInput} from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorageService from '../../services/AsyncStorageService';
import AboutBusinessService from '../../services/AboutBusinessService';
import {LoadingButton, SubmitButton} from '../Credentials';
import AuthService from '../../services/AuthService';
import ProductUploader from '../../components/Seller/add_product/ProductUploader';
import {SelectCategory} from '../../components/general/SelectCategory';
import {SelectColor} from '../../components/Seller/add_product/SelectColor';

import {useSelector} from 'react-redux';

const AboutBusiness = () => {
  const toast = useToast();
  const {selectedProduct: selectedProductId, products} = useSelector(
    state => state.shelf,
  );
  const navigation = useNavigation();

  const selectedProduct = useMemo(
    () => products.find(item => item._id === selectedProductId),
    [selectedProductId, products],
  );

  const [details, setDetails] = useState({
    name: selectedProduct?.product_name || '',
    colors: [selectedProduct?.color],
    category: selectedProduct?.category._id || '',
    price: selectedProduct?.price?.toString() || '',
  });
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedProduct?.images.length > 0) {
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
    const isContained = details?.colors?.includes(color);

    if (!isContained) {
      setDetails(prev => ({
        ...prev,
        colors: [...prev.colors, color.name],
      }));
    } else {
      const prevArrExcludeColor = details?.colors.filter(c => c !== color);
      setDetails(prev => ({
        ...prev,
        colors: prevArrExcludeColor,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(details);
    // if (businessLogo) {
    try {
      // const formData = new FormData();
      let formData = new FormData();
      formData.append('product_name', details.name);
      formData.append('color', details.colors[0].name);
      formData.append('price', details.price);
      formData.append('category', details.category.id);

      // formData.append('images', images);

      if (selectedProductId) {
        await AboutBusinessService.updateBusinessProduct(
          formData,
          selectedProductId,
        );
      } else {
        images.forEach(img => {
          formData.append('images', {
            uri: img?.uri,
            name: img?.name,
            type: img?.type,
          });
        });
        await AboutBusinessService.createBusinessProduct(formData);
      }

      navigation.navigate('view_products');
      setLoading(false);
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
      <Header title={'Upload Product'} />

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
              placeholder={'e.g. shoes'}
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

          {/* <FormControl display={'flex'} p={0}>
            <FormControl.Label _text={{color: 'black'}}>
              Quantity
            </FormControl.Label> */}
          {/* <HStack alignItems={'center'} bg={'blue.300'} p={0}>
            <Select
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="--kg/ltr/pieces--"
              bg={'secondary'}
              color="primary"
              // style={{color: 'white'}}
              onValueChange={itemValue => setService(itemValue)}>
              <Select.Item label="Kg" value="kg" />
              <Select.Item label="ltr" value="litre" />
              <Select.Item label="Pieces" value="pieces" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>

            <LabeledInput
              // label={'Selling Price'}
              placeholder={'e.g. shoes'}
              value={details?.itemSold}
              handleChange={name =>
                setDetails(prev => ({...prev, itemSold: name}))
              }
            />
          </HStack> */}
          {/* </FormControl> */}

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
