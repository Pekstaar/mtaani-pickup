import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  extendTheme,
  KeyboardAvoidingView,
  NativeBaseProvider,
} from 'native-base';
import {
  AboutBusiness,
  Credentials,
  Last,
  Login,
  RiderDetails,
  Verification,
  Dashboard,
  SelectRiderCategory,
  Tracker,
  AddProduct,
  Delivery,
} from './screens';
import {Provider} from 'react-redux';
import {Store} from './Redux/Store';
import {GoogleSignin} from '@react-native-community/google-signin';
import {COLORS} from './constants';
import SplashScreen from 'react-native-splash-screen';
import CreateRiderProfile from './screens/rider/CreateRiderProfile';
import {
  NotificationListener,
  requestUserPermission,
} from './globals/pushnotifications_helper';
import LocationPickerDemo from './screens/seller/AddAddress';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const colorTheme = {
    primary: COLORS.primary,
    primary_light: COLORS.primary_light,
    secondary: COLORS.secondary,
  };

  const theme = extendTheme({
    colors: colorTheme,
    fontConfig: {
      Poppins: {
        900: {
          normal: 'Poppins-Black',
        },
        800: {
          normal: 'Poppins-ExtraBold',
        },
        700: {
          normal: 'Poppins-Bold',
        },
        600: {
          normal: 'Poppins-SemiBold',
        },
        500: {
          normal: 'Poppins-Medium',
        },
        400: {
          normal: 'Poppins-Regular',
        },
        300: {
          normal: 'Poppins-light',
        },
      },
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
      mono: 'Poppins',
    },
  });

  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: '',
    });
  }, []);

  useEffect(() => {
    requestUserPermission();

    NotificationListener();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={Store}>
        <KeyboardAvoidingView
          flex={1}
          behavior={Platform === 'ios' ? 'padding' : 'height'}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="deliver_product">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="credentials" component={Credentials} />
              <Stack.Screen name="verification" component={Verification} />
              <Stack.Screen name="tracker" component={Tracker} />

              {/* seller screens */}
              <Stack.Screen name="about_business" component={AboutBusiness} />
              <Stack.Screen name="last" component={Last} />
              <Stack.Screen name="rider_details" component={RiderDetails} />
              <Stack.Screen name="dashboard" component={Dashboard} />
              <Stack.Screen name="address" component={LocationPickerDemo} />
              <Stack.Screen name="add_product" component={AddProduct} />
              <Stack.Screen name="deliver_product" component={Delivery} />

              {/* rider */}
              <Stack.Screen
                name="select_rider_category"
                component={SelectRiderCategory}
              />
              <Stack.Screen
                name="create_rider_profile"
                component={CreateRiderProfile}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
