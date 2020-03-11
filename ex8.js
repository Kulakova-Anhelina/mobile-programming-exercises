import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Picker,
  TouchableOpacity
} from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState([]);
  const [currencyChoice, setCurrencyChoice] = useState({
    value: "",
    index: ""
  });
  const [monetaryList, setMonetaryList] = useState([]);
  const url = `http://data.fixer.io/api/latest?access_key=8307081fd4ddc59c59c41735025c1e76`;

  const getUrlRates = () => {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setMonetaryList(Object.keys(responseJson.rates));
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  useEffect(() => {
    getUrlRates();
  }, []);

  const convert = () => {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const rate = responseJson.rates[monetaryList[Number(currencyChoice.index)]];
        setResult(
          
          (amount/rate).toFixed(2));
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{result}€</Text>
      <Image
        style={{ width: 200, height: 100 }}
        source={{
          uri:
            "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/2e762caeca6ea587-9l2t7XU4-zoom.jpg"
        }}
      />
      <TextInput
        style={styles.input}
        value={amount}
        keyboardType="numeric"
        placeholder="enter ammount"
        onChangeText={amount => setAmount(amount)}
      />
      <TouchableOpacity activeOpacity={3}>
        <Picker
          selectedValue={currencyChoice.value}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemName, itemIndex) =>
            setCurrencyChoice({ value: itemName, index: itemIndex })
          }
        >
          {monetaryList.map((itemName, index) => {
            return (
              <Picker.Item key={index} label={itemName} value={itemName} />
            );
          })}
        </Picker>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Find" onPress={convert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    margin: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "purple"
  },
  input: {
    width: 150,
    height: 50,
    borderColor: "black",
    fontSize: 18
  }
});