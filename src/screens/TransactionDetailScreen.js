import React from 'react';
import { View, Text } from 'react-native';

export default function TransactionDetailScreen({ route }) {
  const transaction = route?.params?.transaction;
  if (!transaction) {
    return (
      <View style={{ flex:1, padding:16, justifyContent:'center', alignItems:'center' }}>
        <Text>No transaction data</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 6 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{transaction.description}</Text>
      <Text>Amount: ${transaction.amount.toFixed(2)}</Text>
      <Text>Date: {transaction.date}</Text>
      <Text>Location: {transaction.location}</Text>
      <Text>Type: {transaction.type}</Text>
      <Text>Category: {transaction.category}</Text>
      <Text style={{ opacity: 0.6 }}>ID: {transaction.id}</Text>
    </View>
  );
}
