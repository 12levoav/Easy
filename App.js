import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';

import * as Sentry from '@sentry/react-native';
import Router from './routes';
import {Provider} from 'react-redux';
console.disableYellowBox = true;
import createStore from '../src/store/configureStore';

function App(props) {
  const [store, setStore] = useState(createStore());
  useEffect(() => {
    setStore(createStore());
  }, []);
  return (
    <Provider store={store.store}>
      <Router />
    </Provider>
  );
}

export default App;
