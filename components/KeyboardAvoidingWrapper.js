// import React from "react";
// //    keyboard avoiding view
// import {
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchablewithoutFeedback,
//   Keyboard,
// } from "react-native";
// export const KeyboardAvoidingWrapper = ({ children }) => {
//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <ScrollView>
//         <TouchablewithoutFeedback onPress={Keyboard.dismiss}>
//           {children}
//         </TouchablewithoutFeedback>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };
import { KeyboardAvoidingView, ScrollView } from "native-base";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
