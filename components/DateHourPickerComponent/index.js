import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
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
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerSearchCompHour = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {selectorStyle} = style;
  const stateLanguage = useSelector((state) => state.LanguageReducer);
  const onChange = (event, selectedDate) => {
    if (selectedDate == null || selectedDate === '') {
      props.setshow(false);
      props.setdate('');
      props.settime(new Date());
    } else {
      props.setshow(false);

      const currentDate = selectedDate || props.timevar;
      var momentObj = moment(currentDate);
      var momentString = momentObj.format('H:mm');
      let date = moment(props.datevar, 'DD.MM.YYYY').add(1, 'd');
      let new_date = moment.utc(date);
      let final_date = new_date.format('DD.MM.YYYY');
      let datetime = moment.utc(
        final_date + ' ' + momentString,
        'DD.MM.YYYY H:mm',
      );
      let start_date_string = datetime.format('DD.MM.YYYY H:mm');
      props.settime(currentDate);
      props.setshow(false);
      props.setdate(start_date_string);
    }
  };
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
      <View
        style={{
          width:
            props.type === 'long'
              ? aspectRatio > 1.8
                ? widthPercentageToDP('9%')
                : hp('5%')
              : wp('6.5%'),
          alignItems: 'center',
        }}>
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
              ? aspectRatio > 1.8
                ?widthPercentageToDP('71%'):wp('71%')
              : widthPercentageToDP('25%'),
          right: wp('0.7%'),
        }}
        date={props.value}
        mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
        placeholder={stateLanguage.translations.Select_Date ?? 'Select_Date'}
        showIcon={false}
        format="DD.MM.YYYY H:mm"
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

      {props.show && Platform.OS === 'android' && (
        <DateTimePicker
          testID="dateTimePickerStart"
          timeZoneOffsetInMinutes={0}
          value={props.timevar}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={(event, selectDate) => onChange(event, selectDate)}
        />
      )}
    </View>
  );
};
export default DatePickerSearchCompHour;
