import 'react-native-gesture-handler';
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './src/screens/SignInScreen';
import DashboardScreen from './src/screens/MainScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';

export const AuthContext = createContext({
  isSignedIn: false,
  signIn: (_u, _p) => {},
  signOut: () => {},
});

export const DataContext = createContext({
  transactions: [],
  addTransaction: (_t) => {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const signIn = (u, p) => {
    if (u === 'admin' && p === 'admin') setIsSignedIn(true);
  };
  const signOut = () => setIsSignedIn(false);

  const addTransaction = (t) => setTransactions((prev) => [t, ...prev]);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      <DataContext.Provider value={{ transactions, addTransaction }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            {isSignedIn ? (
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen
                  name="AddTransaction"
                  component={AddTransactionScreen}
                  options={{ title: 'Add Transaction' }}
                />
                <Stack.Screen
                  name="TransactionDetail"
                  component={TransactionDetailScreen}
                  options={{ title: 'Transaction Detail' }}
                />
              </>
            ) : (
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
}
