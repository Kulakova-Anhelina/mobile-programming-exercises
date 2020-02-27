import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [ingridient, setIngridient] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ ingridient;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipe(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={{fontSize: 18}} 
        value={ingridient}
        keyboardType = "ascii-capable"
        placeholder="Search"
        onChangeText={(ingridient) => setIngridient(ingridient)} 
      />
      <View style = {styles.buttonContainer}>
     <Button 
     title="Find" 
     color = "white"
     onPress={getRecipe} />
    </View>
      <FlatList 
        style={{marginLeft : "5%"}}
        data={recipe} 
        keyExtractor={item => item.title} 
        renderItem={({item}) => 
        <View>
          <Text>{item.title}</Text>
          <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item.thumbnail }}
            />
        </View>}
        ItemSeparatorComponent={listSeparator}
        
      />  
    
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  width: 300,
  margin: 30,
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 buttonContainer:{
  flexDirection :'row',  
  alignItems:'center', 
  margin: 20,
  justifyContent : 'space-between', 
  backgroundColor: 'purple',
 
}
});