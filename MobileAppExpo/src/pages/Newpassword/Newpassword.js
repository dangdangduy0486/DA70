import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import React, { useState } from "react";
import ErrorMessage from "../../components/Error/Error";
import { Formik } from "formik";
import { COLORS } from "../../color/Color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Newpassword = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .matches(
        /^[A-Za-z]\w{7,14}$/,
        "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
      ),
    password_confi: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password must be matched"),
  });
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 20, paddingBottom: 10 }}>
          Welcome to DBcryto!
        </Text>
        <Text style={styles.text_header}>Reset Password</Text>
      </View>
      <View style={styles.main}>
        <Formik
          initialValues={{
            password: "",
            password_confi: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setTimeout(() => {
              navigation.navigate("Login");
              console.log(values);
            }, 3000);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Text style={styles.form_label_text}>Your Password</Text>
              <View style={styles.form_group}>
                <MaterialCommunityIcons name="key" size={30} />
                <TextInput
                  placeholder="Enter your password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.form_input}
                  secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <MaterialCommunityIcons name={rightIcon} size={30} />
                </Pressable>
              </View>
              <ErrorMessage errorValue={errors.password} />
              <Text style={styles.form_label_text}>Confirm Password</Text>
              <View style={styles.form_group}>
                <MaterialCommunityIcons name="key" size={30} />
                <TextInput
                  placeholder="Enter your password"
                  onChangeText={handleChange("password_confi")}
                  onBlur={handleBlur("password_confi")}
                  value={values.password_confi}
                  style={styles.form_input}
                  secureTextEntry={passwordVisibility}
                />
              </View>
              <ErrorMessage errorValue={errors.password_confi} />
              <View style={styles.button}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Reset Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  main: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: COLORS.yellow1,
    fontWeight: "bold",
    fontSize: 30,
  },
  form_group: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    marginBottom: 10,
  },
  form_input: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    marginTop: 10,
  },
});
export default Newpassword;
