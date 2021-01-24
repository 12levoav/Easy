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

import ActivityView from '../../components/ActivityLoader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Input from '../../components/InputComponent';
import {normalize} from '../../helpers/helper';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {resetPassword} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import {configureNotifcaiton} from '../../helpers/notification';
export default function PasswordUpdateScreen(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  let success = stateLanguage.translations.Success ?? 'Success';
  let erro = stateLanguage.translations.error ?? 'error';
  let passwords_not_match =
    stateLanguage.translations.passwords_not_match ?? 'passwords_not_match';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';
  let password_changed_successfully =
    stateLanguage.translations.password_changed_successfully ??
    'password_changed_successfully';
  const change = async () => {
    setLoader(true);
    if (password === confirmPassword && password !== '') {
      try {
        const {data} = await resetPassword(
          props.route.params.params.email,
          props.route.params.params.code,
          password,
        );
        Alert.alert(success, password_changed_successfully);
        props.navigation.navigate('SignInScreen');
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
      Alert.alert(erro, passwords_not_match);
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
                {stateLanguage.translations.please_enter_new_password ??
                  'please_enter_new_password'}
              </Text>

              <Input
                place={stateLanguage.translations.Password ?? 'Password'}
                placeholder={
                  stateLanguage.translations.Enter_New_Password ??
                  'Enter_New_Password'
                }
                value={password}
                onChange={(text) => setPassword(text)}
                secureTextEntry={true}
              />

              <Input
                place={
                  stateLanguage.translations.Confirm_Password ??
                  'Confirm_Password'
                }
                placeholder={
                  stateLanguage.translations.Enter_password ?? 'Enter_password'
                }
                value={confirmPassword}
                onChange={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
              />

              <TouchableOpacity onPress={() => change()} style={loginButton}>
                <Text style={loginButtonText}>
                  {stateLanguage.translations.Change_Password ??
                    'Change_Password'}
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
