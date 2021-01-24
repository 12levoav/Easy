import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import PrivateCompanyStack from './privateCompanyStack';
import PrivateStack from './privateStack';

const Stack = createStackNavigator();

export default function LayoutCompanyStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="PrivateCompanyStack"
        component={PrivateCompanyStack}
        options={{
          ...signInScreenOptions,
        }}
      />

      <Stack.Screen
        name="NotificationsScreen"
        component={containers.NotificationsScreen}
        options={{
          ...signInScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
}
