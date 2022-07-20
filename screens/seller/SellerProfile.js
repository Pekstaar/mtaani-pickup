import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {assets} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../Login';
import {useSelector} from 'react-redux';
import AuthService from '../../services/AuthService';
import Loader from '../../components/general/Loader';
import {setUser} from '../../Redux/reducers/authSlice';
import {LabeledInput} from '../../components/Input';

const SellerProfile = () => {
  const {user} = useSelector(state => state.auth);

  const [userDetails, setUserDetails] = useState({});
  const [businessDetails, setBusinessDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = () => {
    setLoading(true);

    AuthService.getUserDetails(user?._id)
      .then(async r => {
        const business = await AuthService.getBusinessDetails(user?._id);

        setLoading(false);

        console.log(r?.userObj, business);
        setUserDetails(r?.userObj);
        setBusinessDetails(business?.Bus);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Box safeArea>
      {loading && <Loader />}

      <Header title={'My Profile'} />
      {/* user badge */}

      <ScrollView p={'3'}>
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
                  businessDetails?.logo
                    ? {
                        uri: businessDetails?.logo,
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
              {userDetails?.f_name + ' ' + userDetails?.l_name}
            </Text>
          </Center>
          {/* name */}

          <VStack space={'2'}>
            <Box height={20}>
              <LabeledInput
                label={'Business/shop name'}
                placeholder={'e.g. shoes'}
                value={businessDetails?.name}
                disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, itemSold: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'What do you sell?'}
                placeholder={'e.g. shoes'}
                value={businessDetails?.what_u_sale}
                disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, itemSold: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Till Number'}
                placeholder={'e.g. shoes'}
                value={businessDetails?.till_No?.toString()}
                disabled={true}
                // handleChange={name =>
                //   setDetails(prev => ({...prev, itemSold: name}))
                // }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Mpesa phone Number'}
                placeholder={'e.g. shoes'}
                value={businessDetails?.Mpesa_No?.toString()}
                disabled={true}
                // handleChange={name =>
                //   setDetails(prev => ({...prev, itemSold: name}))
                // }
              />
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
      {/* fields */}
    </Box>
  );
};

export default SellerProfile;
