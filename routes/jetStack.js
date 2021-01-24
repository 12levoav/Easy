import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function JetStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="JetsScreen"
        component={containers.JetsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="AddJetScreen"
        component={containers.AddJetScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="EditJetScreen"
        component={containers.EditJetScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="CompanyJetRatingsScreen"
        component={containers.CompanyJetRatingsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
