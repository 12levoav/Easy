import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';

import Input from '../../components/InputComponent';
import CheckBox from 'react-native-check-box';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {normalize, setBearerToken} from '../../helpers/helper';
import {
  checkResetCode,
  companyRegister,
  forgetSendEmail,
  registerVerify,
  resendCode,
  userRegister,
} from '../../services/auth';
import {login} from '../../store/actions/actions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import InputCode from 'react-native-input-code';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../components/CustomIcon';
import ActivityView from '../../components/ActivityLoader';
import Http from '../../utils/Http';
import {configureNotifcaiton} from '../../helpers/notification';

export default function ForgetCodeScreen(props) {
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);
  const stateLanguage = useSelector((state) => state.LanguageReducer);

  const dispatch = useDispatch();
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);
    });
  }, []);
  const {
    container,
    loginText,

    beforeFooter,
    footer,
    footerText,
    imageBackground,
    verificationBox,
    letterView,
  } = styles;
  let erro = stateLanguage.translations.error ?? 'error';
  let code_not_match =
    stateLanguage.translations.code_not_match ?? 'code_not_match';

  const handleRegister = async (code) => {
    setLoader(true);

    try {
      const {data} = await checkResetCode(
        props.route.params.params.email,
        code,
      );
      props.navigation.navigate('PasswordUpdateScreen', {
        params: {email: props.route.params.params.email, code: code},
      });
      setLoader(false);
    } catch (e) {
      Alert.alert(erro, code_not_match);
      setLoader(false);
    }
  };
  const resendCode_ = async () => {
    try {
      const {data} = await forgetSendEmail(props.route.params.params.email);
    } catch (e) {}
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        {loader && <ActivityView />}
        <ImageBackground
          style={imageBackground}
          imageStyle={{opacity: 0.5}}
          source={require('./icons/backregister.png')}>
          <View style={beforeFooter}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={
                Platform.OS === 'ios'
                  ? heightPercentageToDP('6%')
                  : heightPercentageToDP('13%')
              }
              behavior={Platform.OS === 'ios' ? 'position' : 'position'}
              style={{width: widthPercentageToDP('100%')}}
              enabled={true}>
              <View style={verificationBox}>
                <View style={letterView}>
                  <CustomIcon
                    size={normalize(30)}
                    name={'letter'}
                    style={{color: 'white'}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: normalize(20),
                    marginBottom: heightPercentageToDP('1%'),
                    bottom: heightPercentageToDP('2%'),
                  }}>
                  {stateLanguage.translations.we_sent_you_email ??
                    'we_sent_you_email'}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: normalize(18),
                    width: widthPercentageToDP('60%'),
                  }}>
                  {stateLanguage.translations.check_inbox ?? 'check_inbox'}
                </Text>
              </View>
              <View
                style={{
                  width: wp('95%'),
                  marginTop: heightPercentageToDP('10%'),
                  marginLeft: wp('2.5%'),
                }}>
                <InputCode
                  length={6}
                  onFullFill={(code) => handleRegister(code)}
                  codeContainerStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    width: widthPercentageToDP('10%'),
                  }}
                  codeContainerCaretStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    borderBottomColor: '#F8C440',
                    width: widthPercentageToDP('10%'),
                  }}
                  codeTextStyle={{
                    color: '#F8C440',
                    fontSize: normalize(25),
                  }}
                  autoFocus
                />
                <TouchableOpacity onPress={() => resendCode_()}>
                  <Text
                    style={[
                      footerText,
                      {
                        alignSelf: 'center',
                        marginTop: heightPercentageToDP('3%'),
                        fontSize: normalize(14),
                      },
                    ]}>
                    {stateLanguage.translations.not_get_code ?? 'not_get_code'}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignInScreen')}
            style={footer}>
            <Text style={footerText}>
              {stateLanguage.translations.already_have_account ??
                'already_have_account'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
