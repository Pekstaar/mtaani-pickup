import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {COLORS} from './constants';
import {
  AboutBusiness,
  Credentials,
  Last,
  Login,
  RiderDetails,
  Role,
  Verification,
  Dashboard,
} from './screens';
import {Provider} from 'react-redux';
import {Store} from './Redux/Store';
import CustomLogin from './screens/CustomLogin';

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

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="credentials" component={Credentials} />
            <Stack.Screen name="verification" component={Verification} />
            <Stack.Screen name="about_business" component={AboutBusiness} />
            <Stack.Screen name="last" component={Last} />
            <Stack.Screen name="rider_details" component={RiderDetails} />
            <Stack.Screen name="dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
