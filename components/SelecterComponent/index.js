import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import style, {pickerSelectStyles} from './styles';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {normalize} from '../../helpers/helper';

const SelectPicker = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {selectorStyle} = style;

  return (
    <View style={selectorStyle}>
      <RNPickerSelect
        placeholder={props.placeholder}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        value={props.value}
        onValueChange={props.onChange}
        items={props.items}
        Icon={() => {
          return (
            <Ionicons
              name={'ios-arrow-down'}
              style={{color: '#0F0E0E'}}
              size={normalize(26)}
            />
          );
        }}
      />
      <Text
        style={[
          style.label,
          props.label,
          {color: isFocused ? '#2EA7F9' : '#0F0E0E'},
        ]}>
        {props.place}
      </Text>
    </View>
  );
};
export default SelectPicker;
