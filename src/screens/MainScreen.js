import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, DataContext } from '../../App';

export default function DashboardScreen() {
  const nav = useNavigation();
  const { signOut } = useContext(AuthContext);
  const { transactions } = useContext(DataContext);

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <Pressable onPress={signOut}>
          <Text style={{ color: '#d00', fontWeight: '600' }}>Logout</Text>
        </Pressable>
      ),
    });
  }, [nav, signOut]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => nav.navigate('AddTransaction')}
        style={{ padding: 16, backgroundColor: '#eee' }}
      >
        <Text style={{ textAlign: 'center', fontWeight: '700' }}>+ Add Transaction</Text>
      </Pressable>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 24, opacity: 0.6 }}>
            No transactions yet
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => nav.navigate('TransactionDetail', { tx: item })}
            style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}
          >
            <Text style={{ fontWeight: '700' }}>${item.amount.toFixed(2)} • {item.category}</Text>
            <Text style={{ opacity: 0.7 }}>{item.date} — {item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
