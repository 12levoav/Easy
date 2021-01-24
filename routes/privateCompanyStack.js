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
import JetStack from './jetStack';
import CompanyProfileStack from './companyProfileStack';
import CompanyRequstsStack from './companyRequestsStack';
import CompanyOfferStack from './companyOfferStack';
import {useSelector} from 'react-redux';

export default function PrivateCompanyStack({signInScreenOptions}) {
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
        name="JetsStack"
        component={JetStack}
        options={{
          tabBarLabel: stateLanguage.translations.Jets ?? 'Jets',
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
        name="CompanyRequstsStack"
        component={CompanyRequstsStack}
        options={{
          tabBarLabel: stateLanguage.translations.Requests ?? 'Requests',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(30)}
              name={'write'}
              style={{color: color}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CompanyOfferStack"
        component={CompanyOfferStack}
        options={{
          tabBarLabel: stateLanguage.translations.Offers ?? 'Offers',
          tabBarIcon: ({color, size}) => (
            <CustomIcon
              size={normalize(34)}
              name={'offersssss'}
              style={{color: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBookingsScreen"
        component={containers.MyBookingsScreen}
        options={{
          tabBarLabel: stateLanguage.translations.Bookings ?? 'Bookings',
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
        name="CompanyProfileSStack"
        component={CompanyProfileStack}
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
    </Tab.Navigator>
  );
}
