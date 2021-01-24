import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import containers from '../containers';
import {aspectRatio, normalize} from '../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomIcon from '../components/CustomIcon';
import UserProfileStack from './userProfileStack';
import UserRequestsStack from './userRequestsStack';
import UserBookingsStack from './userBookingsStack';
import {useSelector} from 'react-redux';
import TopJetStack from './topJetStack';

export default function PrivateStack({signInScreenOptions}) {
  const stateLanguage = useSelector((state) => state.LanguageReducer);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#F8C440',
        inactiveTintColor: 'black',
        labelStyle: {fontSize: normalize(12)},
        tabStyle: {
          height:
            aspectRatio > 1.6
              ? heightPercentageToDP('8%')
              : heightPercentageToDP('9%'),
          width: widthPercentageToDP('20%'),
        },

        style: {
          paddingTop: heightPercentageToDP('1%'),
          height: heightPercentageToDP('13%'),
        },
      }}>
      <Tab.Screen
        name="SearchFlightScreen"
        component={containers.SearchFlightScreen}
        options={{
          tabBarLabel: stateLanguage.translations.Search ?? 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-search" color={color} size={normalize(40)} />
          ),
        }}
      />
      <Tab.Screen
        name="TopJetStack"
        component={TopJetStack}
        options={{
          tabBarLabel: stateLanguage.translations.Top_Jets ?? 'Top_Jets',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(30)}
              name={'plane-icon'}
              style={{color: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserBookingsStack"
        component={UserBookingsStack}
        options={{
          tabBarLabel: stateLanguage.translations.My_Bookings ?? 'My_Bookings',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(30)}
              name={'right'}
              style={{color: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserRequestsStack"
        component={UserRequestsStack}
        options={{
          tabBarLabel: stateLanguage.translations.Requests ?? 'Requests',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(30)}
              name={'write'}
              style={{color: color, left: 3}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileStack"
        component={UserProfileStack}
        options={{
          tabBarLabel: stateLanguage.translations.Profile ?? 'Profile',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(30)}
              name={'profile'}
              style={{color: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={containers.NotificationsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
