import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { DataContext } from '../../App';

export default function AddTransactionScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const { addTransaction } = useContext(DataContext);

  const validate = () => {
    if(!date || 
       !amount ||
       !description ||
       !location ||
       !type ||
       !category){
        return "All field are required";
       }
    const number = Number(amount);
    if(Number.isNaN(number) || number <= 0 ) return "Amount must be positive num";
    return '';
  }

  const onAdd = () => {
    const error = validate();
    if(error) {
      Alert.alert("Invalid, retry please", error);
      return;
    }

    addTransaction({
      id: Date.now().toString(),
      date,
      amount: Number(amount),
      description,
      location,
      type,
      category
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text>Date</Text>
      <TextInput 
        value={date} 
        onChangeText={setDate} 
        placeholder="YYYY-MM-DD" 
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      
      <Text>Amount</Text>
      <TextInput 
        value={amount} 
        onChangeText={setAmount} 
        keyboardType="numeric" 
        placeholder="100.00" 
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Text>Description</Text>
      <TextInput 
        value={description} 
        onChangeText={setDescription} 
        placeholder="..." style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Text>Location</Text>
      <TextInput 
        value={location} 
        onChangeText={setLocation} 
        placeholder="..." 
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Text>Type (Credit/Debit/Refund)</Text>
      <TextInput 
        value={type} 
        onChangeText={setType} 
        placeholder="Debit" 
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Text>Category</Text>
      <TextInput 
        value={category} 
        onChangeText={setCategory} 
        placeholder="Shopping" 
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Button title="Add" onPress={onAdd} />
    </View>
  );
}
