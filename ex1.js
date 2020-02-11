import React, {useState} from 'react';
import{  StyleSheet, Text, View, Button, TextInput, FlatList}  from 'react-native';



export default function App() {



    const[number1, setNumber1] = useState('');
    const[number2, setNumber2] = useState('');
    const [result, setResult] = useState([]);
    const[data, setData] = useState([]);
    let resultText;


    const buttonAdd = () =>{

      const res = parseInt(number1)+ parseInt(number2);
      setResult(parseInt(number1)+ parseInt(number2))
      resultText = number1 + "+" +  number2  + "=" + res;
      setData([...data, {key: resultText}]);
      setNumber1('')
      setNumber2('')
  
      ;}
  
      const buttonMinus = () =>{
      const res = parseInt(number1)- parseInt(number2);
      setResult(parseInt(number1)- parseInt(number2))
      resultText = number1 + "-" +  number2  + "=" + res;
      setData([...data, {key: resultText}]);
      setNumber1('')
      setNumber2('')
    }

    

  return (
  
<View style = {styles.container} >
  <Text>{result}</Text>
  <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}}
   onChangeText = {(text) => setNumber1(text)} value={number1} keyboardType = "nunmber-pad"/>
   <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}}
   onChangeText  ={(text2) => setNumber2(text2)} value={number2} keyboardType = "nunmber-pad"/>
  <View style={{flexDirection :'row',  alignItems:'center', width : 150,
   justifyContent : 'space-around'}}>
   <Button onPress={buttonAdd} title="+" />
   <Button onPress={buttonMinus} title="-"/>
  </View>
  <Text>History</Text>
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
  
  }
});
