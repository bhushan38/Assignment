import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import {API_URL} from '@env';
import {colors} from '../../util/color';
import {constant} from '../../util/constant';

const Search = () => {
  const [search, setSearch] = useState('');

  const [searchedList, setSearchedList] = useState([]);
  const navigation = useNavigation();

  const searchProduct = txt => {
    //set product to empty array if user click clear icon.
    if (txt == []) {
      setSearchedList([]);
    } else {
      //search list of product based on search text.
      fetch(API_URL + '/products/search?q=' + txt)
        .then(res => res.json())
        .then(json => {
          setSearchedList(json.products);
        });
    }
  };
  return (
    <View style={styles.container}>
      <AppHeader title={constant.SEARCH_PRODUCT} />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            placeholder={constant.SEARCH_PLACEHOLDER}
            onChangeText={txt => {
              setSearch(txt);
              searchProduct(txt);
            }}
            style={styles.input}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={[
              styles.icon,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => {
              setSearch('');
              searchProduct('');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={[styles.icon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{marginTop: 50}}>
        <FlatList
          data={searchedList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate(constant.SCREEN_PRODUCT_DETAIL, {data: item});
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
        />
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {width: '80%', marginLeft: 10},
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: colors.white,
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
    color: colors.green,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
});
