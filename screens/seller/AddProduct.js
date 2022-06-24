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
import React, {useState, useEffect} from 'react';
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

const AboutBusiness = () => {
  const toast = useToast();

  const [details, setDetails] = useState({
    bName: '',
    itemSold: '',
    category: '',
  });
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [service, setService] = React.useState('');

  const navigation = useNavigation();

  const [businessLogo, setBusinessLogo] = useState(null);

  const manageCategory = c => {
    const isContained = details?.categories?.includes(c?.id);

    if (!isContained) {
      setDetails(prev => ({
        ...prev,
        category: c,
      }));
    } else {
      setDetails(prev => ({
        ...prev,
        category: '',
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(businessLogo);

    if (businessLogo) {
      try {
        const formData = new FormData();
        formData.append('name', details?.bName);
        formData.append('what_u_sale', details?.itemSold);
        formData.append('category', details?.category?.id);

        const imageURI = businessLogo?.path;
        const splitImageURI = imageURI?.split('/');
        const imageName = splitImageURI[splitImageURI?.length - 1];

        formData.append('logo', {
          uri: businessLogo?.path,
          name: imageName,
          type: businessLogo?.mime, // This is important for Android!!
        });

        await AboutBusinessService.setBusinessCategoryDetails(formData);

        setLoading(false);
        return;
      } catch (error) {
        const err = JSON.stringify(
          error?.response.data.message || error?.response.data,
        );
        toast.show({
          title: 'Error!',
          status: 'error',
          description: err,
        });

        setLoading(false);
        return;
      }

      // navigation.navigate('last');
    } else {
      const formData = new FormData();
      formData.append('name', details?.bName);
      formData.append('what_u_sale', details?.itemSold);
      formData.append('category', details?.category?.id);

      try {
        await AboutBusinessService.setBusinessCategoryDetails(formData);

        setLoading(false);
        return;
      } catch (error) {
        const err = JSON.stringify(
          error?.response.data.message || error?.response.data,
        );

        toast.show({
          title: 'Error!',
          status: 'error',
          description: err,
        });

        setLoading(false);

        return;
      }
    }

    //
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
    })
      .then(image => {
        setBusinessLogo(image);
        console.log(image);
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

  // useFocusEffect

  return (
    <Box safeArea mb={10} p={3}>
      {/* header */}
      <Header title={'Upload Product'} />

      {/* body */}
      <ScrollView>
        <VStack py={3} space={3}>
          {/* profile image */}
          <ProductUploader
            businessLogo={businessLogo}
            uploadImage={uploadImage}
          />

          {/* inputs */}
          <Box>
            <LabeledInput
              label={'Product name?'}
              placeholder={'e.g. shoes'}
              value={details?.itemSold}
              handleChange={name =>
                setDetails(prev => ({...prev, itemSold: name}))
              }
            />
          </Box>

          {/* selling */}
          <Box>
            <LabeledInput
              label={'Selling Price'}
              placeholder={'e.g. shoes'}
              value={details?.itemSold}
              handleChange={name =>
                setDetails(prev => ({...prev, itemSold: name}))
              }
            />
          </Box>

          {/* Select product category */}
          <SelectCategory />

          {/* select color */}
          <SelectColor />

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
            <SubmitButton text={'NEXT'} handlePress={handleSubmit} />
          )}
          {/* </Button> */}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default AboutBusiness;
