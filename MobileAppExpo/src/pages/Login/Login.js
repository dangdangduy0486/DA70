import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import ErrorMessage from "../../components/Error/Error";
import React, { useState } from "react";
import { Formik } from "formik";
import { COLORS } from "../../color/Color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Login = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter your email"
      ),
    password: Yup.string()
      .required("Required")
      .matches(
        /^[A-Za-z]\w{7,14}$/,
        "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
      ),
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 20, paddingBottom: 10 }}>
          Welcome to DBcryto!
        </Text>
        <Text style={styles.text_header}>Login</Text>
      </View>
      <View style={styles.main}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setTimeout(() => {
              navigation.navigate("DBCoin");
            }, 3000);
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Text style={styles.form_label_text}>Email</Text>
              <View style={styles.form_group}>
                <MaterialCommunityIcons name="email" size={30} />
                <TextInput
                  placeholder="Enter your email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.form_input}
                />
              </View>
              <ErrorMessage errorValue={errors.email} />
              <Text style={styles.form_label_text}>Password</Text>
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
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={{ fontWeight: "bold" }}>Signup</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                  <Text style={{ fontWeight: "bold" }}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
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
export default Login;
