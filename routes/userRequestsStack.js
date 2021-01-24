import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function UserRequestsStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="UserRequestsScreen"
        component={containers.UserRequestsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="UserOffersScreen"
        component={containers.UserOffersScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="UserOfferDetailsScreen"
        component={containers.UserOfferDetailsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
