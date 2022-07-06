import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS} from '../../constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontiso from 'react-native-vector-icons/Fontisto';
import {Box, Center, Icon, Stack, Text} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import {Dashboard, ViewShelfProducts} from '../../screens';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  const ICON_SIZE = 5;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
          borderRadius: 10,
          // position: 'absolute'
          paddingHorizontal: 6,
        },
      }}>
      {/* Dashboard screen */}
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Center p={2}>
                <Icon
                  color={focused ? 'muted.800' : 'muted.400'}
                  size={ICON_SIZE}
                  as={<FontAwesome name={'home'} />}
                />
                <Text fontSize={'xs'}>Dashboard</Text>
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
              <Center p={2}>
                <Icon
                  color={focused ? 'muted.800' : 'muted.400'}
                  size={ICON_SIZE}
                  as={<Fontiso name={'shopping-package'} />}
                />
                <Text fontSize={'xs'}>shelf</Text>
              </Center>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
