import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppButton from '../components/AppButton';
import {useSelector} from 'react-redux';

const UserInfo = (props) => {
  const userDetail = useSelector(state => state.user);
  console.log('user::: ' + JSON.stringify(userDetail));
  console.log('user::: ' + userDetail.data.email);

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
      <View style={styles.imagecontainer}>
        <Image style={styles.userImage} source={{uri: userDetail.data.image}}></Image>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Name'}</Text>
        <Text style={styles.value}>
          {userDetail.data.firstName} {userDetail.data.lastName}
        </Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Email'}</Text>
        <Text style={styles.value}>{userDetail.data.email}</Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Username'}</Text>
        <Text style={styles.value}>{userDetail.data.username}</Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{'Gender'}</Text>
        <Text style={styles.value}>{userDetail.data.gender}</Text>
      </View>
      <AppButton
        bg={'#E27800'}
        title={'Logout'}
        color={'#fff'}
        onClick={() => {
          clearStorage();
          props.callThis(false);
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
    marginLeft: 20,
    marginTop: 20,
  },
  imagecontainer:{
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
