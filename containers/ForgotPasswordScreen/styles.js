import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {normalize} from '../../helpers/helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    width: widthPercentageToDP('100%'),
  },
  beforeFooter: {
    flex: 0.9,
    alignItems: 'center',

    width: widthPercentageToDP('100%'),
  },
  imageBackground: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('100%'),
    backgroundColor: 'black',
  },

  loginText: {
    color: '#F8C440',
    fontSize: normalize(16),
    marginTop: heightPercentageToDP('28.7%'),
    marginBottom: heightPercentageToDP('4.2%'),
    alignItems: 'center',
    textAlign: 'center',
    width:widthPercentageToDP('80%'),
    marginLeft: widthPercentageToDP('10%')
  },
  input: {
    marginBottom: heightPercentageToDP('3%'),
    borderColor: '#2EA7F9',
    borderWidth: 1,
    borderRadius: normalize(2),
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),
    color: 'white',
    fontSize: normalize(14),
    paddingLeft: widthPercentageToDP('6.4%'),
  },
  loginButton: {
    borderColor: '#F8C440',
    borderWidth: 1,
    borderRadius: normalize(6),
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),
    backgroundColor: '#F8C440',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('6%'),
    marginLeft: widthPercentageToDP('10.5%'),
  },
  facebookButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: normalize(6),
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('7.4%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    paddingHorizontal: widthPercentageToDP('12%'),
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: normalize(18),
  },
  facebookButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
  },
  forgetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: normalize(16),
    marginTop: heightPercentageToDP('2%'),
  },
  footer: {
    flex: 0.1,
    alignItems: 'center',
    backgroundColor: '#0F0E0E',
  },
  footerText: {color: 'white', fontSize: normalize(16)},
  checkText: {
    color: 'white',
    fontSize: normalize(18),
    marginRight:widthPercentageToDP('2%')
  },
  verificationBox: {
    width: widthPercentageToDP('80%'),
    backgroundColor: 'white',
    height: heightPercentageToDP('28%'),
    borderRadius: normalize(3),
    marginLeft: widthPercentageToDP('10%'),
    alignItems: 'center',
    marginTop: heightPercentageToDP('25%'),
  },
  letterView: {
    height: widthPercentageToDP('20%'),
    width: widthPercentageToDP('20%'),
    borderRadius: widthPercentageToDP('40%'),
    backgroundColor: '#F8C440',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: heightPercentageToDP('4%'),
  },
});
