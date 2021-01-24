import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import containers from '../containers';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

const Stack = createStackNavigator();

export default function AuthStackNavigator({signInScreenOptions}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="FirstScreen"
          component={containers.FirstScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="PreRegisterScreen"
          component={containers.PreRegisterScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="CompanyRegisterScreen"
          component={containers.CompanyRegisterScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="CompanyCodeScreen"
          component={containers.CompanyCodeScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="UserRegisterScreen"
          component={containers.UserRegisterScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="UserCodeScreen"
          component={containers.UserCodeScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={containers.SignInScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={containers.ForgotPasswordScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="ForgetCodeScreen"
          component={containers.ForgetCodeScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
        <Stack.Screen
          name="PasswordUpdateScreen"
          component={containers.PasswordUpdateScreen}
          options={{
            ...signInScreenOptions,
          }}
        />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  );
}
