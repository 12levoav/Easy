import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import CustomIcon from '../../components/CustomIcon';
import {aspectRatio, normalize, setBearerToken} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {getNotifications} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActivityView from '../../components/ActivityLoader';
import moment from 'moment';
import {configureNotifcaiton} from '../../helpers/notification';
var PushNotification = require('react-native-push-notification');
export default function NotificationsScreen(props) {
  const state = useSelector((state) => state.AuthReducer);
  const stateCurrency = useSelector((state) => state.CurrencyReducer);
  const [payments, setPayments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);
      PushNotification.setApplicationIconBadgeNumber(0);

      setBearerToken(state.token);
      try {
        const {data} = await getNotifications();
        setPayments(data.user.app_notifications);
        setLoader(false);
      } catch (e) {}
    });
  }, []);

  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
    jetStyle,
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
              {stateLanguage.translations.Notifications ?? 'Notifications'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={mainContainer}>
        {payments.length == 0 && loader === false && (
          <Text
            style={{
              fontSize: normalize(22),
              marginTop: heightPercentageToDP('6%'),
            }}>
            {stateLanguage.translations.no_notifications ?? 'no_notifications'}
          </Text>
        )}
        <View
          style={{
            marginTop: heightPercentageToDP('4%'),
            height:heightPercentageToDP('62%'),
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: heightPercentageToDP('1%'),
            }}>
            {payments.map((data, index) => {
              return (
                <TouchableOpacity activeOpacity={1} style={jetStyle}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginRight: widthPercentageToDP('6%'),
                      marginLeft: widthPercentageToDP('6%'),
                      justifyContent: 'space-between',
                      height: heightPercentageToDP('16%'),
                      paddingVertical: heightPercentageToDP('0.88%'),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(22),
                        fontWeight: 'bold',
                      }}>
                      {data.content}
                    </Text>
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
