import {StyleSheet, ScrollView, Text, Image, View} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {ImageSlider} from 'react-native-image-slider-banner';
import {colors} from '../util/color';
import {constant} from '../util/constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetail = ({route, navigation}) => {
  // convert list of images into format required for ImageSlider
  const imgList = route.params.data.images.map(name => ({img: name}));

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon={require('../images/back.png')}
        title={constant.PRODUCT_DETAIL}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <ImageSlider
          data={imgList}
          autoPlay={false}
          closeIconColor={colors.white}
        />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.price, {color: colors.black}]}>
            {constant.PRICE}
          </Text>
          <Text style={styles.price}>{' $' + route.params.data.price}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    color: colors.black,
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
    color: colors.green,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
  },
});
