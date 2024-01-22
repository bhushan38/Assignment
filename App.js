/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ApplicationNavigator from './src/ApplicationNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigator />
    </Provider>
  );
};
export default App;
