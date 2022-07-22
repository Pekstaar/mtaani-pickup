import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Box, Center, Icon, Stack, Text} from 'native-base';
import React from 'react';
import {
  Dashboard,
  Notifications,
  SendPackage,
  Tracker,
  ViewShelfProducts,
} from '../../screens';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentNavMarker from './CurrentNavMarker';

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  const ICON_SIZE = 6;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 62,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          // position: 'absolute'
          paddingHorizontal: 5,
        },
      }}>
      {/* Dashboard screen */}
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE}
                  as={<AntDesign name={'home'} />}
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontWeight={'700'}
                  fontSize={'12px'}>
                  Home
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* send package screen */}
      <Tab.Screen
        name="send_package"
        component={SendPackage}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE + 1}
                  as={<MaterialCommunityIcons name={'truck-fast-outline'} />}
                />

                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontSize={'12px'}
                  fontWeight={'700'}>
                  Send
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* Products screen */}
      <Tab.Screen
        name="products"
        component={ViewShelfProducts}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE}
                  as={<MaterialCommunityIcons name={'tshirt-crew-outline'} />}
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontSize={'12px'}
                  fontWeight={'700'}>
                  Products
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* Notifications screen */}
      <Tab.Screen
        name="notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE}
                  as={<Ionicons name="ios-notifications-outline" />}
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontSize={'12px'}
                  fontWeight={'600'}>
                  Notifications
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* shelf screen
      <Tab.Screen
        name="sales"
        component={Tracker}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE}
                  as={<Entypo name={'bar-graph'} />}
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontSize={'12px'}
                  fontWeight={'700'}>
                  Sales
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      /> */}

      {/* shelf screen
      <Tab.Screen
        name="menu"
        component={Tracker}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center>
                <Icon
                  color={focused ? 'muted.800' : 'trueGray.300'}
                  size={ICON_SIZE}
                  as={<AntDesign name={'menu-unfold'} />}
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontSize={'12px'}
                  fontWeight={'700'}>
                  Menu
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};
