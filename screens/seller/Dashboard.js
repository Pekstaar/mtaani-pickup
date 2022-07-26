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
import SendPackage from '../../components/Seller/Dashboard/SendPackage';
import TrackingSnippet from '../../components/Seller/Dashboard/TrackingSnippet';
import NotificationToolTip from '../../components/Seller/Dashboard/NotificationToolTip';
import {fetchProductsOnShelf} from '../../Redux/reducers/productsOnShelfSlice';

const Dashboard = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user, currentBusiness, businesses} = useSelector(state => state.auth);

  // const getToken = async () => {
  //   try {
  //     const fcmToken = await messaging().getToken();

  //     if (fcmToken) {
  //       console.log(fcmToken);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchCurrentBusinessProducts = () => {
    dispatch(fetchProductsOnShelf(currentBusiness?._id));
  };
  useEffect(() => {
    console.log(businesses);
    // console.log('User is:', user, currentBusiness);
    fetchCurrentBusinessProducts();
  }, [user?.token]);

  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in background', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

  //     console.log(remoteMessage);
  //   });

  //   getToken();

  //   return unsubscribe;
  // }, []);

  return (
    <>
      {<NotificationController />}

      {/* header */}
      <DashboardHeader user={user} business={currentBusiness} />
      <Box safeArea p={3} pb={'16'} bg={'white'}>
        <ScrollView>
          {!currentBusiness?._id && <NotificationToolTip user={user} />}
          {/* send package panel */}
          <SendPackage user={user} business={currentBusiness} />
          {/* Tracking snippet */}
          <TrackingSnippet />
        </ScrollView>
      </Box>
    </>
  );
};

export default Dashboard;
