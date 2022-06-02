import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  View,
  Text,
  useToast,
  VStack,
  ScrollView,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {assets, COLORS, SIZES} from '../constants';
import {Header} from './Login';
import {LabeledInput} from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorageService from '../services/AsyncStorageService';
import AboutBusinessService from '../services/AboutBusinessService';
import {LoadingButton, SubmitButton} from './Credentials';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import AuthService from '../services/AuthService';

// const initCategories = [
//   'cosmetics',
//   'clothes',
//   'Jewellery',
//   'Accessories',
//   'Electronics',
//   'Shoes',
//   'Perfume',
// ];

const AboutBusiness = () => {
  const toast = useToast();
  // const dispatch = useDispatch();

  const [details, setDetails] = useState({
    bName: '',
    itemSold: '',
    category: '',
  });
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (businessLogo) {
      const formData = new FormData();
      formData.append('name', details?.bName);
      formData.append('what_u_sale', details?.itemSold);
      formData.append('category', details?.category?.id);
      // formData.append('logo', {
      //   uri: businessLogo?.path,
      //   type: businessLogo?.mime,
      // });

      try {
        axios({
          url: `http://178.62.228.130:4000/api/business`,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${
              JSON.parse(await AsyncStorageService.getData('user'))?.token
            }`,
          },
        })
          .then(function (response) {
            console.log('response :', response);
            setLoading(false);
          })
          .catch(function (error) {
            console.log('error : ', error.response.data);
            setLoading(false);
          });

        setLoading(false);
      } catch (error) {
        toast.show({
          title: 'Error!',
          status: 'error',
          description: err?.message,
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

      // try {
      // await AboutBusinessService.setBusinessCategoryDetails(formData);
      console.log(formData);
      setLoading(false);
      // } catch (error) {
      //   toast.show({
      //     title: 'Error!',
      //     status: 'error',
      //     description: err?.message,
      //   });
      //   setLoading(false);

      //   return;
      // }
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

  const logoutUser = () => {
    // dispatch(logout);
    AsyncStorageService.removeData('user');
    navigation.navigate('Login');
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
    <KeyboardAvoidingWrapper>
      <Box safeArea p={3}>
        {/* header */}
        <Header title={'Tell us about your business'} />

        {/* body */}
        <VStack py={8} space={5}>
          {/* profile image */}
          <Center>
            <Box
              bg={'gray.400'}
              borderRadius={'full'}
              p={'0.5'}
              position={'relative'}>
              <Image
                source={
                  businessLogo
                    ? {
                        uri: businessLogo?.path,
                      }
                    : assets.empty
                }
                borderRadius={'full'}
                width={'120px'}
                height={'120px'}
                alt="business_logo"
              />

              <Button
                position="absolute"
                bottom={-10}
                left={-5}
                bg={'secondary'}
                p={2}
                borderRadius={'full'}
                borderColor={'white'}
                borderWidth={2}
                onPress={uploadImage}>
                <Icon
                  size={6}
                  color={'white'}
                  as={<AntDesign name="camera" />}
                />
              </Button>
            </Box>

            {/* Text */}
            <Text color="gray.600" fontWeight={600} mt={4}>
              Upload your business logo
            </Text>
          </Center>

          {/* inputs */}
          <VStack space={4}>
            <Box height={20}>
              <LabeledInput
                label={'Business/shop name'}
                placeholder={'Business name'}
                value={details?.bName}
                handleChange={name =>
                  setDetails(prev => ({...prev, bName: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'What do you sell?'}
                placeholder={'e.g. shoes'}
                value={details?.itemSold}
                handleChange={name =>
                  setDetails(prev => ({...prev, itemSold: name}))
                }
              />
            </Box>
          </VStack>

          {/* select category */}
          <Box>
            <Text fontWeight={700} fontSize={SIZES.base}>
              Select category tag
            </Text>

            {/* buttons */}
            <VStack>
              <ScrollView maxHeight={40} mb={2}>
                <HStack
                  display={'flex'}
                  flexDirection="row"
                  flexWrap="wrap"
                  space={2}
                  mt={1}
                  py={'2'}>
                  {categories.map((cat, i) => (
                    <CategoryButton
                      key={i}
                      name={cat?.name}
                      handlePress={() => manageCategory(cat)}
                      isSelected={details?.category === cat}
                    />
                  ))}
                  <CategoryButton
                    name={'Other'}
                    handlePress={toggleCategoryInput}
                    isSelected={showCategoryInput}
                  />
                </HStack>
              </ScrollView>

              {showCategoryInput && (
                <LabeledInput
                  label={'category'}
                  placeholder={'e.g. shoes'}
                  value={details?.itemSold}
                  handleChange={name =>
                    setDetails(prev => ({...prev, itemSold: name}))
                  }
                />
              )}
            </VStack>
          </Box>

          <Button bg={'black'} onPress={logoutUser}>
            Logout
          </Button>

          {/* <Button
            bg={'primary'}
            borderRadius={'full'}
            mt={4}
            width={'full'}
            onPress={handleSubmit}>
            <Text color={'secondary'} fontWeight={800} fontSize={'md'}>
              NEXT
            </Text> */}

          {loading ? (
            <LoadingButton />
          ) : (
            <SubmitButton text={'NEXT'} handlePress={handleSubmit} />
          )}
          {/* </Button> */}
        </VStack>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default AboutBusiness;

const CategoryButton = ({name, isSelected, handlePress}) => (
  <Button
    bg={isSelected ? 'primary' : COLORS.lightGray2}
    borderRadius={'2xl'}
    p={2}
    px={2.5}
    my={1}
    width={'30%'}
    onPress={handlePress}>
    <Text color={'black'} fontWeight={700} fontSize={SIZES.sm}>
      {name}
    </Text>
  </Button>
);
