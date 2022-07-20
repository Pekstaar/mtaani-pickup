import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Box, HStack, Icon, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  return (
    <>
      <Box flex={'1'}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: '#fff'}}>
          <Head handlePress={() => navigation.navigate('profile')} />

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Box>

      <Box h={130}>
        <Pressable mx={'3'} _pressed={{bg: 'amber.50'}} borderRadius="full">
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

const Head = ({handlePress}) => (
  <Pressable _pressed={{bg: 'amber.50'}} onPress={handlePress} mb={'3'}>
    <HStack p={4} justifyContent={'center'} space={'3'} alignItems={'center'}>
      {/* avatar */}
      <Avatar
        bg="cyan.500"
        source={{
          uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}>
        EP
      </Avatar>
      {/* details */}
      <Box>
        <Text fontSize={'md'} fontWeight={'700'}>
          Christine
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
