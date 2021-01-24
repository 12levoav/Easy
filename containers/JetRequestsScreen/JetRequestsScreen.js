import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
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
import {getCompanyRequests, getJets} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActivityView from '../../components/ActivityLoader';
import {configureNotifcaiton} from '../../helpers/notification';
export default function JetRequestsScreen(props) {
  const state = useSelector((state) => state.AuthReducer);
  const [requests, setRequests] = useState([]);
  const [jets, setJets] = useState([]);
  const [loader, setLoader] = useState(true);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);

      setBearerToken(state.token);
      try {
        const {data} = await getCompanyRequests();
        setRequests(data.booking_requests);
        setJets(data.company.jets);
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
        </ImageBackground>
      </View>

      <View style={mainContainer}>
        {requests.length == 0 && loader === false && (
          <Text
            style={{
              fontSize: normalize(22),
              marginTop: heightPercentageToDP('6%'),
            }}>
            {stateLanguage.translations.no_requests ?? 'no_requests'}
          </Text>
        )}
        <View
          style={{
            marginTop: heightPercentageToDP('4%'),
            height:
              Platform.OS == 'android'
                ? heightPercentageToDP('62%')
                : heightPercentageToDP('66%'),
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: heightPercentageToDP('1%'),
            }}>
            {requests.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('RequestDetailsScreen', {
                      params: {data: data, jets: jets},
                    })
                  }
                  style={jetStyle}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginRight: widthPercentageToDP('6%'),
                      marginLeft: widthPercentageToDP('6%'),
                      justifyContent: 'space-between',
                      height: heightPercentageToDP('18%'),
                      paddingVertical: heightPercentageToDP('0.88%'),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(22),
                        fontWeight: 'bold',
                      }}>
                      {data.trip_type === 'one_way'
                        ? stateLanguage.translations.One_Way ?? 'One_Way'
                        : stateLanguage.translations.Round_Trip ?? 'Round_Trip'}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(14),
                        width:widthPercentageToDP('70%')
                      }}>
                      {stateLanguage.translations.Destination ?? 'Destination'}:{' '}
                      {data.airport_from.data.name} -{' '}
                      {data.airport_to.data.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(14),
                      }}>
                      {stateLanguage.translations.Number_of_Passengers ??
                        'Number_of_Passengers'}
                      : {data.passengers}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(14),
                      }}>
                      {stateLanguage.translations.Status ?? 'Status'}:
                      <Text
                        style={{
                          color: data.status == 'offered' ? 'green' : '#F8C440',
                          fontSize: normalize(14),
                        }}>
                        {' '}
                        {data.status == 'offered'
                          ? stateLanguage.translations.Offered ?? 'Offered'
                          : stateLanguage.translations.Waiting_for_offer ??
                            'Waiting_for_offer'}
                      </Text>
                    </Text>
                  </View>

                  <Ionicons
                    name={'ios-arrow-forward'}
                    color={'black'}
                    size={normalize(32)}
                    style={{marginRight: widthPercentageToDP('3%')}}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
