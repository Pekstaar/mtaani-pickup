import { Text, Box, Center, Button, Icon, HStack } from "native-base";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "./Login";
import { SIZES } from "../constants";
import { SHADOWS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Role = () => {
  const navigation = useNavigation();

  const [pressed, setPressed] = useState("");

  const handleContinue = () => {
    navigation.navigate("credentials");
  };

  return (
    <Box safeArea p={4}>
      {/* Header  */}
      <Header title={"Tell us who you are"} />

      {/* body */}
      <Box my={2}>
        <Text fontWeight={600} fontSize={"xs"} color={"gray.500"}>
          Choose one category that suits what you do. e.g. if you sell products
          online, tap "Online Seller".
        </Text>

        {/* Buttons  */}
        <Center my={6}>
          <HStack space={4}>
            <Button
              bg={"white"}
              px={4}
              borderRadius={"2xl"}
              onPress={() => setPressed("online_seller")}
              borderColor={"primary"}
              borderWidth={pressed === "online_seller" ? 3 : 0}
              style={
                pressed === "online_seller" && {
                  ...SHADOWS.medium,
                }
              }
            >
              <HStack space={3} alignItems={"center"}>
                <Box bg={"primary_light"} p={2} borderRadius={"full"}>
                  <Icon
                    size={6}
                    color="black"
                    borderRadius={"full"}
                    as={<MaterialCommunityIcons name="sale" />}
                  />
                </Box>

                <Text fontWeight={700} fontSize={SIZES.base}>
                  Online Seller
                </Text>
              </HStack>
            </Button>

            <Button
              bg={"white"}
              px={4}
              borderRadius={"2xl"}
              onPress={() => setPressed("rider")}
              borderColor={"primary"}
              borderWidth={pressed === "rider" ? 3 : 0}
              style={
                pressed === "rider" && {
                  ...SHADOWS.medium,
                }
              }
            >
              <HStack space={3} alignItems={"center"}>
                <Box bg={"primary_light"} p={2} borderRadius={"full"}>
                  <Icon
                    size={6}
                    color="black"
                    borderRadius={"full"}
                    as={<MaterialCommunityIcons name="sale" />}
                  />
                </Box>

                <Text fontWeight={700} fontSize={SIZES.base}>
                  Rider
                </Text>
              </HStack>
            </Button>
          </HStack>

          <HStack space={4} mt={4}>
            <Button
              bg={"white"}
              px={4}
              borderRadius={"2xl"}
              onPress={() => setPressed("agent")}
              borderColor={"primary"}
              borderWidth={pressed === "agent" ? 3 : 0}
              style={
                pressed === "agent" && {
                  ...SHADOWS.medium,
                }
              }
            >
              <HStack space={3} alignItems={"center"}>
                <Box bg={"primary_light"} p={2} borderRadius={"full"}>
                  <Icon
                    size={6}
                    color="black"
                    borderRadius={"full"}
                    as={<MaterialCommunityIcons name="sale" />}
                  />
                </Box>

                <Text fontWeight={700} fontSize={SIZES.base}>
                  Mtaani Agent
                </Text>
              </HStack>
            </Button>

            <Button
              bg={"white"}
              px={4}
              borderRadius={"2xl"}
              onPress={() => setPressed("staff")}
              borderColor={"primary"}
              borderWidth={pressed === "staff" ? 3 : 0}
              style={
                pressed === "staff" && {
                  ...SHADOWS.medium,
                }
              }
            >
              <HStack space={3} alignItems={"center"}>
                <Box bg={"primary_light"} p={2} borderRadius={"full"}>
                  <Icon
                    size={6}
                    color="black"
                    borderRadius={"full"}
                    as={<MaterialCommunityIcons name="sale" />}
                  />
                </Box>

                <Text fontWeight={700} fontSize={SIZES.base}>
                  PM Staff
                </Text>
              </HStack>
            </Button>
          </HStack>

          <Button
            bg={"primary"}
            borderRadius={"full"}
            mt={4}
            width={"full"}
            onPress={handleContinue}
          >
            <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
              CONTINUE
            </Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default Role;
