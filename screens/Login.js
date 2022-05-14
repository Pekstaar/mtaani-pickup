import React, { useState } from "react";
import { Box, Button, Center, HStack, Icon, Text, VStack } from "native-base";
import { COLORS, FONTS } from "../constants";
import { SIZES } from "../constants";
import Line from "../components/Line";
import { PasswordInput, TextInput } from "../components/Input";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const Login = () => {
  // manage state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // handle submit function
  const handleLogin = () => {
    // console.log("Phone: ", phone, "Password: ", password);
    // navigation.navigate("Role");
  };

  return (
    <Box position={"relative"} height="full">
      <VStack
        position={"absolute"}
        bottom={0}
        left={"0"}
        right="0"
        height={"3/5"}
        mx={5}
        space={8}
      >
        {/* title */}
        <Header title={"Enter login details"} />

        {/* inputs */}
        <TextInput
          icon={<Feather name="smartphone" />}
          placeholder={"Type phone number"}
          preInputText={"+254"}
          value={phone}
          handleChange={(number) => setPhone(number)}
        />

        {/* password */}
        <Box>
          <PasswordInput
            icon={<AntDesign name="lock" />}
            placeholder={"Enter password"}
            preInputText={"Password"}
            type={"password"}
            value={password}
            handleChange={(pwd) => setPassword(pwd)}
          />

          <Text ml={6} fontWeight={600} fontSize={"xs"} mt={2}>
            Forgot Password?{" "}
            <Text
              fontWeight={700}
              fontSize={SIZES.sm + 1}
              textDecorationLine={"underline"}
            >
              Click Here
            </Text>
          </Text>
        </Box>

        {/* Login button */}
        <Button bg={"primary"} borderRadius={"full"} onPress={handleLogin}>
          <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
            LOG IN
          </Text>
        </Button>

        {/* social icons */}
        <Center>
          <Text fontWeight={700} fontSize={SIZES.md - 1}>
            --------&nbsp; Or continue with &nbsp; ---------
          </Text>

          <HStack space={6} py={3}>
            {/* Google connect button */}
            <Button
              bg={"secondary"}
              borderRadius={"full"}
              p="3"
              onPress={() => console.log("Google Pressed!")}
            >
              <Icon
                size={7}
                color="primary"
                as={<FontAwesome name="google" />}
              />
            </Button>

            {/* Facebook button */}
            <Button
              bg={"secondary"}
              borderRadius={"full"}
              height={12}
              width={12}
              onPress={() => console.log("Google Pressed!")}
              pl="5"
            >
              <Icon
                size={7}
                color="primary"
                as={<FontAwesome name="facebook" />}
              />
            </Button>

            {/* Facebook button */}
            <Button
              bg={"secondary"}
              borderRadius={"full"}
              height={12}
              width={12}
              onPress={() => console.log("Google Pressed!")}
            >
              <Icon
                size={7}
                color="primary"
                as={<Feather name="smartphone" />}
              />
            </Button>
          </HStack>

          <Text color="gray.500" mt={3} fontWeight={600}>
            Don't have an account?
            <Text
              color={"secondary"}
              textDecorationLine={"underline"}
              onPress={() => navigation.navigate("credentials")}
            >
              Register here
            </Text>
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};

export default Login;

export const Header = ({ title }) => (
  <HStack px={1} alignItems={"center"}>
    <Line />

    <Text fontWeight={700} fontSize={SIZES.lg}>
      {title}
    </Text>
  </HStack>
);
