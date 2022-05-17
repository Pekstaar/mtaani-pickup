import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Box,
  VStack,
  HStack,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../components";
import { LabeledInput } from "../components/Input";
import { registerUser, reset } from "../Redux/reducers/authSlice";
import { Header } from "./Login";

const Credentials = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { isSuccess, isLoading, isError, message, user } = useSelector(
    (state) => state.auth
  );
  const [showModal, setShowModal] = useState({ type: "", show: false });
  const [modalMessage, setModalMessage] = useState("");
  const [validation, setValidation] = useState({
    message: "",
    isError: false,
    isSuccess: false,
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleContinue = () => {
    const { firstName, lastName, phone, password, confirmPassword, email } =
      credentials;

    setLoading(true);

    if (firstName === "" || firstName === null || !firstName) {
      setValidation((prev) => ({
        ...prev,
        message: "First name required!",
        isError: true,
      }));

      return;
    } else if (phone === "" || phone === null || !phone) {
      setValidation((prev) => ({
        ...prev,
        message: "Phone number required!",
        isError: true,
      }));

      return;
    } else if (email === "" || email === null || !email) {
      setValidation((prev) => ({
        ...prev,
        message: "Email required!",
        isError: true,
      }));

      return;
    } else if (password === "" || password === null || !password) {
      setValidation((prev) => ({
        ...prev,
        message: "password required!",
        isError: true,
      }));

      return;
    } else if (
      confirmPassword === "" ||
      confirmPassword === null ||
      !confirmPassword
    ) {
      setValidation((prev) => ({
        ...prev,
        message: "please confirm password!",
        isError: true,
      }));

      return;
    } else if (confirmPassword !== password) {
      setValidation((prev) => ({
        ...prev,
        message: "Passwords do not match!",
        isError: true,
      }));

      return;
    }

    dispatch(
      registerUser({
        username: firstName.trim() + lastName.trim(),
        f_name: firstName.trim(),
        l_name: lastName.trim(),
        role: "626760a2ee39c723cd41e736",
        phone_number: phone.trim(),
        password: password.trim(),
        email: email.trim(),
      })
    );

    // if (isSuccess) {
    //   navigation.navigate("verification", {
    //     phone: credentials.phone,
    //   });
    // }
    // dispatch(reset());
  };

  useEffect(() => {
    if (isError) {
      setModalMessage(message);
      setShowModal({ type: "error", show: true });

      setTimeout(function () {
        setShowModal((prev) => ({ ...prev, show: false }));
        setModalMessage("");
      }, 2500);
    }

    if (validation?.isError) {
      setModalMessage(validation?.message);
      setShowModal({ type: "error", show: true });

      setTimeout(function () {
        setShowModal((prev) => ({ ...prev, show: false }));
        setModalMessage("");
      }, 2500);
    }

    if (isSuccess) {
      dispatch(reset());

      console.log(user);

      navigation.navigate("verification", {
        phone: credentials.phone,
      });
    }

    if (isLoading) {
      console.log("loading...");
      setLoading(true);
    }

    return () => {
      dispatch(reset());
      setValidation({
        message: "",
        isError: false,
      });
      setLoading(false);
    };
  }, [
    isError,
    message,
    dispatch,
    isLoading,
    isSuccess,
    validation.isError,
    validation.isSuccess,
    validation.message,
  ]);

  return (
    <>
      {/* // if (showModal) { */}

      {showModal?.type === "error" ? (
        <ErrorAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={modalMessage}
        />
      ) : showModal?.type === "success" ? (
        <SuccessAlert
          showModal={showModal?.show}
          handleClose={() => setShowModal(false)}
          message={modalMessage}
        />
      ) : (
        <></>
      )}
      <Box p={3} safeArea style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            {/* Header  */}
            <Header title={"Credentials"} />
            {/* inputs */}
            <VStack py={3} space={4}>
              <HStack space={3}>
                <LabeledInput
                  label={"First Name"}
                  placeholder={"First name"}
                  value={credentials.firstName}
                  handleChange={(name) =>
                    setCredentials((prev) => ({ ...prev, firstName: name }))
                  }
                />
                <LabeledInput
                  label={"Last Name"}
                  placeholder={"First name"}
                  value={credentials.lastName}
                  handleChange={(name) =>
                    setCredentials((prev) => ({ ...prev, lastName: name }))
                  }
                />
              </HStack>

              <Box height={20}>
                <LabeledInput
                  label={"Phone Number"}
                  placeholder={"+254"}
                  value={credentials.phone}
                  handleChange={(phone) =>
                    setCredentials((prev) => ({ ...prev, phone }))
                  }
                />
              </Box>

              {/* passwords */}
              <VStack mt={3} space={4}>
                <Box height={24}>
                  <LabeledInput
                    label={"Create Password"}
                    placeholder={"create a 6 digit password"}
                    exp={
                      "choose a 6 word password, with atleast 1 numerical character."
                    }
                    type={"password"}
                    value={credentials.password}
                    handleChange={(pwd) =>
                      setCredentials((prev) => ({ ...prev, password: pwd }))
                    }
                  />
                </Box>

                <Box height={20}>
                  <LabeledInput
                    label={"Confirm Password"}
                    placeholder={"Re-type your password"}
                    type={"password"}
                    value={credentials.confirmPassword}
                    handleChange={(cpwd) =>
                      setCredentials((prev) => ({
                        ...prev,
                        confirmPassword: cpwd,
                      }))
                    }
                  />
                </Box>

                <Box height={20}>
                  <LabeledInput
                    label={"Email"}
                    placeholder={"E.g. username@email.com"}
                    value={credentials.email}
                    handleChange={(email) =>
                      setCredentials((prev) => ({ ...prev, email }))
                    }
                  />
                </Box>
              </VStack>

              {loading ? (
                <LoadingButton />
              ) : (
                <SubmitButton text={"CONTINUE"} handlePress={handleContinue} />
              )}
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
};

export const LoadingButton = ({ text }) => (
  <Button
    bg={"primary"}
    opacity={"60"}
    borderRadius={"full"}
    mt={4}
    width={"full"}

    // onPress={handleContinue}
  >
    <HStack space={2}>
      <Spinner color={"gray.600"} />
      <Text color={"gray.600"} fontWeight={700} fontSize={"md"}>
        Loading . . .
      </Text>
    </HStack>
  </Button>
);

export const SubmitButton = ({ text, handlePress }) => (
  <Button
    bg={"primary"}
    borderRadius={"full"}
    mt={4}
    width={"full"}
    onPress={handlePress}
  >
    <Text color={"secondary"} fontWeight={800} fontSize={"md"}>
      {text}
    </Text>
  </Button>
);

export default Credentials;
