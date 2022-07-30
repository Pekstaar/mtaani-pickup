import {Pressable, HStack, Image, Icon, Text} from 'native-base';
import React from 'react';
import {assets} from '../../../constants';

import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Menu} from '../../../assets';

const DashboardHeader = ({user, business, switchAccount}) => {
  const navigation = useNavigation();
  // const {isActive = true} = props;

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      px={5}
      py={3}
      shadow={'1'}
      bg={'#fff'}>
      <Pressable
        shadow={'1'}
        borderRadius={'full'}
        bg={'white'}
        _pressed={{
          opacity: '70',
        }}
        onPress={switchAccount}>
        <Image
          source={
            user?.token
              ? {
                  uri: business?.logo,
                }
              : assets.empty
          }
          alt="profile pic"
          resizeMode={'cover'}
          borderRadius={'full'}
          width={10}
          height={10}
        />
      </Pressable>

      <Pressable onPress={handleOpenDrawer}>
        <Menu width={18} height={18} />

        {/* {isActive && <ActiveNotificationLabel />} */}
      </Pressable>
    </HStack>
  );
};

export default DashboardHeader;
