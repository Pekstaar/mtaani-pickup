import React, {useEffect, useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SalesAnalytics,
  SellerCustomers,
  SendPackage,
  TrackOrder,
  ViewShelfProducts,
} from '../../screens';
import {Navigator} from './BottomNav';
import CustomDrawer from './CustomDrawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const DrawerNav = ({navigation}) => {
  const Drawer = createDrawerNavigator();

  const {currentBusiness, businesses, user} = useSelector(state => state.auth);

  const hasBusiness = useMemo(() => {
    if (businesses.length === 0) {
      return false;
    }

    if (currentBusiness?._id) {
      return true;
    } else {
      return false;
    }
  }, [currentBusiness, businesses]);

  useEffect(() => {
    if (!hasBusiness) {
      navigation.navigate('about_business', {user});
    }
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 6,
        },
        drawerActiveBackgroundColor: '#FDF7D3',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          fontWeight: 'normal',
          fontFamily: 'Lato-Medium',
        },
      }}>
      <>
        {/* <Stack.Screen name="main" component={Navigator} /> */}
        <Drawer.Screen
          name="Home"
          component={Navigator}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign name={'home'} size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Send package"
          component={SendPackage}
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons
                size={22}
                color={color}
                name={'truck-fast-outline'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Track Order"
          component={TrackOrder}
          options={{
            drawerIcon: ({color}) => (
              <IonIcons size={22} color={color} name={'ios-location-outline'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Products"
          component={ViewShelfProducts}
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons
                size={22}
                color={color}
                name={'tshirt-crew-outline'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Sales analytics"
          component={SalesAnalytics}
          options={{
            drawerIcon: ({color}) => (
              <Entypo size={22} color={color} name={'bar-graph'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Customer List"
          component={SellerCustomers}
          options={{
            drawerIcon: ({color}) => (
              <IonIcons size={22} color={color} name={'ios-people-outline'} />
            ),
          }}
        />

        <Drawer.Screen
          name="Rider"
          component={SellerCustomers}
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons
                size={22}
                color={color}
                name={'racing-helmet'}
              />
            ),
          }}
        />
      </>
    </Drawer.Navigator>
  );
};

export default DrawerNav;
