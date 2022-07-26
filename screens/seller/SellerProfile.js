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
import React from 'react';
import {assets} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../Login';
import {useSelector} from 'react-redux';

import {LabeledInput} from '../../components/Input';
import {SubmitButton} from '../Credentials';
import {useNavigation} from '@react-navigation/native';

const SellerProfile = () => {
  const {user, currentBusiness} = useSelector(state => state.auth);

  const navigation = useNavigation();

  const handleAddBusiness = () => {
    navigation.navigate('about_business', {user, mode: 'add'});
  };

  return (
    <Box safeArea px={'2'}>
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
                  currentBusiness.logo
                    ? {
                        uri: currentBusiness.logo,
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
              {currentBusiness?.name}
            </Text>
          </Center>
          {/* name */}

          <VStack space={'2'}>
            <Box height={20}>
              <LabeledInput
                label={'Business/shop name'}
                placeholder={'e.g. Business name'}
                value={currentBusiness.name}
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
                value={currentBusiness.what_u_sale}
                disabled={true}
                handleChange={name =>
                  setDetails(prev => ({...prev, itemSold: name}))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Till Number'}
                placeholder={'enter your business till number'}
                value={currentBusiness.till_No?.toString()}
                disabled={true}
                // handleChange={name =>
                //   setDetails(prev => ({...prev, itemSold: name}))
                // }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Mpesa phone Number'}
                placeholder={'enter your mpesa phone number'}
                value={currentBusiness.Mpesa_No?.toString()}
                disabled={true}
                // handleChange={name =>
                //   setDetails(prev => ({...prev, itemSold: name}))
                // }
              />
            </Box>

            <SubmitButton
              text={'Add Business'}
              handlePress={handleAddBusiness}
            />
          </VStack>
        </VStack>
      </ScrollView>
      {/* fields */}
    </Box>
  );
};

export default SellerProfile;
