import React, {useState} from 'react';
import{  StyleSheet, Text, View, Button, Alert, TextInput}  from 'react-native';



export default function App() {



    const[number1, setNumber1] = useState('');
    const[number2, setNumber2] = useState('');
    const [result, setResult] = useState('');

    const buttonAdd = () =>{
      setResult(parseInt(number1)+ parseInt(number2))
     
      ;}
  
      const buttonMinus = () =>{
         setResult(parseInt(number1)- parseInt(number2))}

    

  return (
  
<View style = {styles.container} >
  <Text>Result {result}</Text>
  <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}}
   onChangeText = {(text) => setNumber1(text)} value={number1} keyboardType = "nunmber-pad"/>
   <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}}
   onChangeText  ={(text2) => setNumber2(text2)} value={number2} keyboardType = "nunmber-pad"/>
  <View style={{flexDirection :'row',  alignItems:'center', width : 150,
   justifyContent : 'space-around'}}>
   <Button onPress={buttonAdd} title="+" />
   <Button onPress={buttonMinus} title="-"/>
  </View>
</View>);
   
      
 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  
  }
});
