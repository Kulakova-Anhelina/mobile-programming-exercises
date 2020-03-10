import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

export default class App extends React.Component {
  saveData() {
    let object = {
      name: "John Doe",
      email: "jognh@gmail.com",
      city: "Helsinki"
    };
    AsyncStorage.setItem("user", JSON.stringify(object));
  }

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user)
      alert(parsed.name);
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={this.saveData}>
          <Text>Click to save data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.displayData}>
          <Text>Display data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%"
  }
});
