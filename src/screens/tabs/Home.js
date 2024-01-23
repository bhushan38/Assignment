import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {API_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProducts,
  setLastPageLoaded,
  setLoaded,
  setPagenumber,
} from '../../redux/slices/ProductSlice';
import {colors} from '../../util/color';
import {constant} from '../../util/constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const navigation = useNavigation();
  const productList = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    retrieveUserStatus();
  }, [loginStatus]);

  useEffect(() => {
    if (!productList.loaded) getProduct();
  }, [productList.pageNumber]);

  /* 
   Get Products from server. only fetch 10 product at a time and 
   when user scroll to bottom load next 10 set of data. 
  */

  const getProduct = () => {
    if (productList.pageNumber > productList.lastLodedPageNumber) {
      //skip page number, limit page size to 10
      fetch(API_URL + '/products?limit=10&skip=' + productList.pageNumber)
        .then(res => res.json())
        .then(json => {
          if (json.products.length == 0) {
            /* when ther are no more data available on server set loading flag to true to 
            avaid unnecessory server request. */
            dispatch(setLoaded(true));
          } else {
            // store product list on redux store.
            dispatch(addProducts(json.products));
            /*  update last loaded page number to avoid loading same set of data 
             when user change tab in between. */
            dispatch(setLastPageLoaded(productList.pageNumber));
          }
          // }
        })
        .catch(error => {});
    }
  };

  // Load more data when user scroll to bottom of the screen.
  const fetchMore = () => {
    dispatch(setPagenumber(productList.pageNumber + 10));
  };

  // Get user login status
  const retrieveUserStatus = async () => {
    try {
      const status = await EncryptedStorage.getItem(constant.IS_USER_LOGIN);
      if (status == null) {
        setLoginStatus(false);
      } else {
        setLoginStatus(status);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={constant.Products} />
      {
        <FlatList
          data={productList.data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate(constant.SCREEN_PRODUCT_DETAIL, {
                    data: item,
                  });
                }}>
                <Image
                  source={{uri: item.thumbnail}}
                  style={styles.itemImage}
                />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 25
                      ? item.title.substring(0, 25) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.desc}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.1}
        />
      }
      {loginStatus && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate(constant.SCREEN_ADD_NEW_PRODUCT, {type: 'new'});
          }}>
          <Text style={{fontSize: 30, color: colors.white}}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    marginBottom: 140,
  },
  productItem: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
    bottom: 20,
    right: 20,

    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
