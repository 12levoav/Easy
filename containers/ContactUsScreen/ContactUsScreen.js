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
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import {
  changePassword,
  contact,
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
export default function ContactUs(props) {
  const state = useSelector((state) => state.AuthReducer);
  const [phone, setPhone] = useState(
    state.user.phone === null ? '' : state.user.phone,
  );
  const [first_name, setFirstName] = useState(
    state.user.first_name === 'Name' ? '' : state.user.first_name,
  );
  const [last_name, setLastName] = useState(
    state.user.last_name === 'Surname' ? '' : state.user.last_name,
  );
  const [message, setMessage] = useState('');
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
    imageBackground,
    imageBackgroundView,
    mainContainer,
  } = styles;

  let erro = stateLanguage.translations.error ?? 'Error';
  let success = stateLanguage.translations.Success ?? 'Success';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';

  let fill_all = stateLanguage.translations.fill_all ?? 'fill_all';
  let message_success =
    stateLanguage.translations.message_success ?? 'message_success';

  const sendEmail = async () => {
    setBearerToken(state.token);
    setLoader(true);
    if (
      first_name !== '' &&
      last_name !== '' &&
      phone !== '' &&
      message !== ''
    ) {
      try {
        const {data} = await contact(first_name, last_name, phone, message);
        Alert.alert(success, message_success);

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
      setLoader(false);

      Alert.alert(erro, fill_all);
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
                {stateLanguage.translations.ContactUs ?? 'ContactUs'}
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
                      stateLanguage.translations.first_name ?? 'first_name'
                    }
                    placeholder={
                      stateLanguage.translations.Enter_Name ?? 'Enter_Name'
                    }
                    value={first_name}
                    onChange={(text) => setFirstName(text)}
                  />
                  <JetInput
                    place={stateLanguage.translations.last_name ?? 'last_name'}
                    placeholder={
                      stateLanguage.translations.Enter_last_name ??
                      'Enter_last_name'
                    }
                    value={last_name}
                    onChange={(text) => setLastName(text)}
                  />
                  <JetInput
                    place={stateLanguage.translations.Phone ?? 'Phone'}
                    placeholder={
                      stateLanguage.translations.Enter_Phone ?? 'Enter_Phone'
                    }
                    value={phone}
                    keyboardType={'numeric'}
                    onChange={(text) => setPhone(text)}
                    styleContainter={{marginBottom: heightPercentageToDP('2%')}}
                  />
                  <JetInput
                    place={stateLanguage.translations.Message ?? 'Message'}
                    placeholder={
                      stateLanguage.translations.Enter_Message ??
                      'Enter_Message'
                    }
                    value={message}
                    onChange={(text) => setMessage(text)}
                    input={{
                      height: heightPercentageToDP('15%'),
                    }}
                    style={{
                      height: heightPercentageToDP('14%'),
                      width: wp('73%'),
                      marginLeft: wp('3%'),
                      fontSize: normalize(16),
                    }}
                    styleContainter={{
                      height: heightPercentageToDP('15%'),
                    }}
                    label={{bottom: heightPercentageToDP('16')}}
                    multiline={true}
                    icon={'no'}
                  />

                  <TouchableOpacity
                    onPress={() => sendEmail()}
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
                      {stateLanguage.translations.Send_Email ?? 'Send_Email'}
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
