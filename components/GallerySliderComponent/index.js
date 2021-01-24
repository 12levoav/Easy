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

import {aspectRatio, deleteImageHandler, normalize} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ImageZoom from 'react-native-image-pan-zoom';

import {API_URL_MAIN} from '../../utils/Http';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {deleteImage} from '../../services/auth';

const GallerySlider = (props) => {
  const deleteFile = async (data, index) => {
    if (data.id !== undefined) {
      const {data: test} = await deleteImage(data.id);
    }
    deleteImageHandler(props.func, props.image, index);
  };
  return (
    <View
      style={{
        // bottom: 45,
        height:
          aspectRatio > 1.6
            ? heightPercentageToDP('25%')
            : heightPercentageToDP('23.1%'),
        width: widthPercentageToDP('40%'),
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.image.map((data, index) => {
          return (
            <TouchableOpacity key={index}>
              <Image
                resizeMode={'cover'}
                style={{
                  height:
                    aspectRatio > 1.6
                      ? heightPercentageToDP('17.1%')
                      : heightPercentageToDP('15.1%'),
                  width: widthPercentageToDP('35%'),
                  marginLeft: index == 0 ? null : widthPercentageToDP('3%'),
                }}
                source={{
                  uri: data.image === undefined ? data.path : API_URL_MAIN+data.image,
                }}
              />
              <View
                style={{
                  height: heightPercentageToDP('6%'),
                  width: widthPercentageToDP('35%%'),
                  marginLeft: index == 0 ? null : widthPercentageToDP('3%'),
                  backgroundColor: '#0F0E0E',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingRight: widthPercentageToDP('3%'),
                }}>
                <TouchableOpacity onPress={() => deleteFile(data, index)}>
                  <MaterialIcons
                    name={'close'}
                    style={{color: 'white'}}
                    size={normalize(24)}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default GallerySlider;
