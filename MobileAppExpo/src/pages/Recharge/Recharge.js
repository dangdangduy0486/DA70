import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import BackAction from "../../components/BackAction/BackAction";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../color/Color";
import { SelectList } from "react-native-dropdown-select-list";
const Recharge = ({ navigation }) => {
  const walletList = ["Fiat and spot", "Futures", "Funding"];
  const currencyList = ["VND", "YRN", "USD", "YRN", "USD", "YRN", "USD"];
  const [isFocus, setIsFocus] = useState(false);
  const [walletChoose, setWalletChoose] = useState("Fiat and spot");
  const [currencyID, setCurrencyID] = useState("USD");
  const [creditcard, setCreditcard] = useState("Mastercard");
  const ListCreditCard = [
    {
      img: "https://th.bing.com/th/id/OIP.CSv0D_Pv2hzbhGo6UWoLAgHaHa?pid=ImgDet&rs=1",
      value: "Mastercard",
    },
    {
      img: "https://th.bing.com/th/id/R.882554502a910b08926783672406e254?rik=HcKdX2aH%2bJNPTw&pid=ImgRaw&r=0",
      value: "Visa",
    },
    {
      img: "https://th.bing.com/th/id/OIP.eFntJMWiAigLvftXw6GfCwHaBz?pid=ImgDet&rs=1",
      value: "Paypal",
    },
    {
      img: "https://th.bing.com/th/id/R.93432c12cb348bdefdcc27d465fac524?rik=LhggmvPksBkFkA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f04%2fJCB_logo_logotype_emblem_Japan_Credit_Bureau.png&ehk=Q0%2f%2fhZsj0IOI9CRwjKhtQ%2bPCmN0Dgyiqi5VNsI67lvM%3d&risl=&pid=ImgRaw&r=0",
      value: "JCB",
    },
    {
      img: "https://th.bing.com/th/id/OIP.TRozxgHH_1RL9eF0qWKjhgHaEK?pid=ImgDet&rs=1",
      value: "Discover",
    },
    {
      img: "https://th.bing.com/th/id/R.3758ada9405b3b649042694be1d5c722?rik=uowZUfQou%2b8Y5A&riu=http%3a%2f%2fconsumersresearch.org%2fwp-content%2fuploads%2f2019%2f01%2fApple-Pay-Logo-1024x575.png&ehk=W%2fXP3fsdQkodaz609oIZuBFjZMa8TRoThrmdxt0QXNA%3d&risl=&pid=ImgRaw&r=0",
      value: "Apple Pay",
    },
    {
      img: "https://th.bing.com/th/id/R.db677e961692420fce98af43e153e94b?rik=RDJLHiVWUNzncA&pid=ImgRaw&r=0",
      value: "Amazon Pay",
    },
    {
      img: "https://th.bing.com/th/id/OIP.PApyUw088G70rGvpDdoweAHaFj?pid=ImgDet&rs=1",
      value: "Diners Club International",
    },
    {
      img: "https://th.bing.com/th/id/OIP.mVgf3EOygbiEBEh3rtsQJgHaDF?pid=ImgDet&rs=1",
      value: "Stripe",
    },
    {
      img: "https://th.bing.com/th/id/R.759a4f4627d9dbfb40e1da9611d99a7b?rik=DgYa3bCtitbtiQ&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f5%2fAmerican-Express-Logo-Background-PNG-Image.png&ehk=IYCXdLfKX5pjY6avB2J%2friAF%2fN1WWkDLXqQPXDzHyZ8%3d&risl=&pid=ImgRaw&r=0",
      value: "American Express",
    },
  ];
  const [amount, setAmount] = useState(null);
  const handleSubmit = () => {
    console.log(amount);
    console.log(walletChoose);
    console.log(currencyID);
    console.log(creditcard);
    alert("Your transaction is being checked");
  };
  const cardView = () => {
    return ListCreditCard.map((e, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: creditcard === e.value ? COLORS.yellow1 : "white",
          }}
          onPress={() => {
            setCreditcard(e.value);
            alert(`You have successfully selected ${e.value}`);
          }}
        >
          <Image
            source={{ uri: e.img }}
            resizeMode="cover"
            style={{ height: 50, width: 50, padding: 10 }}
          />
          <Text style={{ fontSize: 13, marginHorizontal: 10 }}>{e.value}</Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <BackAction />
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 20, paddingBottom: 10 }}>
            Welcome to DBcrypto!
          </Text>
          <Text style={styles.text_header}>Recharge</Text>
        </View>

        <View style={styles.main}>
          <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ padding: 20 }}>
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
              <Text style={styles.form_label_text}>Select your wallet</Text>
              <View style={styles.form_group1}>
                <SelectList
                  setSelected={(val) => setWalletChoose(val)}
                  data={walletList}
                  search={false}
                />
              </View>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",

                    paddingVertical: 10,
                  }}
                >
                  {cardView()}
                </View>
              </ScrollView>
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
                    Recharge
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recharge;

const styles = StyleSheet.create({
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
  title: {
    color: "white",
    padding: 20,
    backgroundColor: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  text_header: {
    color: COLORS.yellow1,
    fontWeight: "bold",
    fontSize: 30,
  },
  main: {
    flex: 4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
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
  test: {
    backgroundColor: "red",
  },
});
