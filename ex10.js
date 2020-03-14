import React, { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    lat: 60.200692,
    long: 24.934302,
    error: null,
    name: ""
  });

  const [location, setLocation] = useState("");
  const appiKey = "AIzaSyB9FJAiFsG2_uVzvSn1bmf-yaP6VK5f_L8";

  const getLocation = () => {
    const url =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" +
      location +
      "&key=" +
      appiKey;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setRegion({
          lat: responseJson.results[0].geometry.location.lat,
          long: responseJson.results[0].geometry.location.lng,
          name: responseJson.results[0].name
        });
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", flex: 2 }}
        region={{
          latitude: region.lat,
          longitude: region.long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{ latitude: region.lat, longitude: region.long }}
          title={region.name}
        />
      </MapView>

      <TextInput
        style={{ fontSize: 18 }}
        value={location}
        placeholder="enter location"
        onChangeText={location => setLocation(location)}
      />

      <Button title="Show" onPress={getLocation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
