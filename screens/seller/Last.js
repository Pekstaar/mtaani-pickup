import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {LabeledInput, Picker, Selector} from '../../components/Input';
import {SIZES} from '../../constants';
import {Header} from '../Login';
import MapView, {Marker} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: -1.286389,
  longitude: 36.817223,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};

const Last = () => {
  const [details, setDetails] = useState({
    till: '',
    mpesaPhone: '',
    homeAgent: '',
    location: '',
    region: INITIAL_REGION,
  });

  const handleRegionChange = region => {
    setDetails(prev => ({...prev, region}));
    console.log(region);
  };

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(details);
    navigation.navigate('rider_details');
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Box safeArea p={3}>
          {/* Header */}
          <Box>
            <Header title={'One last step'} />
          </Box>

          <VStack space={2}>
            <Box height={20}>
              <LabeledInput
                label={'Till number'}
                placeholder={'Enter your till number'}
                value={details?.till}
                handleChange={till => setDetails(prev => ({...prev, till}))}
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'M-Pesa Phone number'}
                placeholder={'Type mpesa number'}
                value={details?.mpesaPhone}
                handleChange={phone =>
                  setDetails(prev => ({...prev, mpesaPhone: phone}))
                }
              />
            </Box>
          </VStack>

          <VStack space={1} my={4}>
            <Box>
              <Text fontWeight={700} fontSize={SIZES.md}>
                Pickup Location Details
              </Text>
              <Text fontWeight={600} fontSize={SIZES.sm - 1} color={'gray.500'}>
                For rider to pick your products from your home/workspace
              </Text>
            </Box>

            <Box height={20}>
              {/* <LabeledInput
            label={"Till number"}
            placeholder={"Enter your till number"}
            value={details?.till}
            handleChange={(till) => setDetails((prev) => ({ ...prev, till }))}
          /> */}
              <Selector placeholder={'Tap to Select home agent'} />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={'Location'}
                placeholder={'e.g. Kasarani - Seasons'}
                value={details?.location}
                handleChange={location =>
                  setDetails(prev => ({...prev, location}))
                }
              />
            </Box>
          </VStack>

          <MapView
            style={{
              height: 250,
            }}
            initialRegion={details?.region}
            onRegionChange={handleRegionChange}
            onPress={r => {
              console.log(r);
            }}>
            <Marker
              coordinate={{
                latitude: details?.region?.latitude,
                longitude: details?.region?.longitude,
              }}
              title={'your location'}
              // description={marker.description}
            />
          </MapView>

          <Button
            bg={'primary'}
            borderRadius={'full'}
            mt={4}
            width={'full'}
            onPress={handleSubmit}>
            <Text color={'secondary'} fontWeight={800} fontSize={'md'}>
              Save Details
            </Text>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Last;
