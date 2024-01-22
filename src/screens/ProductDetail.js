import {StyleSheet, ScrollView, Text, Image, View} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import { ImageSlider } from 'react-native-image-slider-banner';

const ProductDetail = ({route, navigation}) => {
  const item = route.params.data;
 
  const output = route.params.data.images.map(name => ({'img':name}));
  console.log(">>> "+output);
  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={require('../images/back.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
       <ImageSlider
          data={output}
          autoPlay={false}
          onItemChanged={item => console.log('item', item)}
          closeIconColor="#fff"
        />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price'}</Text>
          <Text style={styles.price}>{' $' + route.params.data.price}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  price: {
    color: 'green',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
  },
});
