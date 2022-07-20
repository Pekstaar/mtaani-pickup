import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import assets from '../../constants/assets';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import NotificationController from '../../src/services/NotificationController';
import DashboardHeader from '../../components/Seller/Dashboard/DashboardHeader';
import FeaturedSeller from '../../components/Seller/Dashboard/FeaturedSeller';
import TopSellers from '../../components/Seller/Dashboard/TopSellers';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../Redux/reducers/authSlice';
import AsyncStorageService from '../../services/AsyncStorageService';

const Dashboard = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const s = useSelector(state => state.auth);

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        console.log(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const user = await JSON.parse(await AsyncStorageService.getData('user'));

    dispatch(setUser(user));
  };

  useEffect(() => {
    fetchUser();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      console.log(remoteMessage);
    });

    getToken();

    return unsubscribe;
  }, []);

  return (
    <>
      <NotificationController />

      {/* header */}
      <DashboardHeader />
      <Box safeArea p={3}>
        <ScrollView>
          {/* featured seller */}
          <FeaturedSeller />

          {/* Top sellers */}
          <TopSellers />
        </ScrollView>
      </Box>
    </>
  );
};

export default Dashboard;

const Circle = ({children}) => (
  <Box borderColor={'primary'} borderWidth={2} borderRadius={'full'}>
    <Box borderWidth={3} borderColor={'white'} borderRadius={'full'}>
      {children}
    </Box>
  </Box>
);

const Card = () => (
  <VStack height={'300px'} shadow={'7'} bg={'white'} borderRadius={'lg'} mt={5}>
    <Image source={assets.shopify} alt="image" flex={1} />
    <HStack alignItems={'center'} p={2}>
      <Center height={12} width={12} bg={'secondary'} borderRadius={'full'}>
        <Text color={'white'}>sellers</Text>
      </Center>

      <Box flex={1} padding={5}>
        <Text>Sellers</Text>
      </Box>
    </HStack>
  </VStack>
);
