import {Pressable, HStack, Image, Icon, Text} from 'native-base';
import React from 'react';
import {assets} from '../../../constants';
import ActiveNotificationLabel from './ActiveNotificaitonLabel';
import {logoutUser} from '../../../src/Utils';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DashboardHeader = ({isActive = true}) => {
  const navigation = useNavigation();

  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      px={5}
      py={3}
      shadow={'1'}
      bg={'#fff'}>
      <Image
        source={assets.profile}
        alt="profile pic"
        height={10}
        width={10}
        borderRadius={'full'}
      />

      <Pressable
        bg={'white'}
        p={2}
        borderRadius={'full'}
        onPress={() => {
          logoutUser(() => navigation.navigate('Login'));
        }}>
        <Icon color={'gray.500'} size={6} as={<AntDesign name="logout" />} />
      </Pressable>

      <Pressable>
        <Icon
          size={'6'}
          color={'black'}
          as={<Ionicons name="ios-notifications-outline" />}
        />

        {isActive && <ActiveNotificationLabel />}
      </Pressable>
    </HStack>
  );
};

export default DashboardHeader;
