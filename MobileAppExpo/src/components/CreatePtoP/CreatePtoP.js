import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { COLORS } from "../../color/Color";
import { SelectList } from "react-native-dropdown-select-list";
const CreatePtoP = ({ navigation }) => {
  const route = useRoute();
  const currencyList = ["VND", "YRN", "USD", "YRN", "USD", "YRN", "USD"];
  const method = ["Buy", "Sell"];
  const [name, setName] = useState("");
  const [currencyID, setCurrencyID] = useState("USD");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState("");
  const [methodSelected, setMethodSelected] = useState("Buy");
  const handleSubmit = () => {
    alert("Your transaction is being checked");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Create transaction</Text>
      </View>
      <View style={styles.main}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={{ padding: 20 }}>
            <Text style={styles.form_label_text}>Enter your name</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your name"
                onChangeText={(newText) => setName(newText)}
                defaultValue={name}
                style={styles.form_input}
              />
            </View>
            <Text style={styles.form_label_text}>Enter your price</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your price"
                onChangeText={(newText) => setPrice(newText)}
                defaultValue={price}
                style={styles.form_input}
              />
            </View>
            <Text style={styles.form_label_text}>Enter your amount</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your amount"
                onChangeText={(newText) => setAmount(newText)}
                defaultValue={amount}
                style={styles.form_input}
              />
            </View>

            <Text style={styles.form_label_text}>Select your currency</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setCurrencyID(val)}
                data={currencyList}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
            <Text style={styles.form_label_text}>Select your method</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setMethodSelected(val)}
                data={method}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
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
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreatePtoP;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  main: {
    flex: 6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },

  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
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
  form_group1: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    marginTop: 10,
  },
  form_input: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
});
