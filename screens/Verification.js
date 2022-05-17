import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, HStack, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { MODAL_TIMEOUT } from "../globals/Utils";
import { reset, verifyUser } from "../Redux/reducers/authSlice";
import { LoadingButton, SubmitButton } from "./Credentials";
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

  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
  });

  const [validation, setValidation] = useState({
    isError: false,
    message: "",
  });
  const [showModal, setShowModal] = useState({
    type: "",
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { isSuccess, isError, message, user } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();

  const showSuccessModal = (pMessage) => {
    setShowModal({
      type: "success",
      show: true,
      message: pMessage,
    });
    setLoading(false);
  };

  const showErrorModal = (pMessage) => {
    setShowModal({
      type: "error",
      show: true,
      message: pMessage,
    });
    setLoading(false);
  };

  const resetModal = () => {
    setShowModal({
      type: "",
      show: false,
      message: "",
    });
  };

  const resetModalOnTimeout = (time) => {
    setTimeout(function () {
      resetModal();
    }, time);
  };

  useEffect(() => {
    if (validation?.isError) {
      showErrorModal(validation?.message);

      resetModalOnTimeout(MODAL_TIMEOUT);
    }

    if (validation?.isSuccess) {
      navigation.navigate("login");
    }

    if (isSuccess) {
      showSuccessModal("Verification Successfull!");

      resetModalOnTimeout(MODAL_TIMEOUT);

      navigation.navigate("Login");
    }

    return () => {
      dispatch(reset());
      setLoading(false);
    };
  }, [isSuccess, isError, message, validation]);

  const handleVerify = () => {
    const { first, second, third, fourth, fifth } = otp;
    setLoading(true);

    if (
      first === "" ||
      second === "" ||
      third === "" ||
      fourth === "" ||
      fifth === ""
    ) {
      setValidation({
        isError: true,
        message: "Invalid Code!",
        isSuccess: false,
      });

      setLoading(false);
      return;
    }

    const code = first + second + third + fourth + fifth;

    dispatch(verifyUser({ id: user?._id, code: code }));
    // navigation.navigate("about_business");
  };

  return (
    <>
      {showModal?.type === "error" ? (
        <ErrorAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={showModal?.message}
        />
      ) : showModal?.type === "success" ? (
        <SuccessAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={showModal?.message}
        />
      ) : (
        <></>
      )}
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
                  setOtp((prev) => ({ ...prev, first: num }));
                  num && secondInput.current.focus();
                }}
              />
              <TextInput
                ref={secondInput}
                style={styles.input}
                keyboardType={"number-pad"}
                maxLength={1}
                onChangeText={(num) => {
                  setOtp((prev) => ({ ...prev, second: num }));

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
                  setOtp((prev) => ({ ...prev, third: num }));

                  num
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
              <TextInput
                ref={fourthInput}
                style={styles.input}
                keyboardType={"number-pad"}
                maxLength={1}
                onChangeText={(num) => {
                  setOtp((prev) => ({ ...prev, fourth: num }));

                  num ? fifthInput.current.focus() : thirdInput.current.focus();
                }}
              />
              <TextInput
                ref={fifthInput}
                style={styles.input}
                keyboardType={"number-pad"}
                maxLength={1}
                onChangeText={(num) => {
                  setOtp((prev) => ({ ...prev, fifth: num }));

                  !num && fourthInput.current.focus();
                }}
              />
            </HStack>

            {loading ? (
              <LoadingButton />
            ) : (
              <SubmitButton text={"VERIFY CODE"} handlePress={handleVerify} />
            )}
          </Center>
        </Box>
      </Box>
    </>
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
