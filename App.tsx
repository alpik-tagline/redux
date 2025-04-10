import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store, persistor} from '@store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
