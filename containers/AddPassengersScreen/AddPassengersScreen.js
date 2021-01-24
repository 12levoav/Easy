import * as React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import CustomIcon from '../../components/CustomIcon';
import {normalize, setBearerToken} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {
  addPassengers,
  getBookingsPassengers,
  getUsersPassengers,
} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActivityView from '../../components/ActivityLoader';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import JetInput from '../../components/JetInputComponent';
import SelectPicker from '../../components/SelecterComponent';
import {configureNotifcaiton} from '../../helpers/notification';
import DatePickerCompDateOnly from '../../components/DatePickerComponentDateOnly';
export default function AddPassengersScreen(props) {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('male');
  const [passport, setPassport] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [supported_passengers, setSupportedPassengers] = useState([]);
  const [selected_passenger, setSelectedPassenger] = useState(null);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
    addJetView,
    addContainer,
    addText,
    jetStyle,
  } = styles;
  let error = stateLanguage.translations.error ?? 'Error';
  let passengers_exceed =
    stateLanguage.translations.passengers_exceed ?? 'passengers_exceed';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';
  let at_least_one_passenger =
    stateLanguage.translations.at_least_one_passenger ??
    'at_least_one_passenger';
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      let arr = [];
      configureNotifcaiton(dispatch, props);
      try {
        const {data: bookingsPassengers} = await getBookingsPassengers(
          props.route.params.params.data.booking_token,
        );
        const {data: usersPassengers} = await getUsersPassengers(
          props.route.params.params.data.booking_token,
        );

        usersPassengers.passengers.map((dat, ind) => {
          let obj = {
            label: dat.first_name + ' ' + dat.last_name,
            value: dat,
          };
          arr.push(obj);
        });
        setSupportedPassengers(arr);
        setPassengers(bookingsPassengers.passengers);
        console.log('bookings', bookingsPassengers);
        console.log('users', usersPassengers);
      } catch (e) {}
    });
  }, []);
  const addPassenger = async () => {
    if (name !== '' && surname !== '' && date !== '' && passport !== '') {
      let passenger = {
        first_name: name,
        last_name: surname,
        gender: gender,
        birthday: date,
        passport: passport,
      };
      let arr = passengers;

      arr.push(passenger);
      setPassengers(arr);
      setName('');
      setSurname('');
      setPassport('');
      setGender('male');
      setDate('');
      setModal(false);
      passenger = {};
    } else {
      let fill_all = stateLanguage.translations.fill_all ?? 'fill_all';

      Alert.alert(error, fill_all);
    }
  };
  const procceed = async () => {
    setLoader(true);
    if (passengers.length !== 0) {
      try {
        const {data} = await addPassengers(
          JSON.stringify(passengers),
          props.route.params.params.data.booking_token,
        );
        props.navigation.navigate('PrePaymentScreen', {
          params: {
            data: props.route.params.params.data,
            passengers: passengers,
          },
        });
        setLoader(false);
      } catch (e) {
        Alert.alert(error, something_wrong);
        setLoader(false);
      }
    } else {
      Alert.alert(error, at_least_one_passenger);
      setLoader(false);
    }
  };
  let attention = stateLanguage.translations.attention ?? 'attention';
  let really_cancel_booking =
    stateLanguage.translations.really_cancel_booking ?? 'really_cancel_booking';
  let yes = stateLanguage.translations.yes ?? 'yes';
  let no = stateLanguage.translations.no ?? 'No';
  let placeholder = {
    label: stateLanguage.translations.add_passenger ?? 'add_passenger',
    value: null,
    color: 'black',
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
                right: widthPercentageToDP('6%'),
                bottom: heightPercentageToDP('2%'),
              }}
              onPress={() => props.navigation.navigate('NotificationsScreen')}>
              <Ionicons
                name={'ios-notifications'}
                color={'white'}
                size={normalize(30)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  attention,
                  really_cancel_booking,
                  [
                    {
                      text: yes,
                      onPress: () => props.navigation.goBack(),
                    },
                    {
                      text: no,
                      style: 'cancel',
                    },
                  ],
                  {cancelable: true},
                )
              }
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
                {stateLanguage.translations.add_passenger ?? 'add_passenger'}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={mainContainer}>
          <SelectPicker
            value={selected_passenger}
            onChange={(value) => setSelectedPassenger(value)}
            place={stateLanguage.translations.add_passenger ?? 'add_passenger'}
            placeholder={placeholder}
            items={supported_passengers}
          />
          <View style={{marginTop: heightPercentageToDP('1%')}}>
            <TouchableOpacity
              disabled={
                props.route.params.params.data.passengers === passengers.length
              }
              onPress={() => {
                console.log(
                  props.route.params.params.data.passengers,
                  passengers,
                );
                if (
                  props.route.params.params.data.passengers !==
                  passengers.length
                ) {
                  setModal(true);
                } else {
                  Alert.alert(error, passengers_exceed);
                }
              }}
              style={[
                addContainer,
                {
                  opacity:
                    props.route.params.params.data.passengers ===
                    passengers.length
                      ? 0.3
                      : 1,
                },
              ]}>
              <Text style={addText}>
                {stateLanguage.translations.add_new_passenger ??
                  'add_new_passenger'}
              </Text>
              <View style={addJetView}>
                <AntDesign name={'plus'} color={'white'} size={normalize(32)} />
              </View>
            </TouchableOpacity>
            <Modal isVisible={modal}>
              {loader && <ActivityView />}

              <View
                style={{
                  backgroundColor: 'white',
                  height: heightPercentageToDP('80%'),
                  alignItems: 'center',
                }}>
                <KeyboardAvoidingView
                  keyboardVerticalOffset={
                    Platform.OS === 'ios'
                      ? heightPercentageToDP('1%')
                      : -heightPercentageToDP('15%')
                  }
                  behavior={Platform.OS === 'ios' ? 'position' : 'position'}
                  enabled={true}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal(false);
                    }}
                    style={{
                      width: widthPercentageToDP('10%'),
                      alignSelf: 'flex-end',
                    }}>
                    <MaterialIcons name={'close'} size={normalize(48)} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: normalize(22),
                      color: 'black',
                      marginTop: heightPercentageToDP('5%'),
                      marginBottom: heightPercentageToDP('5%'),
                      textAlign: 'center',
                    }}>
                    {stateLanguage.translations.please_enter_fields ??
                      'please_enter_fields'}
                  </Text>

                  <View style={{height: heightPercentageToDP('54%')}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}>
                        <TouchableOpacity
                          style={{
                            marginTop: heightPercentageToDP('2%'),
                            marginBottom: heightPercentageToDP('3%'),
                          }}>
                          <JetInput
                            place={
                              stateLanguage.translations.first_name ??
                              'first_name'
                            }
                            placeholder={
                              stateLanguage.translations.Enter_Name ??
                              'Enter_Name'
                            }
                            value={name}
                            onChange={(text) => setName(text)}
                          />
                          <JetInput
                            place={
                              stateLanguage.translations.last_name ??
                              'last_name'
                            }
                            placeholder={
                              stateLanguage.translations.Enter_last_name ??
                              'Enter_last_name'
                            }
                            value={surname}
                            onChange={(text) => setSurname(text)}
                          />
                          <JetInput
                            place={
                              stateLanguage.translations.Passport ?? 'Passport'
                            }
                            placeholder={
                              stateLanguage.translations.Enter_passport ??
                              'Enter_passport'
                            }
                            value={passport}
                            onChange={(text) => setPassport(text)}
                          />
                          <SelectPicker
                            value={gender}
                            onChange={(value) => {
                              setGender(value), console.log(gender);
                            }}
                            place={
                              stateLanguage.translations.Gender ?? 'Gender'
                            }
                            placeholder={{}}
                            items={[
                              {
                                label:
                                  stateLanguage.translations.Male ?? 'Male',
                                value: 'male',
                              },
                              {
                                label:
                                  stateLanguage.translations.Female ?? 'Female',
                                value: 'female',
                              },
                              {
                                label:
                                  stateLanguage.translations.Other ?? 'Other',
                                value: 'other',
                              },
                            ]}
                          />
                          <DatePickerCompDateOnly
                            value={date}
                            change={(date) => setDate(date)}
                            place={
                              stateLanguage.translations.Date_of_Birthday ??
                              'Date_of_Birthday'
                            }
                          />
                          <TouchableOpacity
                            onPress={() => addPassenger()}
                            style={{
                              backgroundColor: '#F8C440',
                              width: widthPercentageToDP('42%'),
                              height: heightPercentageToDP('7%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: normalize(6),
                              marginTop: heightPercentageToDP('4%'),
                              marginLeft: widthPercentageToDP('20%'),
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: normalize(16),
                                textAlign: 'center',
                              }}>
                              {stateLanguage.translations.add_passenger ??
                                'add_passenger'}
                            </Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
            <View
              style={{
                height:
                  Platform.OS == 'android'
                    ? heightPercentageToDP('40%')
                    : heightPercentageToDP('42%'),
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: heightPercentageToDP('1%'),
                }}>
                {passengers.map((pass, inde) => {
                  return (
                    <TouchableOpacity key={inde} style={jetStyle}>
                      <View
                        style={{
                          flexDirection: 'column',
                          marginRight: widthPercentageToDP('6%'),
                          marginLeft: widthPercentageToDP('6%'),
                          justifyContent: 'space-between',
                          height: heightPercentageToDP('14%'),
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: normalize(22),
                            fontWeight: 'bold',
                          }}>
                          {pass.first_name} {pass.last_name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: normalize(14),
                          }}>
                          {stateLanguage.translations.Gender ?? 'Gender'} :{' '}
                          {pass.gender}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: normalize(14),
                          }}>
                          {stateLanguage.translations.Passport ?? 'Passport'}:{' '}
                          {pass.passport}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: normalize(14),
                          }}>
                          {stateLanguage.translations.Birthday ?? 'Birthday'}:{' '}
                          {pass.birthday}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          {props.route.params.params.data.passengers == passengers.length && (
            <TouchableOpacity
              disabled={
                props.route.params.params.data.passengers !== passengers.length
              }
              onPress={() => procceed()}
              style={{
                backgroundColor: '#F8C440',
                width: widthPercentageToDP('42%'),
                height: heightPercentageToDP('7%'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(6),
                marginTop: heightPercentageToDP('3%'),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(16),
                  textAlign: 'center',
                }}>
                {stateLanguage.translations.Proceed_To_Pay ?? 'Proceed_To_Pay'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
