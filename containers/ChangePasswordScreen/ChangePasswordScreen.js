import * as React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import CustomIcon from '../../components/CustomIcon';
import moment from 'moment';
import {
  handleChoosePhoto,
  imageUpload,
  normalize,
  setBearerToken,
} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import {
  changePassword,
  createJet,
  getJets,
  getTopJets,
  updateUser,
} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/InputComponent';
import JetInput from '../../components/JetInputComponent';
import ActivityView from '../../components/ActivityLoader';
import DatePickerComp from '../../components/DatePickerComponent';
import SelectPicker from '../../components/SelecterComponent';
import {login} from '../../store/actions/actions';
import {configureNotifcaiton} from '../../helpers/notification';
export default function ChangePassword(props) {
  const state = useSelector((state) => state.AuthReducer);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
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
    imageBackground,
    imageBackgroundView,
    mainContainer,
  } = styles;

  let error = stateLanguage.translations.error ?? 'Error';
  let enter_old_password =
    stateLanguage.translations.Enter_Old_Password ?? 'Enter_Old_Password';
  let passwords_not_match =
    stateLanguage.translations.passwords_not_match ?? 'passwords_not_match';
  let success = stateLanguage.translations.Success ?? 'Success';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';
  let password_changed_successfully =
    stateLanguage.translations.password_changed_successfully ??
    'password_changed_successfully';

  const handlechangePassword = async () => {
    setLoader(true);
    setBearerToken(state.token);
    if (oldPassword == '') {
      Alert.alert(error, enter_old_password);
      setLoader(false);
    } else if (
      password !== confirmPassword ||
      password == '' ||
      confirmPassword == ''
    ) {
      Alert.alert(error, passwords_not_match);
      setLoader(false);
    } else if (
      password === confirmPassword &&
      oldPassword !== '' &&
      password !== ''
    ) {
      try {
        const {data} = await changePassword(oldPassword, password);
        Alert.alert(success, password_changed_successfully);
        props.navigation.navigate('SettingsScreen');
        setLoader(false);
      } catch (e) {
        if (e.response.data.hasOwnProperty('error')) {
          Alert.alert(error, something_wrong);
        }
        let error = '';
        for (let key in e.response.data.errors) {
          error = error + e.response.data.errors[key][0] + '\n';
        }
        Alert.alert(error, error);
        setLoader(false);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        {loader && <ActivityView />}

        <View style={imageBackgroundView}>
          <ImageBackground
            resizeMode={'stretch'}
            style={imageBackground}
            imageStyle={{opacity: 0.5}}
            source={require('./icons/search.png')}>
            <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: widthPercentageToDP('4%'),
                  bottom: heightPercentageToDP('4%'),
                }}
                onPress={() => props.navigation.navigate('NotificationsScreen')}>
              <Ionicons

                  name={'ios-notifications'}
                  color={'white'}
                  size={normalize(30)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                position: 'absolute',
                left: widthPercentageToDP('8%'),
                bottom: heightPercentageToDP('4%'),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name={'ios-arrow-back'}
                color={'white'}
                size={normalize(36)}
              />
              <Text
                style={{
                  marginLeft: widthPercentageToDP('3%'),
                  color: 'white',
                  fontSize: normalize(18),
                }}>
                {stateLanguage.translations.Change_Password ??
                  'Change_Password'}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={mainContainer}>
          <View style={{marginTop: heightPercentageToDP('3%')}}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={
                Platform.OS === 'ios'
                  ? heightPercentageToDP('14%')
                  : -heightPercentageToDP('13%')
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
              enabled={true}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                horziontalScroll={false}
                contentContainerStyle={{
                  paddingBottom: heightPercentageToDP('3%'),
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <JetInput
                    place={
                      stateLanguage.translations.Old_Password ?? 'Old_Password'
                    }
                    placeholder={
                      stateLanguage.translations.Enter_password ??
                      'Enter_password'
                    }
                    value={oldPassword}
                    onChange={(text) => setOldPassword(text)}
                    secureTextEntry={true}
                  />
                  <JetInput
                    place={
                      stateLanguage.translations.New_Password ?? 'New_Password'
                    }
                    placeholder={
                      stateLanguage.translations.Enter_password ??
                      'Enter_password'
                    }
                    value={password}
                    onChange={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                  <JetInput
                    place={
                      stateLanguage.translations.ReEnterPassword ??
                      'ReEnterPassword'
                    }
                    placeholder={
                      stateLanguage.translations.Enter_password ??
                      'Enter_password'
                    }
                    value={confirmPassword}
                    onChange={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                  />
                  <TouchableOpacity
                    onPress={() => handlechangePassword()}
                    style={{
                      width: widthPercentageToDP('76%'),
                      height: heightPercentageToDP('7%'),
                      borderRadius: normalize(6),
                      backgroundColor: '#F8C440',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('4%'),
                      marginLeft: widthPercentageToDP('2%'),
                    }}>
                    <Text style={{color: 'white', fontSize: normalize(16)}}>
                      {stateLanguage.translations.Change_Password ??
                        'Change_Password'}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
