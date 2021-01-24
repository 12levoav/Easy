import {StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ratio, normalize} from '../../helpers/helper';

const style = StyleSheet.create({
  label: {
    fontSize: normalize(18),
    color: 'black',
    position: 'absolute',
    left: 10 * ratio,
    bottom: hp('5.5%'),
    textAlign: 'center',
  },
  container: {
    width: wp('80%'),
    height: hp('6.7%'),
    borderRadius: 3,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
    marginTop: hp('5%'),
  },
});
export default style;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: hp('5%'),

    fontSize: normalize(14),
    paddingHorizontal: 10,
    justifyContent: 'center',
    width: wp('80%'),
    height: hp('6.7%'),
    backgroundColor: 'white',
    borderRadius: 3,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
  },

  inputAndroidContainer: {
    width: wp('80%'),
    height: hp('6.7%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5%'),
  },

  iconContainer: {
    top: Platform.OS === 'ios' ? hp('6.5%') : null,
    right: wp('1%'),
    // width: wp('5%'),
  },
  inputAndroid: {
    fontSize: normalize(14),
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: wp('80%'),
    height: hp('6.7%'),
    backgroundColor: 'white',
    borderRadius: 3,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
  },
  placeholder: {
    color: '#808080',
  },
});
