import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import SettingsStack from './settingsStack';

const Stack = createStackNavigator();

export default function UserProfileStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="UserProfileScreen"
        component={containers.UserProfileScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="UserInformationScreen"
        component={containers.UserInformationScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="PrivacyScreen"
        component={containers.PrivacyScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="PaymentsHistoryScreen"
        component={containers.PaymentsHistoryScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="ContactUsScreen"
        component={containers.ContactUsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
