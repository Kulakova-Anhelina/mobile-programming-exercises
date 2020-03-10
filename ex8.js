import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Picker
} from "react-native";
import { useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fixer, setFixer] = useState([]);
  const [rate, setRate] = useState([]);
  const [chosenCurrency, setChosenCurrency] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const url =
      "http://data.fixer.io/api/latest?access_key=4a5e06d3a97a737f4aa4acba36c9f468";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setFixer(responseJson);
        setRate(Object.keys(responseJson.rates));
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  }, []);

  const convert = () => {
    let indexRate = 0;
    for (let i = 0; rate.length > i; i++) {
      if (chosenCurrency === rate[i]) {
        indexRate = i;
        setResult(ammount * rate[indexRate]);
        console.log(result);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <Image
        style={{ width: 200, height: 100 }}
        source={{
          uri:
            "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/2e762caeca6ea587-9l2t7XU4-zoom.jpg"
        }}
      />
      <TextInput
        style={{ fontSize: 18 }}
        value={amount}
        keyboardType="numeric"
        placeholder="enter ammount"
        onChangeText={amount => setAmount(amount)}
      />

      <Picker
        selectedValue={chosenCurrency}
        style={{ height: 50, width: 100 }}
        onValueChange={itemValue => () => setChosenCurrency(itemValue)}
      >
        {rate.map((item, index) => (
          <Picker.Item key={index} label={`${item}`} value={`${item}`} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Find" color="white" onPress={convert} />
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
  }
});
