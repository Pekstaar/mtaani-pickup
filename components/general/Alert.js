import { Modal, Text, Box, Button, Icon, Center, VStack } from "native-base";
import React from "react";
import { SIZES } from "../../constants";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const ErrorAlert = ({ showModal, handleClose, message }) => {
  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <VStack
        width={SIZES.width * 0.85}
        minHeight={250}
        bg={"white"}
        elevation={0}
        zIndex={0}
        borderRadius={"xl"}
        // position={"relative"}
      >
        {/* <Center> */}
        <Center
          bg="red.500"
          borderRadius={"full"}
          position={"absolute"}
          top={-28}
          left={"41%"}
          width={"55px"}
          height={"55px"}
          borderColor={"white"}
          borderWidth={3}
        >
          <Icon size={8} color="white" as={<Feather name="x" />} />
        </Center>
        {/* </Center> */}

        <VStack mt={10} alignItems={"center"} space={4} px={4}>
          <Text fontSize={SIZES.xl} fontWeight={"700"}>
            Error!
          </Text>

          <Text fontSize={SIZES.base}>{message}</Text>
        </VStack>
        <Button
          bg={"red.500"}
          height={10}
          py={2}
          borderRadius={"full"}
          width={SIZES.width * 0.4}
          onPress={handleClose}
          position={"absolute"}
          left={"25%"}
          bottom={5}
          _text={{
            color: "white",
            fontWeight: 600,
          }}
        >
          close
        </Button>
      </VStack>
    </Modal>
  );
};

export const SuccessAlert = ({ showModal, handleClose, message }) => {
  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <VStack
        width={SIZES.width * 0.85}
        minHeight={250}
        bg={"white"}
        elevation={0}
        zIndex={0}
        borderRadius={"xl"}
        // position={"relative"}
      >
        {/* <Center> */}
        <Center
          bg="green.500"
          borderRadius={"full"}
          position={"absolute"}
          top={-28}
          left={"41%"}
          width={"55px"}
          height={"55px"}
          borderColor={"white"}
          borderWidth={3}
        >
          <Icon ml={2} size={8} color="white" as={<Octicons name="check" />} />
        </Center>
        {/* </Center> */}

        <VStack mt={10} alignItems={"center"} space={4} px={4}>
          <Text fontSize={SIZES.xl} fontWeight={"700"}>
            Success!
          </Text>

          <Text fontSize={SIZES.base}>{message}</Text>
        </VStack>
        <Button
          bg={"green.500"}
          height={10}
          py={2}
          borderRadius={"full"}
          width={SIZES.width * 0.4}
          onPress={handleClose}
          position={"absolute"}
          left={"25%"}
          bottom={5}
          _text={{
            color: "white",
            fontWeight: 600,
          }}
        >
          close
        </Button>
      </VStack>
    </Modal>
  );
};

export const WarningAlert = ({ showModal, handleClose, message }) => {
  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <VStack
        width={SIZES.width * 0.85}
        minHeight={250}
        bg={"white"}
        elevation={0}
        zIndex={0}
        borderRadius={"xl"}
        // position={"relative"}
      >
        {/* <Center> */}
        <Center
          bg="amber.400"
          borderRadius={"full"}
          position={"absolute"}
          top={-28}
          left={SIZES.width * 0.32}
          width={"55px"}
          height={"55px"}
          borderColor={"white"}
          borderWidth={3}
        >
          <Icon size={8} color="white" as={<AntDesign name="exclamation" />} />
        </Center>
        {/* </Center> */}

        <VStack mt={10} alignItems={"center"} space={4} px={4}>
          <Text fontSize={SIZES.xl} fontWeight={"700"}>
            Warning!
          </Text>

          <Text fontSize={SIZES.base}>{message}</Text>
        </VStack>
        <Button
          bg={"amber.400"}
          height={10}
          py={2}
          borderRadius={"full"}
          width={SIZES.width * 0.4}
          onPress={handleClose}
          position={"absolute"}
          left={"25%"}
          bottom={5}
          _text={{
            color: "gray.800",
            fontWeight: 600,
          }}
        >
          close
        </Button>
      </VStack>
    </Modal>
  );
};

export const InfoAlert = ({ showModal, handleClose, message }) => {
  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <VStack
        width={SIZES.width * 0.85}
        minHeight={250}
        bg={"white"}
        elevation={0}
        zIndex={0}
        borderRadius={"xl"}
        // position={"relative"}
      >
        {/* <Center> */}
        <Center
          bg="blue.400"
          borderRadius={"full"}
          position={"absolute"}
          top={-28}
          left={"41%"}
          width={"55px"}
          height={"55px"}
          borderColor={"white"}
          borderWidth={3}
        >
          <Icon size={8} color="white" as={<AntDesign name="info" />} />
        </Center>
        {/* </Center> */}

        <VStack mt={10} alignItems={"center"} space={4} px={4}>
          <Text fontSize={SIZES.xl} fontWeight={"700"}>
            Info!
          </Text>

          <Text fontSize={SIZES.base}>{message}</Text>
        </VStack>
        <Button
          bg={"blue.400"}
          height={10}
          py={2}
          borderRadius={"full"}
          width={SIZES.width * 0.4}
          onPress={handleClose}
          position={"absolute"}
          left={"25%"}
          bottom={5}
          _text={{
            color: "white",
            fontWeight: 600,
          }}
        >
          close
        </Button>
      </VStack>
    </Modal>
  );
};
