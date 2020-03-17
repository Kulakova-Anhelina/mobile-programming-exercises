import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Button, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    lat: 60.200692,
    long: 24.934302
  });

  const [location, setLocation] = useState("");
  const appiKey = "appi";
  const [data, setData] = useState([]);

const getUrl = (lat, long) =>{
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&region=fi&key=${appiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      setRegion({
        lat: responseJson.results[0].geometry.location.lat,
        long: responseJson.results[0].geometry.location.lng
      });
    });

    return lat = region.lat, long = region.long
}

  

  const getPlace = () => {
 let myLat = getUrl();
  setRegion({
    lat: myLat.lat,
    long: myLat.long

  })
    const url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.lat},${region.long}&radius=1500&type=restaurant&&key=${appiKey}`;
    fetch(url2)
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.results);
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", flex: 2 }}
        initialRegion={{
          latitude: region.lat,
          longitude: region.long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Callout>
          {data.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng
              }}
              title={marker.name}
            />
          ))}
        </Callout>
      </MapView>
      <TextInput
        style={{ fontSize: 18 }}
        value={location}
        placeholder="enter location"
        onChangeText={location => setLocation(location)}
      />

      <Button title="Show" onPress={getPlace} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
