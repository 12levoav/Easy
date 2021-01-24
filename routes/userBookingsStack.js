import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function UserBookingsStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MyBookingsScreen"
        component={containers.MyBookingsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="AddPassengersScreen"
        component={containers.AddPassengersScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="PaymentsScreen"
        component={containers.PaymentsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="PrePaymentScreen"
        component={containers.PrePaymentScreen}
        options={{
          ...signInScreenOptions,
        }}
      />

    </Stack.Navigator>
  );
}
