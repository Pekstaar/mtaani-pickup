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
  SelectRiderCategory,
  Tracker,
  AddProduct,
  Delivery,
  Role,
  Method,
  NewPassword,
  SmsRecovery,
  EmailRecovery,
} from './screens';
import {Provider} from 'react-redux';
import {Store} from './Redux/Store';
import {GoogleSignin} from '@react-native-community/google-signin';
import {COLORS} from './constants';
import SplashScreen from 'react-native-splash-screen';
import CreateRiderProfile from './screens/rider/CreateRiderProfile';

import LocationPickerDemo from './screens/seller/AddAddress';
import {Platform} from 'react-native';
import {Navigator} from './components/navigation/BottomNav';
import {CheckConnectivity} from './src/Utils';
// import {LocalNotification} from './src/services/LocalPushController';
// import messaging from '@react-native-firebase/messaging';
// import NotificationController from './src/services/NotificationController';

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
      Lato: {
        900: {
          normal: 'Lato-Heavy',
          italic: 'Lato-HeavyItalic',
        },
        800: {
          normal: 'Lato-Black',
          italic: 'Lato-BlackItalic',
        },
        700: {
          normal: 'Lato-Bold',
          italic: 'Lato-BoldItalic',
        },
        600: {
          normal: 'Lato-Semibold',
          italic: 'Lato-SemiboldItalic',
        },
        500: {
          normal: 'Lato-Medium',
          italic: 'Lato-MediumItalic',
        },
        400: {
          normal: 'Lato-Regular',
          italic: 'Lato-Italic',
        },
        300: {
          normal: 'Lato-light',
          italic: 'Lato-lightItalic',
        },
      },
    },
    fonts: {
      heading: 'Lato',
      body: 'Lato',
      mono: 'Lato',
    },
  });

  // const handleButtonPress = () => {

  // }

  useEffect(() => {
    // CheckConnectivity()
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: '',
    });
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={Store}>
        <KeyboardAvoidingView
          flex={1}
          behavior={Platform === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="credentials" component={Credentials} />
              <Stack.Screen name="verification" component={Verification} />
              <Stack.Screen name="tracker" component={Tracker} />
              <Stack.Screen name="roles" component={Role} />
              <Stack.Screen
                name="password_recovery_method"
                component={Method}
              />
              <Stack.Screen
                name="password_sms_recovery"
                component={SmsRecovery}
              />
              <Stack.Screen
                name="password_email_recovery"
                component={EmailRecovery}
              />
              <Stack.Screen
                name="password_create_new"
                component={NewPassword}
              />
              {/* seller screens */}
              <Stack.Screen name="about_business" component={AboutBusiness} />
              <Stack.Screen name="last" component={Last} />
              <Stack.Screen name="rider_details" component={RiderDetails} />
              {/* <Stack.Screen name="dashboard" component={Dashboard} /> */}
              <Stack.Screen name="address" component={LocationPickerDemo} />
              <Stack.Screen name="add_product" component={AddProduct} />
              {/* <Stack.Screen
                name="view_products"
                component={ViewShelfProducts}
              /> */}
              <Stack.Screen name="deliver_product" component={Delivery} />
              <Stack.Screen name="main" component={Navigator} />
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
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
