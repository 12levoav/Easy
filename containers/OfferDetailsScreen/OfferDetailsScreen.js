import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import {addComma, normalize, setBearerToken} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import ActivityView from '../../components/ActivityLoader';
import RequestDetailRow from '../../components/RequestDetailRowComponent';
import style from '../../components/InputComponent/styles';
import JetInput from '../../components/JetInputComponent';
import SelectPicker from '../../components/SelecterComponent';
import {
  deleteCompanyOffer,
  getCompanyRequests,
  makeOffer,
} from '../../services/auth';
import moment from 'moment';
import {configureNotifcaiton} from '../../helpers/notification';
export default function OfferDetailsScreen(props) {
  const state = useSelector((state) => state.AuthReducer);
  const stateCurrency = useSelector((state) => state.CurrencyReducer);
  const [price, setPrice] = useState(0);
  const [jet, setJet] = useState(null);
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);
    });
  }, []);
  const deleteOffer = async () => {
    setLoader(true);
    setBearerToken(state.token);
    try {
      const {data} = await deleteCompanyOffer(
        props.route.params.params.data.id,
      );
      props.navigation.goBack();
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };
  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
    bigContainer,
  } = styles;
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
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              position: 'absolute',
              left: widthPercentageToDP('8%'),
              bottom: heightPercentageToDP('10%'),
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
              {stateLanguage.translations.Offers_Detail ?? 'Offers_Detail'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={mainContainer}>
        <View
          style={[
            bigContainer,
            {
              height:
                props.route.params.params.data.status === 'offered'
                  ? heightPercentageToDP('50%')
                  : Platform.OS == 'android'
                  ? heightPercentageToDP('65%')
                  : heightPercentageToDP('67%'),
            },
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <RequestDetailRow
                title={stateLanguage.translations.first_name ?? 'first_name'}
                value={props.route.params.params.data.request.user.first_name}
              />
              <RequestDetailRow
                title={stateLanguage.translations.last_name ?? 'last_name'}
                value={props.route.params.params.data.request.user.last_name}
              />
              <RequestDetailRow
                title={stateLanguage.translations.Total_Price ?? 'Total_Price'}
                value={
                  stateCurrency.currency_sign +
                  ' ' +
                  addComma(
                    Math.round(
                      stateCurrency.currency_value *
                        (state.user.role === 'user'
                          ? props.route.params.params.data.commission_price
                          : props.route.params.params.data.total_price) *
                        10,
                    ) / 10,
                  )
                }
              />
              <RequestDetailRow
                title={stateLanguage.translations.Type ?? 'Type'}
                value={
                  props.route.params.params.data.request.trip_type === 'one_way'
                    ? stateLanguage.translations.One_Way ?? 'One_Way'
                    : stateLanguage.translations.Round_Trip ?? 'Round_Trip'
                }
              />
              <RequestDetailRow
                title={
                  stateLanguage.translations.Passengers_Number ??
                  'Passengers_Number'
                }
                value={props.route.params.params.data.request.passengers}
              />
              <RequestDetailRow
                textStyle={{width: widthPercentageToDP('40%')}}
                title={stateLanguage.translations.Destination ?? 'Destination'}
                value={
                  props.route.params.params.data.request.airport_from.data
                    .name +
                  ' - ' +
                  props.route.params.params.data.request.airport_to.data.name
                }
              />
              <RequestDetailRow
                title={stateLanguage.translations.Date ?? 'Date'}
                textStyle={{width: widthPercentageToDP('40%')}}
                value={
                  props.route.params.params.data.return_date !== null
                    ? moment(props.route.params.params.data.book_date).format(
                        'DD-MM-YYYY HH:mm',
                      ) +
                      ' - ' +
                      moment(props.route.params.params.data.return_date).format(
                        'DD-MM-YYYY HH:mm',
                      )
                    : moment(props.route.params.params.data.book_date).format(
                        'DD-MM-YYYY HH:mm',
                      )
                }
              />
              <RequestDetailRow
                title={stateLanguage.translations.Status ?? 'Status'}
                value={
                  props.route.params.params.data.status == 'pending'
                    ? stateLanguage.translations.Pending ?? 'Pending'
                    : stateLanguage.translations.Answered ?? 'Answered'
                }
                textStyle={{
                  color:
                    props.route.params.params.data.status == 'pending'
                      ? '#F8C440'
                      : 'green',
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    stateLanguage.translations.attention ?? 'attention',
                    stateLanguage.translations.really_delete_offer ??
                      'really_delete_offer',
                    [
                      {
                        text: stateLanguage.translations.Delete ?? 'Delete',
                        onPress: () => deleteOffer(),
                      },
                      {
                        text: stateLanguage.translations.Cancel ?? 'Cancel',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: true},
                  )
                }
                style={{
                  backgroundColor: 'red',
                  width: widthPercentageToDP('35%'),
                  height: heightPercentageToDP('7%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: normalize(6),
                  marginTop: heightPercentageToDP('2%'),
                  marginBottom: heightPercentageToDP('2%'),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: normalize(16),
                    textAlign: 'center',
                  }}>
                  {stateLanguage.translations.Delete_Offer ?? 'Delete_Offer'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
