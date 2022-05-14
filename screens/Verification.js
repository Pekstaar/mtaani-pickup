import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, HStack, Text } from "native-base";
import React, { useRef, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { Header } from "./Login";

const Verification = ({
  route: {
    params: { phone },
  },
}) => {
  // input references:
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();

  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });

  const navigation = useNavigation();

  const handleVerify = () => {
    console.log(otp);

    navigation.navigate("about_business");
  };

  return (
    <Box safeArea p={3}>
      {/* Header */}
      <Header title={"Verify Phone number"} />

      <Box>
        <Text
          color={"gray.500"}
          my={2}
          fontWeight={600}
          fontSize={SIZES.sm + 0.5}
        >
          A 4 digit code has been sent via SMS to {phone}. Paste the code here
        </Text>

        <Center>
          <HStack space={3} justifyContent={"center"} py={5}>
            <TextInput
              ref={firstInput}
              style={styles.input}
              keyboardType={"number-pad"}
              maxLength={1}
              onChangeText={(num) => {
                setOtp((prev) => ({ ...prev, 1: num }));
                num && secondInput.current.focus();
              }}
            />
            <TextInput
              ref={secondInput}
              style={styles.input}
              keyboardType={"number-pad"}
              maxLength={1}
              onChangeText={(num) => {
                setOtp((prev) => ({ ...prev, 2: num }));

                num ? thirdInput.current.focus() : firstInput.current.focus();
              }}
              //   onChangeText={handleChange}
            />
            <TextInput
              ref={thirdInput}
              style={styles.input}
              keyboardType={"number-pad"}
              maxLength={1}
              onChangeText={(num) => {
                setOtp((prev) => ({ ...prev, 3: num }));

                num ? fourthInput.current.focus() : secondInput.current.focus();
              }}
            />
            <TextInput
              ref={fourthInput}
              style={styles.input}
              keyboardType={"number-pad"}
              maxLength={1}
              onChangeText={(num) => {
                setOtp((prev) => ({ ...prev, 4: num }));

                num ? fifthInput.current.focus() : thirdInput.current.focus();
              }}
            />
            <TextInput
              ref={fifthInput}
              style={styles.input}
              keyboardType={"number-pad"}
              maxLength={1}
              onChangeText={(num) => {
                setOtp((prev) => ({ ...prev, 4: num }));

                !num && fourthInput.current.focus();
              }}
            />
          </HStack>

          <Button
            bg={"primary"}
            borderRadius={"full"}
            mt={4}
            width={"full"}
            onPress={handleVerify}
          >
            <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
              VERIFY CODE
            </Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    width: 50,
    height: 45,
    borderRadius: 10,
    textAlign: "center",
    fontSize: SIZES.xl,
    fontFamily: FONTS.semibold,
  },
});

export default Verification;
