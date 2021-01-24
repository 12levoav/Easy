import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import style, {pickerSelectStyles} from './styles';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {normalize} from '../../helpers/helper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const RequestDetailRow = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {selectorStyle} = style;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: heightPercentageToDP('1%'),
          marginTop: heightPercentageToDP('2%'),
          width: widthPercentageToDP('80%'),
        },
        props.containerStyle,
      ]}>
      <Text
        style={[
          {
            fontSize: normalize(14),
            marginLeft: widthPercentageToDP('2%'),
          },
          props.titleStyle,
        ]}>
        {props.title}
      </Text>
      <Text
        style={[
          {
            fontSize: normalize(16),
            marginLeft: widthPercentageToDP('2%'),
            textAlign: 'right',
          },
          props.textStyle,
        ]}>
        {props.value}
      </Text>
    </View>
  );
};
export default RequestDetailRow;
