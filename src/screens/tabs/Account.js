import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserInfo from '../UserInfo';
import Login from '../Login';
import EncryptedStorage from 'react-native-encrypted-storage';
import { constant } from '../../util/constant';

const Account = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    retrieveUserStatus();
  }, [loginStatus]);

  const changeLoginStatus = sts => {
    setLoginStatus(sts);
  };
  const retrieveUserStatus = async () => {
    try {
      const status = await EncryptedStorage.getItem(constant.IS_USER_LOGIN);
      if (status == null) {
        setLoginStatus(false);
      } else {
        setLoginStatus(status);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  };
  return (
    <View>
      {loginStatus ? (
        <UserInfo callThis={changeLoginStatus} />
      ) : (
        <Login callThis={changeLoginStatus} />
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
