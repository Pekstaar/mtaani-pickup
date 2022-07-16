import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Box, Center, Icon, Stack, Text} from 'native-base';
import React from 'react';
import {Dashboard, Tracker, ViewShelfProducts} from '../../screens';

// icons
import IonIcon from 'react-native-vector-icons/Ionicons';
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
                  as={
                    <MaterialCommunityIcons name={'view-dashboard-outline'} />
                  }
                />
                <Text
                  color={focused ? 'muted.800' : 'trueGray.400'}
                  fontWeight={'black'}
                  fontSize={'xs'}>
                  Discover
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* shelf screen */}
      <Tab.Screen
        name="view_shelf_products"
        component={ViewShelfProducts}
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
                  fontSize={'xs'}
                  fontWeight={'black'}>
                  Send
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* shelf screen */}
      <Tab.Screen
        name="tracker"
        component={Tracker}
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
                  fontSize={'xs'}
                  fontWeight={'black'}>
                  Products
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* shelf screen */}
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
                  fontSize={'xs'}
                  fontWeight={'black'}>
                  Sales
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />

      {/* shelf screen */}
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
                  fontSize={'xs'}
                  fontWeight={'black'}>
                  Menu
                </Text>

                {focused && <CurrentNavMarker />}
              </Center>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
