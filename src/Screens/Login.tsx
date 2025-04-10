import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from '@components';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '@store';
import axios from 'axios';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(
        'https://api.escuelajs.co/api/v1/auth/login',
        {email, password},
      );

      const token = loginResponse.data.access_token;

      const profileResponse = await axios.get(
        'https://api.escuelajs.co/api/v1/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = profileResponse.data;
      dispatch(
        loginSuccess({
          user,
          token,
        }),
      );
    } catch (error) {
      alert('Login error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginTxt}>Login</Text>
      <View style={styles.loginForm}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginbtn} onPress={handleLogin}>
          <Text style={styles.loginBtnn}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C7A9',
  },
  loginTxt: {
    marginTop: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  loginForm: {
    marginTop: 10,
    height: 350,
    width: 380,
    alignSelf: 'center',
  },
  loginbtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  loginBtnn: {
    height: 40,
    width: 150,
    textAlign: 'center',
    backgroundColor: '#007BFF',
    color: 'white',
    lineHeight: 40,
  },
});
