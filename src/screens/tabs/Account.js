import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserInfo from '../UserInfo';
import Login from '../Login';
import EncryptedStorage from 'react-native-encrypted-storage';
import {constant} from '../../util/constant';
import {useSelector} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  const userDetail = useSelector(state => state.user);

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    // get Login status
    retrieveUserStatus();
  }, [loginStatus]);

  // This function gets called from Login & UserInfo screen and update this tab screen accordingly.
  const changeLoginStatus = sts => {
    setLoginStatus(sts);
  };

  // Get initial login status
  const retrieveUserStatus = async () => {
    try {
      const status = await EncryptedStorage.getItem(constant.IS_USER_LOGIN);

      if (status == null || userDetail.data == null) {
        setLoginStatus(false);
      } else {
        setLoginStatus(status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      {/* Depending on login status app will show respective screen */}
      {loginStatus ? (
        <UserInfo callThis={changeLoginStatus} />
      ) : (
        <Login callThis={changeLoginStatus} />
      )}
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
