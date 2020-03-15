import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import * as firebase from "firebase";
// Initialize Firebase
const firebaseConfig = {
  apiKey: ""
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(firebaseConfig);
export default function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("items/")
      .on("value", snapshot => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setItems(prods);
      });
  }, []);

  const saveItem = () => {
    firebase
      .database()
      .ref("items/")
      .push({ product: product, amount: amount });
  };

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1
        }}
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1
        }}
        onChangeText={amount => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping list</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
          </View>
        )}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
