import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {
  AboutBusiness,
  Credentials,
  Last,
  Login,
  RiderDetails,
  Role,
  Verification,
} from "./screens";
import "react-native-gesture-handler";
import { extendTheme, NativeBaseProvider } from "native-base";
import { COLORS, FONTS } from "./constants";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import { useEffect } from "react";
import Dashboard from "./screens/Dashboard";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    PoppinsBlack: require("./assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

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
          normal: FONTS.extrabold,
        },
        800: {
          normal: FONTS.bold,
        },
        700: {
          normal: FONTS.semibold,
        },
        600: {
          normal: FONTS.medium,
        },
        500: {
          normal: FONTS.regular,
        },
        400: {
          normal: FONTS.light,
        },
      },
    },
    fonts: {
      heading: "Poppins",
      body: "Poppins",
      mono: "Poppins",
    },
  });

  if (!loaded) return null;

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="dashboard"
          >
            <Stack.Screen name="Login" component={Login} />
            {/* who you are page */}
            <Stack.Screen name="Role" component={Role} />
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
}
