import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/AppButton';
import {API_URL} from '@env';


const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const loginUser = () => {
    fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: pass,
        // expiresInMins: 60, // optional
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('Login:' + res);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Login successful !!!', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Login successful !!!');
        }
        storeUserSession(true);
        // dispatch(addUserDetail(json));
      })
      .catch(error => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Login failed.', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Login failed.');
        }
        storeUserSession(false);
      });
  };

  const storeUserSession = async status => {
    try {
      await EncryptedStorage.setItem('IS_USER_LOGIN', JSON.stringify(status));

      // Congrats! You've just stored your first value!
    } catch (error) {
      // There was an error on the native side
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Login'}</Text>

      <TextInput
        placeholder="Enter Username"
        style={styles.input}
        value={username}
        onChangeText={txt => setUsername(txt)}
      />

      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={txt => setPass(txt)}
      />

      <AppButton
        bg={'#E27800'}
        title={'Login'}
        color={'#fff'}
        onClick={() => {
          loginUser();
        }}
      />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
