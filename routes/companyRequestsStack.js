import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function CompanyRequstsStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="JetRequestsScreen"
        component={containers.JetRequestsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="RequestDetailsScreen"
        component={containers.RequestDetailsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
