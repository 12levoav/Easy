import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import SettingsStack from './settingsStack';

const Stack = createStackNavigator();

export default function CompanyProfileStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CompanyProfileScreen"
        component={containers.CompanyProfileScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="CompanyInformationScreen"
        component={containers.CompanyInformationScreen}
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
