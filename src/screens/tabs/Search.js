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
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [search, setSearch] = useState('');

  const [searchedList, setSearchedList] = useState([]);
  const navigation = useNavigation();

  // Search product from server according to the user typed text.
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
    <SafeAreaView style={styles.container}>
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
              // Clear text area and empty searched product list.
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

      <View style={{marginTop: 10, padding: 10}}>
        <FlatList
          data={searchedList}
          ListEmptyComponent={
            <Text style={styles.emptyView}>{constant.NO_DATA_FOUND}</Text>
          }
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
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth: 0.7,
    borderBottomColor: colors.lightGrey,
    borderRadius: 10,
  },
  emptyView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,

    borderRadius: 10,
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
