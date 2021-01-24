import React, {useEffect, useState} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import style from './styles';
import DatePicker from 'react-native-datepicker';
import {
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {aspectRatio, normalize, ratio} from '../../helpers/helper';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import {useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DatePickerCompDateOnly = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {selectorStyle} = style;
  const stateLanguage = useSelector((state) => state.LanguageReducer);

  return (
    <View
      style={{
        width: wp('80%'),
        height: hp('6.7%'),
        borderRadius: 3,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        marginTop: hp('5%'),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <DatePicker
          style={{
            width:
              aspectRatio > 1.8
                ? widthPercentageToDP('74%')
                : widthPercentageToDP('73%'),
          }}
          date={props.value}
          mode={ 'date'}
          placeholder={stateLanguage.translations.Select_Date ?? 'Select_Date'}
          showIcon={false}
          format="DD.MM.YYYY"
          confirmBtnText={stateLanguage.translations.Confirm ?? 'Confirm'}
          cancelBtnText={stateLanguage.translations.Cancel ?? 'Cancel'}
          customStyles={style}
          onDateChange={props.change}
          androidMode={'spinner'}
        />
        <SimpleLineIcons
          name={'pencil'}
          color={'rgba(0, 0, 0, 0.5)'}
          size={normalize(20)}
        />
      </View>
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
export default DatePickerCompDateOnly;
