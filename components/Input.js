import React from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Select,
  Text,
} from "native-base";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInput as TInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const TextInput = ({
  icon,
  placeholder,
  type,
  preInputText,
  value,
  handleChange,
}) => {
  return (
    <HStack alignItems="center">
      {/* icon */}
      <Icon as={icon} size={5} color={"secondary"} mr={1} />
      {/* input */}
      <HStack
        p={0}
        alignItems={"center"}
        flex={1}
        borderBottomColor={"secondary"}
        borderBottomWidth={"2"}
      >
        <Text fontWeight={700} fontSize={SIZES.md}>
          {preInputText}
        </Text>
        <Input
          size={"md"}
          placeholder={placeholder}
          borderColor={"transparent"}
          flex={1}
          height={10}
          type={type}
          bg={"transparent"}
          value={value}
          onChangeText={handleChange}
        />
      </HStack>
    </HStack>
  );
};

export const PasswordInput = ({
  icon,
  placeholder,
  preInputText,
  value,
  handleChange,
}) => {
  const [show, setShow] = React.useState(false);
  return (
    <HStack alignItems="center">
      {/* icon */}
      <Icon as={icon} size={5} color={"secondary"} mr={1} />
      {/* input */}
      <HStack
        p={0}
        alignItems={"center"}
        flex={1}
        borderBottomColor={"secondary"}
        borderBottomWidth={"2"}
      >
        <Text fontWeight={700} fontSize={SIZES.md}>
          {preInputText}
        </Text>
        <Input
          size={"md"}
          placeholder={placeholder}
          borderColor={"transparent"}
          flex={1}
          height={10}
          type={show ? "text" : "password"}
          InputRightElement={
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.500"
              onPress={() => setShow(!show)}
            />
          }
          bg={"transparent"}
          value={value}
          onChangeText={handleChange}
        />
      </HStack>
    </HStack>
  );
};

export const LabeledInput = ({
  label,
  placeholder,
  value,
  handleChange,
  exp,
  type = "text",
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <Box flex={1}>
      <Text fontWeight={700} fontSize={SIZES.base}>
        {label}
      </Text>
      {exp && (
        <Text
          fontWeight={600}
          fontSize={SIZES.sm - 1.5}
          color={"gray.500"}
          my={1}
        >
          {exp}
        </Text>
      )}
      <Input
        borderColor="primary"
        borderWidth={"1.5px"}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        borderRadius={"xl"}
        size={"md"}
        type={type === "password" ? (show ? "text" : "password") : "text"}
        InputRightElement={
          type === "password" && (
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.500"
              onPress={() => setShow(!show)}
            />
          )
        }
      />
    </Box>
  );
};

export const CInput = ({
  placeholder,
  handleChange,
  width,
  height,
  ...props
}) => (
  <TInput
    style={{
      borderColor: COLORS.primary,
      borderWidth: 1.5,
      width: 50,
      height: 45,
      borderRadius: 10,
    }}
    placeholder={placeholder}
    onChangeText={handleChange}
    {...props}
  />
  // borderColor="primary"
  // borderWidth={"1.5px"}
  // placeholder={placeholder}
  // onChangeText={handleChange}
  // borderRadius={"xl"}
  // size={"md"}
  // {...props}
  // keyboardType="number-pad"
  // maxLength={1}
  // width={20}
  // type={type === "password" ? (show ? "text" : "password") : "text"}
  // />
);

export const Selector = () => (
  <Select
    accessibilityLabel="Choose Service"
    placeholder="Choose Service"
    // _selectedItem={{
    //   bg: "teal.600",
    //   endIcon: <CheckIcon size={5} />,
    // }}
    mt="1"
    fontSize={SIZES.base}
    borderColor="primary"
    borderWidth={"1.5px"}
    borderRadius={"xl"}
    size={"md"}
  >
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
    <Select.Item label="UX Research" value="ux" />
    <Select.Item label="Web Development" value="web" />
    <Select.Item label="Cross Platform Development" value="cross" />
    <Select.Item label="UI Designing" value="ui" />
    <Select.Item label="Backend Development" value="backend" />
  </Select>
);

export const Picker = ({ placeholder }) => (
  <Box>
    <TouchableOpacity
      // bg={"gray.100"}
      style={{
        borderRadius: SIZES.xl,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
      }}
    >
      <Box>
        <Box
          alignItems={"center"}
          borderLeftRadius={"2xl"}
          height={12}
          flex={1}
        >
          {placeholder}
        </Box>

        <Box px={2}>
          <Icon size={5} color="black" as={<AntDesign name="up" />} />
        </Box>
      </Box>
    </TouchableOpacity>
  </Box>
);
