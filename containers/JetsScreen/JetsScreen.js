import * as React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import {useState} from 'react';
import styles from './styles';
import CustomIcon from '../../components/CustomIcon';
import {
  addComma,
  aspectRatio,
  isCloseToBottom,
  normalize,
  setBearerToken,
} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {getJets, getTopJets} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActivityView from '../../components/ActivityLoader';
import {configureNotifcaiton} from '../../helpers/notification';
import {AirbnbRating} from 'react-native-ratings';
import {API_URL_MAIN} from '../../utils/Http';
export default function Jets(props) {
  const [jets, setJets] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [finished, setFinished] = useState(false);
  const state = useSelector((state) => state.AuthReducer);
  const stateCurrency = useSelector((state) => state.CurrencyReducer);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
    jetStyle,
    addJetView,
    addContainer,
    addText,
  } = styles;
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);
      setFinished(false);
      setBearerToken(state.token);
      setPage(1);
      const {data} = await getJets(1);

      setJets(data.jets.data);
      setLoader(false);
    });
  }, []);
  const pageHandler = async () => {
    setLoader(true);
    setFinished(true);

    setPage(page + 1);
    const {data} = await getJets(page + 1);
    if (data.jets.data.length !== 0) {
      setFinished(false);
    }
    setJets(jets.concat(data.jets.data));
    setLoader(false);
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
        <View style={{marginTop: heightPercentageToDP('1%')}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddJetScreen')}
            style={addContainer}>
            <Text style={addText}>
              {stateLanguage.translations.Add_New_Jet ?? 'Add_New_Jet'}
            </Text>
            <View style={addJetView}>
              <AntDesign name={'plus'} color={'white'} size={normalize(32)} />
            </View>
          </TouchableOpacity>
          {jets.length == 0 && loader === false && (
            <Text
              style={{
                fontSize: normalize(22),
                marginTop: heightPercentageToDP('6%'),
                textAlign: 'center',
              }}>
              {stateLanguage.translations.No_Jets ?? 'No_Jets'}
            </Text>
          )}
          <View
            style={{
              height:
                Platform.OS == 'android'
                  ? heightPercentageToDP('50%')
                  : heightPercentageToDP('55%'),
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent) && !finished) {
                  pageHandler();
                }
              }}
              scrollEventThrottle={400}
              contentContainerStyle={{
                paddingBottom: heightPercentageToDP('1%'),
              }}>
              {jets.map((data, index) => {
                return (
                  <TouchableOpacity activeOpacity={1} style={jetStyle}>
                    <Image
                      resizeMode={'stretch'}
                      style={{
                        width: widthPercentageToDP('40%'),
                        height:
                          aspectRatio > 1.8
                            ? heightPercentageToDP('25%')
                            : heightPercentageToDP('35%'),
                        borderTopLeftRadius: normalize(6),
                        borderBottomLeftRadius: normalize(6),

                        // marginTop: heightPercentageToDP('5%'),
                      }}
                      source={{
                        uri: API_URL_MAIN + data.image ?? '',
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        marginRight: widthPercentageToDP('12%'),
                        height: heightPercentageToDP('25%'),
                        paddingLeft: widthPercentageToDP('2%'),
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: normalize(20),
                          fontWeight: 'bold',
                          marginTop: heightPercentageToDP('2%'),
                          marginLeft: widthPercentageToDP('2%'),
                        }}>
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: normalize(14),
                          width: widthPercentageToDP('35%'),
                          marginTop: heightPercentageToDP('2%'),
                          marginLeft: widthPercentageToDP('2%'),
                        }}>
                        {stateLanguage.translations.Price_Per_Hour ??
                          'Price_Per_Hour'}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: normalize(14),
                          width: widthPercentageToDP('35%'),
                          marginLeft: widthPercentageToDP('2%'),
                        }}>
                        {stateCurrency.currency_sign}{' '}
                        {addComma(
                          Math.round(
                            stateCurrency.currency_value * data.price * 10,
                          ) / 10,
                        )}
                      </Text>
                      <TouchableOpacity
                        // onPress={() =>
                        //   props.navigation.navigate('CompanyJetRatingsScreen')
                        // }
                        style={{
                          width: widthPercentageToDP('30%'),
                          justifyContent: 'center',
                          marginLeft: widthPercentageToDP('4%'),
                          marginTop: heightPercentageToDP('2%'),
                        }}>
                        <AirbnbRating
                          type="star"
                          ratingCount={5}
                          size={normalize(20)}
                          showRating={false}
                          defaultRating={data.rating}
                          isDisabled={true}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop:
                            aspectRatio > 1.8
                              ? heightPercentageToDP('3%')
                              : heightPercentageToDP('1%'),
                          width: widthPercentageToDP('40%'),
                          justifyContent: 'space-between',
                          marginLeft: widthPercentageToDP('2%'),
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('EditJetScreen', {
                              params: {data: data},
                            })
                          }>
                          <Text
                            style={{color: '#F8C440', fontSize: normalize(22)}}>
                            {stateLanguage.translations.Edit ?? 'Edit'}
                          </Text>
                        </TouchableOpacity>
                        {data.reviews.length !== 0 && (
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate(
                                'CompanyJetRatingsScreen',

                                {jet: data},
                              )
                            }>
                            <Text
                              style={{
                                color: '#F8C440',
                                fontSize: normalize(22),
                              }}>
                              {stateLanguage.translations.Ratings ?? 'Ratings'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
