import * as encoding from 'text-encoding';

import {GlobalContext, GlobalProvider} from './src/context/GlobalProvider';
import React, {useContext} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import ErrorBoundary from 'react-native-error-boundary';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const errorHandler = (error, stackTrace) => {
    console.log('error', error);
  };

  function ContextChild() {
    const {setToken} = useContext(GlobalContext);

    async function getRouteHistory(route) {
      try {
        const token = await AsyncStorage.getItem('token');
        new Promise((resolve, reject) => {
          setToken(token);
          resolve(token);
        }).then(response => {});
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <>
        <NavigationContainer onStateChange={state => getRouteHistory(state)}>
          <DrawerNavigation />
        </NavigationContainer>
      </>
    );
  }

  return (
    <ErrorBoundary onError={errorHandler}>
      <GlobalProvider>
        <StatusBar
          translucent
          backgroundColor={'#000'}
          barStyle="light-content"
        />
        <ContextChild />
      </GlobalProvider>
    </ErrorBoundary>
  );
};

export default App;
