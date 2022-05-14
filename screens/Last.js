import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { LabeledInput, Picker, Selector } from "../components/Input";
import { SIZES } from "../constants";
import { Header } from "./Login";

const Last = () => {
  const [details, setDetails] = useState({
    till: "",
    mpesaPhone: "",
    homeAgent: "",
    location: "",
  });

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(details);
    navigation.navigate("rider_details");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box safeArea p={3}>
          {/* Header */}
          <Header title={"One last step"} />

          <VStack space={4} my={4}>
            <Box height={20}>
              <LabeledInput
                label={"Till number"}
                placeholder={"Enter your till number"}
                value={details?.till}
                handleChange={(till) =>
                  setDetails((prev) => ({ ...prev, till }))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={"M-Pesa Phone number"}
                placeholder={"Type mpesa number"}
                value={details?.mpesaPhone}
                handleChange={(phone) =>
                  setDetails((prev) => ({ ...prev, mpesaPhone: phone }))
                }
              />
            </Box>
          </VStack>

          <VStack space={4} my={4}>
            <Box>
              <Text fontWeight={700} fontSize={SIZES.md}>
                Pickup Location Details
              </Text>
              <Text fontWeight={600} fontSize={SIZES.sm - 1} color={"gray.500"}>
                For rider to pick your products from your home/workspace
              </Text>
            </Box>

            <Box height={20}>
              {/* <LabeledInput
            label={"Till number"}
            placeholder={"Enter your till number"}
            value={details?.till}
            handleChange={(till) => setDetails((prev) => ({ ...prev, till }))}
          /> */}
              <Selector placeholder={"Tap to Select home agent"} />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={"Location"}
                placeholder={"e.g. Kasarani - Seasons"}
                value={details?.location}
                handleChange={(location) =>
                  setDetails((prev) => ({ ...prev, location }))
                }
              />
            </Box>
          </VStack>
          <Button
            bg={"primary"}
            borderRadius={"full"}
            mt={4}
            width={"full"}
            onPress={handleSubmit}
          >
            <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
              Save Details
            </Text>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Last;
