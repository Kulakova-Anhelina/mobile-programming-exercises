import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Alert,
  Text,
  AsyncStorage
} from "react-native";

export default function App() {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("Guess number from 1-100");
  const [count, setCount] = useState(1);
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [highScore, setHighScore] = useState([0]);

  const buttonPressed = () => {
    if (Number(number) < random) {
      setText(`Your guess ${number} is too low `);
      setCount(count + 1);
      setNumber('');
    } else if (Number(number) > random) {
      setText(`Your guess ${number} is too high`);
      setCount(count + 1);
      setNumber("");
    } else if (Number(number) === random) {
      if (highScore == 0 || highScore > count) {
        setHighScore(count);
        storeData();
      }
      Alert.alert(`You guess the number in ${count} guesses`);
      setCount(1);
      setNumber('');
      setRandom(Math.floor(Math.random() * 100) + 1);
      setText("Guess number from 1-100");
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("highScore", JSON.stringify(highScore));
      readData();
    } catch (error) {
      // Error saving data
    }
  };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("highScore");
      if (value !== null) {
        // value previously stored

        setHighscore(JSON.parse(value));
      }
    } catch (e) {
      console.log("Error");
    }
  };

  console.log(highScore);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={number => setNumber(number)}
        value={number}
        keyboardType="numeric"
      />
      <View style={{ backgroundColor: "#841584", margin: 20 }}>
        <Button onPress={buttonPressed} title="MAKE GUESS" />
      </View>
      <Text>HighScore:{highScore} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 100
  }
});
