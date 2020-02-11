import React, {useState} from 'react';
import{  StyleSheet, Text, View, Button, TextInput, FlatList}  from 'react-native';



export default function App() {
    const[text, setText] = useState('');
    const[data, setData] = useState([]);

    const pressButton = () =>{
    setData([...data, {key: text}]);
    setText('')
  
  }

  const clear =()=>{
    setData([]);
  }

  return (
  
<View style = {styles.container} >
<View>
  <TextInput style={{width:200, borderColor:'gray',  borderWidth:1,  alignItems: 'center'}}
   onChangeText = {(text) => setText(text)} value={text} />
  <View style={styles.buttonContainer}>
  <View style ={{backgroundColor:'#841584'}}>
   <Button onPress={pressButton} 
   title="Press me"
   color="white"
   />
   </View>
   <View style ={{backgroundColor:'#841584'}}>
    <Button onPress={clear} 
   title="clear"
   color="white"
   />
   </View>
  </View>
  </View>
  <Text style = {{color: '#2196F3', fontWeight:'bold'}}>Shopping list</Text>
  <View style ={{flex: 4}}>
  <FlatList data={data} renderItem={({item}) =>
  <Text>{item.key}
  </Text>}/>
  </View>
</View>);
   
      
 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100
  
  },
  buttonContainer: {
    margin : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
});
