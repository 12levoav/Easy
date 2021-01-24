import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ratio, normalize} from '../../helpers/helper';

const style = StyleSheet.create({
  dateTouchBody: {
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),
    borderWidth: 0,
  },
  dateInput: {
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),
    borderWidth: 0,
    alignItems: 'flex-start',
    paddingLeft: 10 * ratio,
  },
  dateText: {
    fontSize: normalize(14),
    color: 'black',
  },
  label: {
    fontSize: normalize(18),
    color: 'black',
    position: 'absolute',
    left: 10 * ratio,
    bottom: hp('5.5%'),
    textAlign: 'center',
  },
});
export default style;
