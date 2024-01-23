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
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/AppButton';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';
import {addUserDetails} from '../redux/slices/UserSlice';
import {colors} from '../util/color';
import {constant} from '../util/constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = props => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  
 /*  Login user credential with server and 
  display message to the user. */
  const loginUser = () => {
    fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message != null && res.message === constant.INVALID_CRED) {
          showMessage(constant.INVALID_CRED);
        } else {
          showMessage(constant.LOGIN_SUCCESS_MSG);
          storeUserSession(true);
          // Store user detail on global store
          dispatch(addUserDetails(res));
          props.callThis(true);
        }
      })
      .catch(error => {
        showMessage(constant.LOGIN_FAILED);
        storeUserSession(false);
      });
  };

  /* Show toast message to the user */
  const showMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  /* Store login status in local storage */
  const storeUserSession = async status => {
    try {
      await EncryptedStorage.setItem(constant.IS_USER_LOGIN, JSON.stringify(status));
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{constant.LOGIN}</Text>

      <TextInput
        placeholder={constant.ENTER_USERNAME}
        style={styles.input}
        value={username}
        onChangeText={txt => setUsername(txt)}
      />
      <TextInput
        placeholder={constant.ENTER_PASSWORD}
        style={styles.input}
        value={pass}
        secureTextEntry={true}
        onChangeText={txt => setPass(txt)}
      />

      <AppButton
        bg={colors.buttonColor}
        title={constant.LOGIN}
        color={colors.white}
        onClick={() => {
          loginUser();
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  title: {
    color: colors.black,
    fontSize: 40,
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center',
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
