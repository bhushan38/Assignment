import {
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  AlertIOS,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {API_URL} from '@env';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import {colors} from '../util/color';
import {constant} from '../util/constant';

const AddNewProduct = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const addNewProduct = () => {
    fetch(API_URL + '/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        price: price,
        desc: desc,
        /* other product data */
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (title == res.title) {
          showMessage(constant.PRODUCT_ADDED_SUCCESS_MSG);
          navigation.goBack();
        }
      })
      .catch(error => {
        showMessage(error);
      });
  };

  const showMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={require('../images/back.png')}
        title={constant.ADD_NEW_PRODUCT_TITLE}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <TextInput
        placeholder={constant.TITLE}
        style={[styles.input, {marginTop: 50}]}
        value={title}
        onChangeText={txt => setTitle(txt)}
      />
      <TextInput
        placeholder={constant.DESCRIPTION}
        style={[styles.input, {marginTop: 10}]}
        value={desc}
        onChangeText={txt => setDesc(txt)}
      />
      <TextInput
        placeholder={constant.PRICE}
        style={[styles.input, {marginTop: 10}]}
        value={price}
        keyboardType="numeric"
        onChangeText={txt => setPrice(txt)}
      />
      <AppButton
        bg={colors.buttonColor}
        title={constant.SAVE_PRODUCT}
        color={colors.white}
        onClick={() => {
          addNewProduct();
        }}
      />
    </View>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
  },
});
