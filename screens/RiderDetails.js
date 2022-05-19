import {
  Box,
  Center,
  Checkbox,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "./Login";
import { LabeledInput } from "../components/Input";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const RiderDetails = () => {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    rate: "",
    pkm: "",
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box safeArea p={3}>
          {/* header */}
          <Header title={"Add your rider details."} />

          <HStack space={1} my={1}>
            <Box>
              <Icon
                color={"gray.500"}
                as={<Ionicons name="information-circle-outline" />}
                size={5}
              />
            </Box>
            <Box
              _text={{
                fontSize: SIZES.sm,
                fontWeight: "medium",
                color: "gray.500",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              porro vitae placeat quam, exercitationem nesciunt iusto, quod quia
              sunt itaque ratione doloribus.
            </Box>
          </HStack>
          {/* body */}
          <VStack space={4} py={3}>
            <Box height={20}>
              <LabeledInput
                label={"Rider name"}
                placeholder={"Type mpesa number"}
                value={details?.name}
                handleChange={(name) =>
                  setDetails((prev) => ({ ...prev, name }))
                }
              />
            </Box>
            <Box height={20}>
              <LabeledInput
                label={"Phone number"}
                placeholder={"+254"}
                value={details?.phone}
                handleChange={(phone) =>
                  setDetails((prev) => ({ ...prev, phone }))
                }
              />
            </Box>
          </VStack>

          <VStack py={3} space={4}>
            <Box height={24}>
              <LabeledInput
                label={"Delivery Rate (Standard)"}
                placeholder={"ksh"}
                exp={
                  "set the standard price they charge for deliveries around Nairobi"
                }
                value={details?.name}
                handleChange={(name) =>
                  setDetails((prev) => ({ ...prev, name }))
                }
              />
            </Box>
            <Box height={20}>
              <LabeledInput
                label={"Charged Per Kilometer"}
                placeholder={"Ksh"}
                exp={"set the standard price charged per Kilometre covered"}
                value={details?.phone}
                handleChange={(phone) =>
                  setDetails((prev) => ({ ...prev, phone }))
                }
              />
            </Box>
          </VStack>

          <HStack space={2} py={3} mt={4}>
            <Checkbox value="test" size="sm" />
            <Text
              fontSize={SIZES.sm - 2}
              color={"gray.500"}
              fontWeight={600}
              mr={4}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              suscipit ab explicabo fugiat ducimus corporis velit? Iure animi
              magnam, laudantium alias officiis inventore, quisquam cumque vero
            </Text>
          </HStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RiderDetails;
