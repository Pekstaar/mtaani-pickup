import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import assets from '../../constants/assets';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {logoutUser} from '../../globals/Utils';
import {LocalNotification} from '../../src/services/LocalPushController';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import NotificationController from '../../src/services/NotificationController';

const Dashboard = () => {
  const navigation = useNavigation();

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

  useEffect(() => {
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
    <ScrollView>
      <Box safeArea p={3}>
        <NotificationController />

        {/* header */}
        <HStack justifyContent={'space-between'} alignItems={'center'} p={2}>
          <Image
            source={assets.profile}
            alt="profile pic"
            height={12}
            width={12}
            borderRadius={'full'}
          />

          <Pressable
            bg={'white'}
            p={2}
            borderRadius={'full'}
            onPress={getToken}>
            <Text>Pop Notification</Text>
          </Pressable>

          <Pressable
            bg={'white'}
            p={2}
            borderRadius={'full'}
            onPress={() => {
              logoutUser(() => navigation.navigate('Login'));
            }}>
            <Icon
              color={'gray.500'}
              size={6}
              as={<AntDesign name="logout" />}
            />
          </Pressable>
        </HStack>

        <ScrollView
          mt={2}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <HStack space={1}>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'blue.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'orange.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'indigo.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'muted.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'red.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'teal.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'green.500'}
                borderRadius={'full'}
              />
            </Circle>
            <Circle>
              <Box
                height={12}
                width={12}
                backgroundColor={'cyan.500'}
                borderRadius={'full'}
              />
            </Circle>
          </HStack>
        </ScrollView>

        <Card />
        <Card />
        <Card />
      </Box>
    </ScrollView>
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
