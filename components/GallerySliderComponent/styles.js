import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ratio, normalize} from '../../helpers/helper';

const style = StyleSheet.create({
  container: {
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),

    borderRadius: 3,
    borderWidth: 1,

    marginBottom: hp('7%'),
  },

  input: {
    flex: 1,
    height: hp('6.7%'),

    padding: 10 * ratio,

    fontSize: normalize(14),
    color: 'black',
  },
  label: {
    fontSize: normalize(14),
    position: 'absolute',
    backgroundColor: '#F6F7F7',
    bottom: hp('9%'),
    // width:wp('18.8%'),
    textAlign: 'center',
  },
});
export default style;
