import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Box, HStack, Icon, Pressable, Text} from 'native-base';
import {useSelector} from 'react-redux';

const CustomDrawer = props => {
  const {navigation} = props;
  const {user, currentBusiness} = useSelector(state => state.auth);

  return (
    <>
      <Box flex={'1'}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: '#fff'}}>
          <Head
            business={currentBusiness}
            handlePress={() => {
              navigation.navigate('profile');

              navigation.closeDrawer();
            }}
          />

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Box>

      <Box h={130}>
        <Pressable
          onPress={() => {
            navigation.navigate('settings');
            navigation.closeDrawer();
          }}
          mx={'3'}
          _pressed={{bg: 'amber.50'}}
          borderRadius="full">
          <HStack space={'5'} p={'3'}>
            {/* icon */}
            <Icon size={22} as={<Ionicons name={'md-settings-outline'} />} />
            {/* text */}
            <Text>Settings</Text>
            {/* icon */}
            <Box ml={'10'} borderRadius={'full'} bg={'trueGray.300'} p={'1'}>
              <Icon
                color={'black'}
                size={4}
                as={<Ionicons name={'arrow-forward'} />}
              />
            </Box>
          </HStack>
        </Pressable>
      </Box>
    </>
  );
};

export default CustomDrawer;

const Head = ({handlePress, business}) => (
  <Pressable _pressed={{bg: 'amber.50'}} onPress={handlePress} mb={'3'}>
    <HStack p={4} justifyContent={'center'} space={'3'} alignItems={'center'}>
      {/* avatar */}
      <Avatar
        bg="cyan.500"
        shadow={'1'}
        source={{
          uri: business?.logo,
        }}>
        {business?.name?.charAt(0) + business?.name?.charAt(1)}
      </Avatar>
      {/* details */}
      <Box>
        <Text fontSize={'md'} fontWeight={'700'}>
          {business?.name}
        </Text>
        <Text fontSize={'xs'}>View account</Text>
      </Box>

      {/* icon */}
      <Icon
        ml={'5'}
        size={'6'}
        color={'primary'}
        as={<Ionicons name={'chevron-forward'} />}
      />
    </HStack>
  </Pressable>
);
