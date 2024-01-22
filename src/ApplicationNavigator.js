import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screens/Main';
import AddNewProduct from './screens/AddNewProduct';
import ProductDetail from './screens/ProductDetail';
import Login from './screens/Login';
import UserInfo from './screens/UserInfo';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewProduct"
          component={AddNewProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <Home></Home>
  );
};

export default ApplicationNavigator;