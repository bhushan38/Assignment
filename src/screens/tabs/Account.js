import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserInfo from '../UserInfo';
import Login from '../Login';
import EncryptedStorage from 'react-native-encrypted-storage';

const Account = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    retrieveUserStatus();
  }, [loginStatus]);

  // const getUserStatus = async () => {
  //   const status = await AsyncStorage.getItem('IS_USER_LOGIN');
  //   return status;
  // };//

  const retrieveUserStatus = async () => {
    try {
      const status = await EncryptedStorage.getItem('IS_USER_LOGIN');
      if (status == null) {
        console.log("null");
        setLoginStatus(false);
      } else {
        console.log("Status: "+status);
        setLoginStatus(status);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  };
  return (
    <View>
      
      {loginStatus ? <UserInfo /> : <Login />}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
