import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';

import {aspectRatio, normalize} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ImageZoom from 'react-native-image-pan-zoom';

import {API_URL_MAIN} from '../../utils/Http';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const ImageSlider = (props) => {
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState(null);

  return (
    <View
      style={{
        bottom: 45,
        height:
          aspectRatio > 1.6
            ? heightPercentageToDP('27%')
            : heightPercentageToDP('24.1%'),
        width: widthPercentageToDP('79%'),
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.image.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setModal(true);
                setUrl(API_URL_MAIN + data.image);
              }}>
              <Image
                resizeMode={'stretch'}
                style={{
                  height:
                    aspectRatio > 1.6
                      ? heightPercentageToDP('27.1%')
                      : heightPercentageToDP('24.1%'),
                  width: widthPercentageToDP('35%'),
                  marginLeft: index == 0 ? null : widthPercentageToDP('3%'),
                }}
                source={{
                  uri: API_URL_MAIN + data.image,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Modal isVisible={modal}>
        <View
          style={{
            backgroundColor: 'white',
            height: heightPercentageToDP('80%'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
              // setUrl(null);
            }}
            style={{
              width: widthPercentageToDP('15%'),
              alignSelf: 'flex-end',
              marginBottom: heightPercentageToDP('1%'),
            }}>
            <MaterialIcons name={'close'} size={normalize(48)} />
          </TouchableOpacity>

          <Image
            resizeMode={'contain'}
            style={{
              height: heightPercentageToDP('70%'),
              width: widthPercentageToDP('80%'),
            }}
            source={{
              uri: url,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};
export default ImageSlider;
