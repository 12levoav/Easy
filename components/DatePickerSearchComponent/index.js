import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
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
import CustomIcon from '../CustomIcon';

const DatePickerSearchComp = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {selectorStyle} = style;
  const stateLanguage = useSelector((state) => state.LanguageReducer);

  return (
    <View
      style={{
        width:
          props.type === 'long'
            ? widthPercentageToDP('95%')
            : widthPercentageToDP('46%'),
        height: heightPercentageToDP('7%'),
        borderColor: '#B2B2B2',
        borderWidth: 1,
        borderRadius: normalize(30),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: widthPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('1%'),
      }}>
      <View style={{width: widthPercentageToDP('10%'), alignItems: 'center'}}>
        <CustomIcon
          size={normalize(20)}
          name={'calendar-3'}
          style={{color: 'black'}}
        />
      </View>
      <DatePicker
        style={{
          width:
            props.type === 'long'
              ? widthPercentageToDP('70%')
              : widthPercentageToDP('21%'),
            paddingLeft: heightPercentageToDP('1%'),

        }}
        date={props.value}
        mode="date"
        placeholder={stateLanguage.translations.Select_Date ?? 'Select_Date'}
        showIcon={false}
        format="DD.MM.YYYY"
        confirmBtnText={stateLanguage.translations.Confirm ?? 'Confirm'}
        cancelBtnText={stateLanguage.translations.Cancel ?? 'Cancel'}
        customStyles={style}
        onDateChange={props.change}
        androidMode={'spinner'}
      />
      {props.type === 'long' && (
        <SimpleLineIcons
          name={'pencil'}
          color={'rgba(0, 0, 0, 0.5)'}
          size={normalize(20)}
        />
      )}
    </View>
  );
};
export default DatePickerSearchComp;
