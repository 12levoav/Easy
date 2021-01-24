import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function TopJetStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="TopJetsScreen"
        component={containers.TopJetsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="SingleTopJetScreen"
        component={containers.SingleTopJetScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="UserJetRatingsScreen"
        component={containers.UserJetRatingsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
