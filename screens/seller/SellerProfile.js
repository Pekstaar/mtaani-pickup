import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {assets, SIZES} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../Login';
import {useDispatch, useSelector} from 'react-redux';

import {LabeledInput} from '../../components/Input';
import {LoadingButton, SubmitButton} from '../Credentials';
import {useNavigation} from '@react-navigation/native';
import CButton from '../../components/general/Buttons';
import Toast from '../../components/general/toasts';
import AboutBusinessService from '../../services/AboutBusinessService';
import {fetchAndStoreBusinesDetails} from '../../src/Utils';
import {setCurrentBusiness} from '../../Redux/reducers/authSlice';
// import ImagePicker from 'react-native-image-crop-picker';

const SellerProfile = () => {
  const {user, currentBusiness} = useSelector(state => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();

  const [details, setDetails] = useState(currentBusiness);
  const [loading, setLoading] = useState(false);
  // const [businessLogo, setBusinessLogo] = useState(currentBusiness?.logo);

  const navigation = useNavigation();
  console.log(currentBusiness, user);

  const handleAddBusiness = () => {
    navigation.navigate('about_business', {user, mode: 'add'});
  };

  const handleUpdate = () => {
    setLoading(true);
    try {
      AboutBusinessService.updateBusiness(currentBusiness?._id, {
        ...details,
      }).then(async () => {
        await fetchAndStoreBusinesDetails().then(async businesses => {
          const current = businesses?.filter(
            item => item?._id === currentBusiness?._id,
          )[0];
          dispatch(setCurrentBusiness(current));

          toast.show({
            render: () => {
              return <Toast.success message={`Update Successful!`} />;
            },
            duration: 2000,
          });
          setLoading(false);
          navigation.navigate('drawer', {screen: 'Home'});
        });
      });
    } catch (e) {
      toast.show({
        render: () => {
          return (
            <Toast.error
              message={`Update Error! ${e?.response?.data?.message}`}
            />
          );
        },
        duration: 2000,
      });

      setLoading(false);
    }
  };

  // const uploadImage = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       setBusinessLogo(image);
  //       console.log(image);
  //     })
  //     .catch(err => {
  //       toast.show({
  //         title: 'Error!',
  //         status: 'error',
  //         description: err?.message,
  //       });

  //       return;
  //     });
  // };

  return (
    <Box safeArea px={'2'} pb={'50px'}>
      <Header title={'My Profile'} />
      {/* user badge */}

      <ScrollView p={'2'}>
        <VStack>
          {/* avatar */}
          <Center>
            <Box
              bg={'gray.400'}
              borderRadius={'full'}
              p={'0.5'}
              position={'relative'}>
              <Image
                source={
                  details?.logo
                    ? {
                        uri: details?.logo,
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
                disabled>
                <Icon
                  size={6}
                  color={'white'}
                  as={<AntDesign name="camera" />}
                />
              </Button>
            </Box>

            {/* Text */}
            <Text color="gray.800" fontSize={'md'} fontWeight={600} mt={4}>
              {details?.name}
            </Text>
          </Center>
          {/* name */}

          <VStack space={'2'}>
            <Box height={20}>
              <LabeledInput
                label={'Business/shop name'}
                placeholder={'e.g. Business name'}
                value={details?.name}
                // disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, name: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'What do you sell?'}
                placeholder={'e.g. shoes'}
                value={details?.what_u_sale}
                // disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, what_u_sale: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Category'}
                placeholder={'e.g. Phone accessories'}
                value={details?.category?.name}
                // disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, category: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Till Number'}
                placeholder={'enter your business till number'}
                value={details?.till_No?.toString()}
                // disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, till_No: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Mpesa phone Number'}
                placeholder={'enter your mpesa phone number'}
                value={details?.Mpesa_No?.toString()}
                // disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, Mpesa_No: name}))
                }
              />
            </Box>

            {loading ? (
              <LoadingButton text={'Updating ...'} />
            ) : (
              <SubmitButton text={'UPDATE'} handlePress={handleUpdate} />
            )}

            <CButton.outlined
              mb={'5'}
              text={'ADD BUSINESS'}
              handlePress={handleAddBusiness}
              borderWidth={'1.5'}
              _text={{
                color: 'secondary',
                fontWeight: '800',
                textTransform: 'uppercase',
              }}
            />
          </VStack>
        </VStack>
      </ScrollView>
      {/* fields */}
    </Box>
  );
};

export default SellerProfile;
