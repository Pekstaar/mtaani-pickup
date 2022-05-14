import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { assets, COLORS, SIZES } from "../constants";
import { Header } from "./Login";
import { AntDesign } from "@expo/vector-icons";
import { LabeledInput } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const initCategories = [
  "cosmetics",
  "clothes",
  "Jewellery",
  "Accessories",
  "Electronics",
  "Shoes",
  "Perfume",
];

const AboutBusiness = () => {
  const [details, setDetails] = useState({
    bName: "",
    itemSold: "",
    category: "",
  });

  const navigation = useNavigation();

  const [logo, setLogo] = useState();

  const manageCategory = (c) => {
    const isContained = details?.categories?.includes(c);

    if (!isContained) {
      setDetails((prev) => ({
        ...prev,
        category: c,
      }));
    } else {
      setDetails((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  const handleSubmit = () => {
    console.log(details);
    navigation.navigate("last");
  };

  return (
    <KeyboardAvoidingWrapper>
      <Box safeArea p={3}>
        {/* header */}
        <Header title={"Tell us about your business"} />

        {/* body */}
        <VStack py={8} space={5}>
          {/* profile image */}
          <Center>
            <Box
              bg={"gray.400"}
              borderRadius={"full"}
              p={"0.5"}
              position={"relative"}
            >
              <Image
                source={assets.empty}
                borderRadius={"full"}
                width={"120px"}
                height={"120px"}
                alt="business_logo"
              />

              <Button
                position="absolute"
                bottom={-10}
                left={-5}
                bg={"secondary"}
                p={2}
                borderRadius={"full"}
                borderColor={"white"}
                borderWidth={2}
                onPress={() => console.log("Upload Image")}
              >
                <Icon
                  size={6}
                  color={"white"}
                  as={<AntDesign name="camera" color="black" />}
                />
              </Button>
            </Box>

            {/* Text */}
            <Text color="gray.600" fontWeight={600} mt={4}>
              Upload your business logo
            </Text>
          </Center>

          {/* inputs */}
          <VStack space={6}>
            <Box height={20}>
              <LabeledInput
                label={"Business/shop name"}
                placeholder={"Business name"}
                value={details?.bName}
                handleChange={(name) =>
                  setDetails((prev) => ({ ...prev, bName: name }))
                }
              />
            </Box>

            <Box height={20}>
              <LabeledInput
                label={"What do you sell?"}
                placeholder={"e.g. shoes"}
                value={details?.itemSold}
                handleChange={(name) =>
                  setDetails((prev) => ({ ...prev, itemSold: name }))
                }
              />
            </Box>
          </VStack>

          {/* select category */}
          <Box>
            <Text fontWeight={700} fontSize={SIZES.base}>
              Select category tag
            </Text>

            {/* buttons */}
            <VStack>
              <HStack
                display={"flex"}
                justifyContent={"center"}
                space={2}
                mt={1}
                py={"2"}
              >
                {initCategories.slice(0, 4)?.map((cat, i) => (
                  <CategoryButton
                    key={i}
                    name={cat}
                    handlePress={() => manageCategory(cat)}
                    isSelected={details?.category === cat}
                  />
                ))}
              </HStack>

              <HStack
                display={"flex"}
                justifyContent={"center"}
                space={2}
                mt={1}
                py={"2"}
              >
                {initCategories.slice(4, 9)?.map((cat, i) => (
                  <CategoryButton
                    name={cat}
                    key={i}
                    handlePress={() => manageCategory(cat)}
                    isSelected={details?.category === cat}
                  />
                ))}
                <CategoryButton name={"Add Category +"} />
              </HStack>
            </VStack>
          </Box>

          <Button
            bg={"primary"}
            borderRadius={"full"}
            mt={4}
            width={"full"}
            onPress={handleSubmit}
          >
            <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
              NEXT
            </Text>
          </Button>
        </VStack>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default AboutBusiness;

const CategoryButton = ({ name, isSelected, handlePress }) => (
  <Button
    bg={isSelected ? "primary" : COLORS.lightGray2}
    borderRadius={"2xl"}
    p={2}
    px={2.5}
    onPress={handlePress}
  >
    <Text color={"black"} fontWeight={700} fontSize={SIZES.sm}>
      {name}
    </Text>
  </Button>
);
