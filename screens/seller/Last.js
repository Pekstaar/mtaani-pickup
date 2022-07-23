import {useNavigation} from '@react-navigation/native';
import {
  Box,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {LabeledInput} from '../../components/Input';
import {SIZES} from '../../constants';
import {Header} from '../Login';
// import MapView, {Marker} from 'react-native-maps';
import AboutBusinessService from '../../services/AboutBusinessService';
import Selector from '../../components/Seller/business_details/Selector';
import Toast from '../../components/general/toasts';
import {LoadingButton, SubmitButton} from '../Credentials';
import {fetchProfileDetails, storeDetailsToLocalStorage} from '../../src/Utils';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Redux/reducers/authSlice';

const INITIAL_REGION = {
  latitude: -1.286389,
  longitude: 36.817223,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};

const Last = ({route: {params}}) => {
  const toast = useToast();
  const navigator = useNavigation();

  const [details, setDetails] = useState({
    till: '',
    mpesaPhone: '',
    homeAgent: '',
    location: '',
    region: INITIAL_REGION,
  });

  const dispatch = useDispatch();

  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(params?.business);

  useEffect(() => {
    console.log(params);

    setLoading(false);
    const fetchAgents = () => {
      AboutBusinessService.fetchAgents()
        .then(r => {
          setAgents(r?.locations);
          console.log(r.locations);
        })
        .catch(err => {
          console.log(err);
        });
    };

    fetchAgents();
  }, []);

  const handleSelectAgent = agent => {
    setSelectedAgent(agent);
    setShowSelector(false);
  };
  // const handleRegionChange = region => {
  //   setDetails(prev => ({...prev, region}));
  //   console.log(region);
  // };

  // const navigation = useNavigation();

  // const handleSubmit = () => {
  //   console.log(details);
  //   navigation.navigate('rider_details');
  // };

  const validateCredentials = () => {
    if (details?.till === '') {
      toast.show({
        render: () => {
          return <Toast.error message={'please pass in your till number!'} />;
        },
        duration: 2300,
      });

      return false;
    } else if (details?.mpesaPhone === '') {
      toast.show({
        render: () => {
          return <Toast.error message={'please pass in your phone number!'} />;
        },
        duration: 2300,
      });

      return false;
    } else if (!selectedAgent?._id) {
      toast.show({
        render: () => {
          return <Toast.error message={'please select Agent!'} />;
        },
        duration: 2300,
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);

    const isValid = validateCredentials();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const r = await AboutBusinessService?.addBusinessDetails(
        params?.business?._id,
        {
          till_No: details?.till,
          Mpesa_No: details?.mpesaPhone,
          agent: selectedAgent?._id,
        },
      );

      const fetchedDetails = await fetchProfileDetails(params?.user?._id, {
        token: params?.user?.token,
      });

      // console.log(fetchedDetails);user

      // store details to redux
      dispatch(setUser(fetchedDetails));

      await storeDetailsToLocalStorage('user', fetchedDetails);

      toast.show({
        render: () => {
          return <Toast.success message={r?.message} />;
        },
      });

      setLoading(false);
      if (params?.user?.token) {
        navigator.navigate('drawer');
      } else {
        navigator.navigate('Login');
      }
    } catch (err) {
      console.log(err);

      setLoading(false);

      toast.show({
        render: () => {
          return (
            <Toast.error message={err.response.data?.message || err.message} />
          );
        },
      });
    }
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
            {/* <Box height={20}> */}
            {/* <LabeledInput
            label={"Till number"}
            placeholder={"Enter your till number"}
            value={details?.till}
            handleChange={(till) => setDetails((prev) => ({ ...prev, till }))}
          /> */}
            <Selector
              onSelect={handleSelectAgent}
              Text={selectedAgent?.agent_location}
              isOpen={showSelector}
              placeHolderText={'-- Tap to Select agent --'}
              onClose={() => setShowSelector(false)}
              onOpen={() => setShowSelector(true)}
              list={agents}
            />
            {/* </Box> */}
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

          {/* <MapView
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
          </MapView> */}
          {loading ? (
            <LoadingButton text="Saving details . . ." />
          ) : (
            <SubmitButton text={' Save Details'} handlePress={handleSubmit} />
          )}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Last;
