import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
//import {useSelector} from 'react-redux';
const { width} = Dimensions.get('window');

const AppHeader = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}>
        <Image style={styles.icon} source={leftIcon}></Image>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  header: {
    width: width,
    height: 65,

    backgroundColor: '#42159E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
