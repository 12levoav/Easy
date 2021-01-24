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
} from 'react-native';

import {useState} from 'react';
import styles from './styles';

import Input from '../../components/InputComponent';

import {forgetSendEmail} from '../../services/auth';
import ActivityView from '../../components/ActivityLoader';
import {useDispatch, useSelector} from 'react-redux';
import {configureNotifcaiton} from '../../helpers/notification';
export default function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch,props);


    });
  }, []);
  const {
    container,
    loginText,
    loginButton,
    loginButtonText,
    beforeFooter,
    footer,
    footerText,
    imageBackground,
  } = styles;
  let erro = stateLanguage.translations.error ?? 'error';
  let pleaste_enter_email =
    stateLanguage.translations.pleaste_enter_email ?? 'pleaste_enter_email';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';

  const check = async () => {
    setLoader(true);

    if (email !== '') {
      try {
        const {data} = await forgetSendEmail(email);
        props.navigation.navigate('ForgetCodeScreen', {
          params: {email: email},
        });
        setLoader(false);
      } catch (e) {
        if (e.response.data.hasOwnProperty('error')) {
          Alert.alert(erro, something_wrong);
        }
        let error = '';
        for (let key in e.response.data.errors) {
          error = error + e.response.data.errors[key][0] + '\n';
        }
        Alert.alert(erro, error);
        setLoader(false);
      }
    } else {
      Alert.alert(erro, pleaste_enter_email);
      setLoader(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        {loader && <ActivityView />}
        <ImageBackground
          style={imageBackground}
          imageStyle={{opacity: 0.5}}
          source={require('./icons/background.png')}>
          <View style={beforeFooter}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={20}
              behavior={'position'}
              enabled={true}>
              <Text style={loginText}>
                {stateLanguage.translations.please_enter_email_for_code ??
                  'please_enter_email_for_code'}
              </Text>

              <Input
                place={stateLanguage.translations.Email ?? 'Email'}
                placeholder={
                  stateLanguage.translations.Enter_Email ?? 'Enter_Email'
                }
                value={email}
                onChange={(text) => setEmail(text)}
              />

              <TouchableOpacity onPress={() => check()} style={loginButton}>
                <Text style={loginButtonText}>
                  {stateLanguage.translations.Send_Email ?? 'Send_Email'}
                </Text>
              </TouchableOpacity>
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
