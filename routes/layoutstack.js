import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import PrivateCompanyStack from './privateCompanyStack';
import PrivateStack from './privateStack';

const Stack = createStackNavigator();

export default function LayoutStack({signInScreenOptions}) {
  return (
    <Stack.Navigator mode={'card'} screenOptions={{headerShown: false}}>

      <Stack.Screen
        name="PrivateStack"
        component={PrivateStack}
        options={{
          ...signInScreenOptions,
        }}
      />

    </Stack.Navigator>
  );
}
