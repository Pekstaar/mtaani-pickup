import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dashboard} from '../../screens';

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Discover" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
