import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../../App';

export default function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username === 'admin' && password === 'admin') {
      signIn(username, password);
    } else {
      Alert.alert('Login failed', 'Use admin / admin');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center' }}>Sign In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <Button title="Sign In" onPress={onLogin} />
      <Text style={{ textAlign:'center', opacity:0.6, marginTop:6 }}>Hint: admin / admin</Text>
    </View>
  );
}
