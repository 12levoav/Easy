import * as React from 'react';
import {Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function SplashScreen() {
  return (
    <View
      style={{
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}
