import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { COLORS } from "../../color/Color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Login = (navigation) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

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
        <Text style={styles.text_header}>Sign up</Text>
      </View>
      <View style={styles.main}>
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.form_label_text}>Your Name</Text>
              <View style={styles.form_group}>
                <MaterialCommunityIcons name="account" size={30} />
                <TextInput
                  placeholder="Enter your name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={styles.form_input}
                />
              </View>
              <Text style={styles.form_label_text}>Your Email</Text>
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
              <Text style={styles.form_label_text}>Re-enter Your Password</Text>
              <View style={styles.form_group}>
                <MaterialCommunityIcons name="key" size={30} />
                <TextInput
                  placeholder="Enter your password"
                  onChangeText={handleChange("repassword")}
                  onBlur={handleBlur("repassword")}
                  value={values.repassword}
                  style={styles.form_input}
                  secureTextEntry={passwordVisibility}
                />
              </View>
              <Button onPress={handleSubmit} title="Submit" />
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
});
export default Login;
