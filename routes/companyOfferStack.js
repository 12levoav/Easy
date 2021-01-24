import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';

const Stack = createStackNavigator();

export default function CompanyOfferStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CompanyOffersScreen"
        component={containers.CompanyOffersScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
      <Stack.Screen
        name="OfferDetailsScreen"
        component={containers.OfferDetailsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />

    </Stack.Navigator>
  );
}
