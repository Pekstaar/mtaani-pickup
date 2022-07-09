import {Pressable, HStack, Image, Icon, Text} from 'native-base';
import React from 'react';
import {assets} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActiveNotificationLabel from './ActiveNotificaitonLabel';

const DashboardHeader = ({isActive = true}) => {
  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} p={2}>
      <Image
        source={assets.profile}
        alt="profile pic"
        height={10}
        width={10}
        borderRadius={'full'}
      />

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
