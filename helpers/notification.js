import {get_device_token} from '../store/actions/actions';
var PushNotification = require('react-native-push-notification');
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {Platform} from 'react-native';
export function configureNotifcaiton(dispatch, props) {
  PushNotification.configure({
    onRegister: (token_device) => {
      dispatch(get_device_token(token_device.os, token_device.token));
      console.log(token_device.os, token_device.token);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },
    onNotification: (notification) => {
      console.log(notification, 123);
      if (Platform.OS == 'android') {
        PushNotification.localNotification({
          message: notification.data.message,
        });
      }
      let badge =
        Platform.OS === 'android'
          ? notification.data.badge
          : notification.badge;
      if (badge === 0) {
        props.navigation.navigate('CompanyRequstsStack');
      } else if (badge === 1) {
        props.navigation.navigate('CompanyRequstsStack');
      } else if (badge === 2) {
        props.navigation.navigate('CompanyRequstsStack');
      } else if (badge === 3) {
        props.navigation.navigate('MyBookingsScreen');
      } else if (badge === 4) {
        props.navigation.navigate('UserRequestsStack');
      } else if (badge === 5) {
        props.navigation.navigate('MyBookingsScreen');
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);

      // PushNotification.setApplicationIconBadgeNumber(0);
      // Alert.alert(JSON.stringify(notification));
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
    // ANDROID: GCM or FCM Sender ID
    senderID: 'some ID',
  });
}
