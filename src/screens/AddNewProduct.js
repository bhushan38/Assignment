import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  AlertIOS,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {API_URL} from '@env';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';

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
          console.log('Success: ' + res.title);
          if (Platform.OS === 'android') {
            ToastAndroid.show("Product added successfully !!!", ToastAndroid.SHORT);
          } else {
            AlertIOS.alert("Product added successfully !!!");
          }
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log('error:' + error);
      });
  };
  return (
    <View style={styles.container}>
        <AppHeader
        leftIcon={require('../images/back.png')}
        title={'Add New Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <TextInput
        placeholder="Title"
        style={[styles.input, {marginTop: 50}]}
        value={title}
        onChangeText={txt => setTitle(txt)}
      />
      <TextInput
        placeholder="Description"
        style={[styles.input, {marginTop: 10}]}
        value={desc}
        onChangeText={txt => setDesc(txt)}
      />
      <TextInput
        placeholder="Price"
        style={[styles.input, {marginTop: 10}]}
        value={price}
        keyboardType="numeric"
        onChangeText={txt => setPrice(txt)}
      />
      <AppButton
        bg={'#FE9000'}
        title={'Save Product'}
        color="#fff"
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
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EC8A00',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
