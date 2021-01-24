import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ratio, aspectRatio, normalize} from '../../helpers/helper';

export default StyleSheet.create({
  container: {
    width: wp('77.5%'),
    height: hp('6.7%'),
    borderRadius: 3,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    marginRight: wp('11.5%'),
    marginLeft: wp('11.5%'),
    marginTop: hp('5%'),
  },

  input: {
    flex: 1,
    height: hp('6.7%'),
    padding: 10 * ratio,
    fontSize: normalize(16),
    color: 'white',
  },
  label: {
    fontSize: normalize(18),
    color: 'white',
    position: 'absolute',
    left: 10 * ratio,
    bottom: hp('5.5%'),
    textAlign: 'center',
  },
});
