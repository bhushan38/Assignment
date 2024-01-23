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
import {colors} from '../util/color';
const {width} = Dimensions.get('window');

/*
 * This reusable component is used to create custom header in the app,
 * We can add back arrow button and click function from calling components.
 */
const AppHeader = ({title, leftIcon, onClickLeftIcon}) => {
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
      <View style={styles.btn}></View>
    </View>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  header: {
    width: width,
    height: 65,

    backgroundColor: colors.headerColor,
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
    tintColor: colors.white,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
