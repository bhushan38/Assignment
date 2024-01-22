import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppButton from '../components/AppButton';

const UserInfo = () => {
  const clearStorage = async () => {
    try {
      await EncryptedStorage.clear();
      // Congrats! You've just cleared the device storage!
    } catch (error) {
      // There was an error on the native side
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'User Profile'} isCart={true} />
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Username'}</Text>
        <Text style={styles.value}>{'Username'}</Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Email'}</Text>
        <Text style={styles.value}>{'Email'}</Text>
      </View>
      <AppButton
        bg={'#E27800'}
        title={'Logout'}
        color={'#fff'}
        onClick={() => {
          clearStorage();
        }}
      />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // flexDirection: 'column',
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  value: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
});
