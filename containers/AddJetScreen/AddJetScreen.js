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
import {
  galleryUpload,
  handleChoosePhoto,
  handleChoosePhotos,
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
import {createJet, getJets, getTopJets} from '../../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/InputComponent';
import JetInput from '../../components/JetInputComponent';
import ActivityView from '../../components/ActivityLoader';
import {configureNotifcaiton} from '../../helpers/notification';
import ImageSlider from '../../components/ImageSliderComponent';
import GallerySlider from '../../components/GallerySliderComponent';
export default function AddJet(props) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [luggage, setLuggage] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [speed, setSpeed] = useState('');
  const [range, setRange] = useState('');
  const [description, setDescription] = useState('');
  const [flightarea, setFlightArea] = useState('');
  const [loader, setLoader] = useState(false);
  const state = useSelector((state) => state.AuthReducer);
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const dispatch = useDispatch();

  const {
    container,
    imageBackground,
    imageBackgroundView,
    mainContainer,
  } = styles;
  React.useEffect(() => {
    return props.navigation.addListener('focus', async () => {
      configureNotifcaiton(dispatch, props);
    });
  }, []);

  const handleSave = async () => {
    setBearerToken(state.token);

    setLoader(true);
    if (name !== '' && luggage !== '' && price !== '' && seats !== '') {
      try {
        const {data} = await createJet(
          name,
          price,
          seats,
          luggage,
          length,
          height,
          width,
          speed,
          range,
          description,
          flightarea,
        );
        if (gallery.length !== 0) {
          gallery.map(async (galler, index) => {
            await galleryUpload(galler, state.token, data.jet.id);
          });
        }
        if (image !== '') {
          await imageUpload(image, state.token, data.jet.id);

          setTimeout(() => {
            props.navigation.navigate('JetsScreen');
            setLoader(false);
          }, 3000);
        } else {
          props.navigation.navigate('JetsScreen');
          setLoader(false);
        }
      } catch (e) {
        setLoader(false);
      }
    } else {
      let error = stateLanguage.translations.error ?? 'Error';
      let err =
        (name === ''
          ? (stateLanguage.translations.Name_required ?? 'Name_required') +
            ' \n'
          : '') +
        (luggage === ''
          ? (stateLanguage.translations.Luggage_required ??
              'Luggage_required') + ' \n'
          : '') +
        (price === ''
          ? (stateLanguage.translations.Price_required ?? 'Price_required') +
            ' \n'
          : '') +
        (seats === ''
          ? (stateLanguage.translations.Seats_required ?? 'Seats_required') +
            ' \n'
          : '');
      Alert.alert(error, err);
      setLoader(false);
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
                {stateLanguage.translations.Add_New_Jet ?? 'Add_New_Jet'}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={mainContainer}>
          <View style={{marginTop: heightPercentageToDP('3%')}}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={
                Platform.OS === 'ios'
                  ? heightPercentageToDP('22%')
                  : -heightPercentageToDP('15%')
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: heightPercentageToDP('2%'),
                    }}>
                    <Image
                      style={{
                        width: image ? widthPercentageToDP('30%') : null,
                        height: image ? heightPercentageToDP('14%') : null,
                      }}
                      source={{
                        uri: image.path,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => handleChoosePhoto(setImage)}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          marginRight: widthPercentageToDP('3%'),
                          fontSize: normalize(15),
                        }}>
                        {stateLanguage.translations.Upload_Photo ??
                          'Upload_Photo'}
                      </Text>
                      <View
                        style={{
                          height: widthPercentageToDP('13%'),
                          width: widthPercentageToDP('13%'),
                          borderRadius: widthPercentageToDP('26%'),
                          backgroundColor: '#F8C440',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Feather
                          name={'upload'}
                          color={'white'}
                          size={normalize(22)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <JetInput
                    place={stateLanguage.translations.Jet_Name ?? 'Jet_Name'}
                    placeholder={
                      stateLanguage.translations.Enter_Name ?? 'Enter_Name'
                    }
                    value={name}
                    onChange={(text) => setName(text)}
                  />
                  <JetInput
                    place={stateLanguage.translations.Jet_Price ?? 'Jet_Price'}
                    placeholder={
                      stateLanguage.translations.Enter_Price ?? 'Enter_Price'
                    }
                    value={price}
                    onChange={(text) => setPrice(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={stateLanguage.translations.Seats ?? 'Seats'}
                    placeholder={
                      stateLanguage.translations.Enter_Seats ?? 'Enter_Seats'
                    }
                    value={seats}
                    onChange={(text) => setSeats(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={stateLanguage.translations.Luggage_piece ?? 'Luggage_piece'}
                    placeholder={
                      stateLanguage.translations.Enter_Luggage ??
                      'Enter_Luggage'
                    }
                    value={luggage}
                    onChange={(text) => setLuggage(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={
                      stateLanguage.translations.Description ?? 'Description'
                    }
                    placeholder={
                      stateLanguage.translations.Set_Description ??
                      'Set_Description'
                    }
                    value={description}
                    onChange={(text) => setDescription(text)}
                  />
                  <JetInput
                    place={
                      stateLanguage.translations.Flight_Area ?? 'Flight_Area'
                    }
                    placeholder={
                      stateLanguage.translations.Set_Flight_Area ??
                      'Set_Flight_Area'
                    }
                    value={flightarea}
                    onChange={(text) => setFlightArea(text)}
                  />

                  <Text
                    style={{
                      color: '#F8C440',
                      fontSize: normalize(16),
                      marginTop: heightPercentageToDP('4%'),
                    }}>
                    {stateLanguage.translations.Technical_Specifications ??
                      'Technical_Specifications'}
                  </Text>
                  <JetInput
                    place={stateLanguage.translations.Range+' (km)' ?? 'Range'}
                    placeholder={
                      stateLanguage.translations.Enter_range ?? 'Enter_Range'
                    }
                    value={range}
                    onChange={(text) => setRange(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={stateLanguage.translations.Speed+' (km/h)' ?? 'Speed'}
                    placeholder={
                      stateLanguage.translations.Enter_Speed ?? 'Enter_Speed'
                    }
                    value={speed}
                    onChange={(text) => setSpeed(text)}
                    keyboardType={'numeric'}
                  />
                  <Text
                    style={{
                      color: '#F8C440',
                      fontSize: normalize(16),
                      marginTop: heightPercentageToDP('4%'),
                    }}>
                    {stateLanguage.translations.Cabin_Size ?? 'Cabin_Size'}
                  </Text>
                  <JetInput
                    place={stateLanguage.translations.Length+' (m)' ?? 'Length'}
                    placeholder={
                      stateLanguage.translations.Enter_Length ?? 'Enter_Length'
                    }
                    value={length}
                    onChange={(text) => setLength(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={stateLanguage.translations.Height+' (m)' ?? 'Height'}
                    placeholder={
                      stateLanguage.translations.Enter_Height ?? 'Enter_Height'
                    }
                    value={height}
                    onChange={(text) => setHeight(text)}
                    keyboardType={'numeric'}
                  />
                  <JetInput
                    place={stateLanguage.translations.Width+' (m)' ?? 'Width'}
                    placeholder={
                      stateLanguage.translations.Enter_Width ?? 'Enter_Width'
                    }
                    value={width}
                    onChange={(text) => setWidth(text)}
                    keyboardType={'numeric'}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: heightPercentageToDP('2%'),
                    }}>
                    {gallery.length !== 0 && (
                      <GallerySlider func={setGallery} image={gallery} />
                    )}
                    <TouchableOpacity
                      onPress={() => handleChoosePhotos(setGallery, gallery)}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          marginRight: widthPercentageToDP('3%'),
                          fontSize: normalize(15),
                        }}>
                        {stateLanguage.translations.Gallery ?? 'Gallery'}
                      </Text>
                      <View
                        style={{
                          height: widthPercentageToDP('13%'),
                          width: widthPercentageToDP('13%'),
                          borderRadius: widthPercentageToDP('26%'),
                          backgroundColor: '#F8C440',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Feather
                          name={'upload'}
                          color={'white'}
                          size={normalize(22)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleSave()}
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
                      {stateLanguage.translations.Save ?? 'Save'}
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
