import {StyleSheet, Text, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import AppHeader from '../components/AppHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppButton from '../components/AppButton';
import {useSelector} from 'react-redux';
import {colors} from '../util/color';
import {constant} from '../util/constant';

const UserInfo = props => {
  const userDetail = useSelector(state => state.user);

  const clearStorage = async () => {
    try {
      await EncryptedStorage.clear();
      // Congrats! You've just cleared the device storage!
    } catch (error) {
      // There was an error on the native side
    }
  };

  return (
    <View>
      <AppHeader title={constant.USER_PROFILE} />
      <View style={styles.profileImage}>
        <Image style={styles.userImage} source={{uri: userDetail.data.image}} />
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{constant.NAME}</Text>
        <Text style={styles.value}>
          {userDetail.data.firstName} {userDetail.data.lastName}
        </Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{constant.EMAIL}</Text>
        <Text style={styles.value}>{userDetail.data.email}</Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{constant.USERNAME}</Text>
        <Text style={styles.value}>{userDetail.data.username}</Text>
      </View>
      <View style={styles.typeView}>
        <Text style={styles.header}>{constant.GENDER}</Text>
        <Text style={styles.value}>{userDetail.data.gender}</Text>
      </View>
      <AppButton
        bg={colors.buttonColor}
        title={constant.LOGOUT}
        color={colors.white}
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
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 23,
    color: colors.black,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  value: {
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginTop: 20,
  },
  profileImage: {
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
    borderWidth: 2,
    borderColor: colors.lightGrey,
  },
});
