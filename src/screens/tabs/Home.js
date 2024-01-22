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
// import Config from 'react-native-config';

//import {useDispatch} from 'react-redux';
import {API_URL} from '@env';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    retrieveUserStatus();
  }, [loginStatus]);

  const retrieveUserStatus = async () => {
    console.log('In retrieveUserStatus >>>');
    try {
      const status = await EncryptedStorage.getItem('IS_USER_LOGIN');
      if (status == null) {
        console.log('In If >>>');
        setLoginStatus(false);
      } else {
        console.log('In Else  >>>');
        setLoginStatus(status);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  };

  //const dispatch = useDispatch();
  useEffect(() => {
    console.log('----<<<<<fetchMore>>>>----');
    getProduct();
  }, [pageNumber]);
  const getProduct = () => {
    console.log(API_URL + '/products?limit=10&skip=' + pageNumber);
   //skip page number, limit page size to 10
    fetch(API_URL + '/products?limit=10&skip=' + pageNumber)
      .then(res => res.json())
      .then(json => {
        if (products.length == 0) {
          // console.log('--------Initial:  '+products.length);
          setProducts(json.products);
        } else {
          if (json.products.length == 0) {
            // console.log('--------Final:  '+json.products);
          } else {
            setProducts(prevData => [...prevData, ...json.products]);
          }
        }

        // console.log('--------total length:  ' + products.length);
        // setProducts(json.products);
        // json.map(item => {
        //   item.qty = 1;
        // });
        //dispatch(addProducts(json));
      });
  };
  const fetchMore = () => {
    setPageNumber(pageNumber + 10);
    console.log('----<<<<<fetchMore>>>>----');
    // getProduct();
  };
  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={require('../../images/back.png')}
        title={'Products'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
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
        onEndReachedThreshold={0.5}
      />
      {loginStatus && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddNewProduct', {type: 'new'});
          }}>
          <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {},
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
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
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EC8A00',
    borderRadius: 25,
    bottom: 130,
    right: 20,

    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
