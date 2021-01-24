import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import Dialog from 'react-native-dialog';

import {addComma, normalize, setBearerToken} from '../../helpers/helper';
import {
  cancelBooking,
  changeBookingStatus,
  getCompanyBookings,
  getJets,
  getUserBookings,
} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/CustomIcon';
import ActivityView from '../../components/ActivityLoader';
import moment from 'moment';
import {configureNotifcaiton} from '../../helpers/notification';
export default function MyBookingsScreen(props) {
  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
    shadowBox,
    buttonStyleSmall,
    buttonsContainer,
    buttonStyle,
  } = styles;
  const state = useSelector((state) => state.AuthReducer);
  const stateCurrency = useSelector((state) => state.CurrencyReducer);
  const [page, setPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dialogVisible, setDialog] = useState(false);
  const [button, setButton] = useState(true);
  const [booking, setBooking] = useState(null);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);

      setBearerToken(state.token);

      setPage(1);
      if (state.user.role === 'user') {
        const {data} = await getUserBookings(1);
        setBookings(data.bookings.data);
      } else {
        const {data} = await getCompanyBookings(1);
        setBookings(data.bookings.data);
      }
      setLoader(false);
    });
  }, []);
  const handleCancel = () => {
    setDialog(false);
    setTotalPrice(0);
    setBooking(null);
  };
  let erro = stateLanguage.translations.error ?? 'error';
  let something_wrong =
    stateLanguage.translations.something_wrong ?? 'something_wrong';
  let valid_total =
    stateLanguage.translations.enter_valid_total ?? 'enter_valid_total';
  let success = stateLanguage.translations.Success ?? 'Success';

  const handleSubmit = async () => {
    setLoader(true);

    if (
      totalPrice !== '' &&
      totalPrice !== 0 &&
      totalPrice !== '0' &&
      totalPrice.length < 7
    ) {
      setDialog(false);
      try {
        await acceptBooking(booking);
        console.log('no here');

        setTotalPrice(0);
        setBooking(null);
        setLoader(false);
      } catch (e) {
        console.log('here');
        setTotalPrice(0);
        setBooking(null);
        setLoader(false);
      }
    } else {
      Alert.alert(erro, valid_total);
      setDialog(false);
      setTotalPrice(0);
      setBooking(null);
      setLoader(false);
    }
  };
  const pageHandler = async () => {
    setLoader(true);
    setPage(page + 1);
    if (state.user.role === 'user') {
      const {data} = await getUserBookings(page + 1);
      setBookings(bookings.concat(data.bookings.data));
    } else {
      const {data} = await getCompanyBookings(page + 1);
      setBookings(bookings.concat(data.bookings.data));
    }
    setLoader(false);
  };
  const declineBooking = async (id) => {
    setLoader(true);

    try {
      const {data: dataTest} = await changeBookingStatus(id, 'declined', 1);
      const {data} = await getCompanyBookings(1);
      setBookings(data.bookings.data);
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
  };
  const cancelBookingHandler = async (id, user_id) => {
    setLoader(true);

    try {
      const {data: dataTest} = await cancelBooking(id, user_id);
      const {data} = await getUserBookings(1);
      setBookings(data.bookings.data);
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
  };
  const acceptBooking = async (id) => {
    setLoader(true);

    try {
      const {data: dataTest} = await changeBookingStatus(
        id,
        'accepted',
        totalPrice,
      );
      const {data} = await getCompanyBookings(1);
      setBookings(data.bookings.data);
      Alert.alert(success);

      // setLoader(false);
    } catch (e) {
      if (e.response.data.hasOwnProperty('error')) {
        Alert.alert(erro, e.response.data.error);
      } else {
        let error = '';
        for (let key in e.response.data.errors) {
          error = error + e.response.data.errors[key][0] + '\n';
        }
        Alert.alert(erro, error);
      }
      // setLoader(false);
    }
  };
  return (
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
              bottom: heightPercentageToDP('10%'),
            }}
            onPress={() => props.navigation.navigate('NotificationsScreen')}>
            <Ionicons
              name={'ios-notifications'}
              color={'white'}
              size={normalize(30)}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={mainContainer}>
        <View
          style={{
            marginTop: heightPercentageToDP('1%'),
            height:
              Platform.OS == 'android'
                ? heightPercentageToDP('65%')
                : heightPercentageToDP('68%'),
          }}>
          {bookings.length == 0 && loader === false && (
            <Text
              style={{
                fontSize: normalize(22),
                marginTop: heightPercentageToDP('6%'),
              }}>
              {stateLanguage.translations.no_bookings ?? 'no_bookings'}
            </Text>
          )}
          <ScrollView
            onMomentumScrollEnd={() => pageHandler()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: heightPercentageToDP('1%'),
            }}>
            {bookings.map((data, index) => {
              let status = '';
              if (data.status == 'accepted') {
                status = stateLanguage.translations.Accepted ?? 'Accepted';
              } else if (data.status == 'declined') {
                status = stateLanguage.translations.Declined ?? 'Declined';
              } else if (data.status == 'pending') {
                status = stateLanguage.translations.Pending ?? 'Pending';
              } else if (data.status == 'canceled') {
                status = stateLanguage.translations.Cancelled ?? 'Cancelled';
              } else {
                status = stateLanguage.translations.Paid ?? 'Paid';
              }
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: widthPercentageToDP('90%'),
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: widthPercentageToDP('81%'),
                      height: heightPercentageToDP('17%'),
                      marginTop: heightPercentageToDP('5%'),
                    }}
                    source={{
                      uri: 'https://easycharter24.com/' + data.jet.image,
                    }}
                  />
                  <View
                    style={[
                      shadowBox,
                      {
                        height:
                          state.user.role === 'user'
                            ? data.status == 'declined' ||
                              data.status == 'paid' ||
                              data.status == 'canceled'
                              ? heightPercentageToDP('40%')
                              : heightPercentageToDP('47%')
                            : data.status == 'declined' ||
                              data.status == 'accepted' ||
                              data.status == 'canceled'
                            ? heightPercentageToDP('40%')
                            : heightPercentageToDP('50%'),
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(20),
                          fontWeight: 'bold',
                          marginLeft: widthPercentageToDP('5%'),
                          marginTop: heightPercentageToDP('2%'),
                        }}>
                        {data.jet.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {(data.status == 'accepted' ||
                          data.status == 'paid') && (
                          <CustomIcon
                            size={normalize(16)}
                            name={'right'}
                            style={{
                              color:
                                data.status == 'accepted' ||
                                data.status == 'paid'
                                  ? 'green'
                                  : data.status == 'pending'
                                  ? '#F8C440'
                                  : data.status == 'canceled' ||
                                    data.status == 'declined'
                                  ? 'red'
                                  : 'blue',
                              marginRight: widthPercentageToDP('3%'),
                            }}
                          />
                        )}
                        {data.status == 'declined' && (
                          <AntDesign
                            size={normalize(16)}
                            name={'closecircleo'}
                            style={{
                              color:
                                data.status == 'accepted' ||
                                data.status == 'paid'
                                  ? 'green'
                                  : data.status == 'pending'
                                  ? '#F8C440'
                                  : data.status == 'canceled' ||
                                    data.status == 'declined'
                                  ? 'red'
                                  : 'blue',
                              marginRight: widthPercentageToDP('3%'),
                            }}
                          />
                        )}
                        {data.status == 'canceled' && (
                          <AntDesign
                            size={normalize(16)}
                            name={'closecircleo'}
                            style={{
                              color: 'red',
                              marginRight: widthPercentageToDP('3%'),
                            }}
                          />
                        )}
                        {data.status == 'pending' && (
                          <MaterialCommunityIcons
                            size={normalize(20)}
                            name={'timer-sand'}
                            style={{
                              color: '#F8C440',
                              marginRight: widthPercentageToDP('3%'),
                            }}
                          />
                        )}
                        <Text
                          style={{
                            fontSize: normalize(16),
                            marginRight: widthPercentageToDP('3%'),
                            color:
                              data.status == 'accepted' || data.status == 'paid'
                                ? 'green'
                                : data.status == 'pending'
                                ? '#F8C440'
                                : data.status == 'canceled' ||
                                  data.status == 'declined'
                                ? 'red'
                                : 'blue',
                          }}>
                          {status}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: widthPercentageToDP('2%'),
                        marginTop: heightPercentageToDP('2%'),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: heightPercentageToDP('1%'),
                          width: widthPercentageToDP('80%'),
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(16),
                            marginLeft: widthPercentageToDP('2%'),
                          }}>
                          {stateLanguage.translations.Trip_Type ?? 'Trip_Type'}
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(16),
                            marginLeft: widthPercentageToDP('2%'),
                            textAlign: 'right',
                          }}>
                          {data.trip_type == 'one_way'
                            ? stateLanguage.translations.One_Way ?? 'One_Way'
                            : stateLanguage.translations.Round_Trip ??
                              'Round_Trip'}
                        </Text>
                      </View>
                      {data.total_price !== null && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: heightPercentageToDP('1%'),
                            width: widthPercentageToDP('80%'),
                          }}>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                            }}>
                            {stateLanguage.translations.Price ?? 'Price'}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                              textAlign: 'right',
                              color: 'black',
                            }}>
                            {stateCurrency.currency_sign}{' '}
                            {addComma(
                              Math.round(
                                stateCurrency.currency_value *
                                  (state.user.role === 'user'
                                    ? data.commission_price
                                    : data.total_price) *
                                  10,
                              ) / 10,
                            )}
                          </Text>
                        </View>
                      )}
                      {data.trip_type == 'one_way' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: heightPercentageToDP('1%'),
                            width: widthPercentageToDP('80%'),
                          }}>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                            }}>
                            {stateLanguage.translations.Date ?? 'Date'}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                              textAlign: 'right',
                            }}>
                            {moment(data.book_date).format('DD-MM-YYYY HH:mm')}
                          </Text>
                        </View>
                      )}
                      {data.trip_type !== 'one_way' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: heightPercentageToDP('1%'),
                            width: widthPercentageToDP('80%'),
                          }}>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                            }}>
                            {stateLanguage.translations.Dates ?? 'Dates'}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(16),
                              marginLeft: widthPercentageToDP('2%'),
                              textAlign: 'right',
                              width: widthPercentageToDP('45%'),
                            }}>
                            {moment(data.book_date).format('DD-MM-YYYY HH:mm')}{' '}
                            -{' '}
                            {moment(data.return_date).format(
                              'DD-MM-YYYY HH:mm',
                            )}
                          </Text>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: heightPercentageToDP('1%'),
                          width: widthPercentageToDP('80%'),
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(16),
                            marginLeft: widthPercentageToDP('2%'),
                          }}>
                          {stateLanguage.translations.Destination ??
                            'Destination'}
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(16),
                            marginLeft: widthPercentageToDP('2%'),
                            textAlign: 'right',
                            width: widthPercentageToDP('40%'),
                          }}>
                          {data.airport_from.data.name} -{' '}
                          {data.airport_to.data.name}
                        </Text>
                      </View>
                    </View>
                    {state.user.role === 'user' && data.status == 'accepted' && (
                      <View style={buttonsContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              stateLanguage.translations.attention ??
                                'attention',
                              stateLanguage.translations
                                .really_cancel_booking ??
                                'really_cancel_booking',
                              [
                                {
                                  text: stateLanguage.translations.yes ?? 'yes',
                                  onPress: () =>
                                    cancelBookingHandler(
                                      data.id,
                                      data.jet.user_id,
                                    ),
                                },
                                {
                                  text:
                                    stateLanguage.translations.Cancel ??
                                    'Cancel',
                                  style: 'cancel',
                                },
                              ],
                              {cancelable: true},
                            )
                          }
                          style={[
                            buttonStyleSmall,
                            {backgroundColor: '#D9D7D0'},
                          ]}>
                          <Text
                            style={{fontSize: normalize(18), color: 'white'}}>
                            {stateLanguage.translations.Cancel ?? 'Cancel'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('AddPassengersScreen', {
                              params: {data: data},
                            })
                          }
                          style={buttonStyleSmall}>
                          <Text
                            style={{fontSize: normalize(18), color: 'white'}}>
                            {stateLanguage.translations.Proceed ?? 'Proceed'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {state.user.role === 'user' && data.status == 'pending' && (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            stateLanguage.translations.attention ?? 'attention',
                            stateLanguage.translations.really_cancel_booking ??
                              'really_cancel_booking',
                            [
                              {
                                text: stateLanguage.translations.yes ?? 'yes',
                                onPress: () =>
                                  cancelBookingHandler(data.id, null),
                              },
                              {
                                text:
                                  stateLanguage.translations.Cancel ?? 'Cancel',
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                          )
                        }
                        style={[buttonStyle, {backgroundColor: '#D9D7D0'}]}>
                        <Text style={{fontSize: normalize(18), color: 'white'}}>
                          {stateLanguage.translations.Cancel ?? 'Cancel'}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Dialog.Container visible={dialogVisible}>
                      {loader && <ActivityView />}
                      <Dialog.Title>
                        {stateLanguage.translations.attention ?? 'attention'}
                      </Dialog.Title>
                      <Dialog.Description>
                        {stateLanguage.translations.set_total_price ??
                          'set_total_price'}
                      </Dialog.Description>
                      <Dialog.Input
                        wrapperStyle={{
                          borderWidth: 1,
                          borderColor: 'grey',
                          borderRadius: normalize(4),
                        }}
                        keyboardType={'numeric'}
                        style={{color: 'black'}}
                        value={totalPrice}
                        onChangeText={(text) => {
                          setTotalPrice(text);
                        }}
                      />
                      <Dialog.Button
                        label={stateLanguage.translations.Cancel ?? 'Cancel'}
                        onPress={handleCancel}
                      />
                      <Dialog.Button
                        label={stateLanguage.translations.Submit ?? 'Submit'}
                        onPress={handleSubmit}
                      />
                    </Dialog.Container>
                    {state.user.role !== 'user' && data.status == 'pending' && (
                      <View style={buttonsContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              stateLanguage.translations.attention ??
                                'attention',
                              stateLanguage.translations
                                .really_decline_booking ??
                                'really_decline_booking',
                              [
                                {
                                  text:
                                    stateLanguage.translations.Decline ??
                                    'Decline',
                                  onPress: () => declineBooking(data.id),
                                },
                                {
                                  text:
                                    stateLanguage.translations.Cancel ??
                                    'Cancel',
                                  style: 'cancel',
                                },
                              ],
                              {cancelable: true},
                            )
                          }
                          style={[
                            buttonStyleSmall,
                            {backgroundColor: '#D9D7D0'},
                          ]}>
                          <Text
                            style={{fontSize: normalize(18), color: 'white'}}>
                            {stateLanguage.translations.Decline ?? 'Decline'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setDialog(true), setBooking(data.id);
                          }}
                          style={buttonStyleSmall}>
                          <Text
                            style={{fontSize: normalize(18), color: 'white'}}>
                            {stateLanguage.translations.Set_Price ??
                              'Set_Price'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
