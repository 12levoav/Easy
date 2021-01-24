import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import PrivacyScreen from '../containers/SettingsScreen/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SettingsScreen"
        component={containers.SettingsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={containers.ChangePasswordScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="CurrencyScreen"
        component={containers.CurrencyScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={containers.LanguageScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
