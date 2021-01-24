import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AuthStackNavigator from './authStack';
import SplashScreen from '../components/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import LayoutStack from './layoutstack';
import LayoutCompanyStack from './layoutCompanystack';
var PushNotification = require('react-native-push-notification');
import RNExitApp from 'react-native-exit-app';

import {Alert, Platform, BackHandler} from 'react-native';
function Router() {
  const state = useSelector((state) => state.AuthReducer);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  let netInfo = useNetInfo();
  let no_inet = stateLanguage.translations.no_inet ?? 'no_inet';
  let no_inet_text = stateLanguage.translations.no_inet_text ?? 'no_inet_text';
  let exit = stateLanguage.translations.exit ?? 'exit';

  let aler = async () => {
    Alert.alert(
      no_inet,
      no_inet_text,
      [
        {
          text: exit,
          onPress: () =>
            Platform.OS === 'ios' ? RNExitApp.exitApp() : BackHandler.exitApp(),
        },
        {
          text: stateLanguage.translations.Cancel ?? 'Cancel',
          onPress: () => {
            NetInfo.fetch().then((info) => {
              if (
                info.isConnected === false &&
                info.isInternetReachable === false &&
                info.type !== 'unknown'
              ) {
                aler();
              } else {
                console.log(123);
              }
            });
          },
        },
      ],
      {cancelable: false},
    );
  };
  React.useEffect(() => {
    setLoading(false);
    console.log(netInfo, 123);
    if (
      netInfo.isConnected === false &&
      netInfo.isInternetReachable === false &&
      netInfo.type !== 'unknown'
    ) {
      aler(netInfo);
    }
  }, [state.token, netInfo]);
  return (
    <NavigationContainer>
      {loading ? (
        <SplashScreen />
      ) : state.token !== null ? (
        state.user.role === 'user' ? (
          <LayoutStack />
        ) : (
          <LayoutCompanyStack />
        )
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}
export default Router;
