import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import style from './styles';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import {aspectRatio, normalize, ratio} from '../../helpers/helper';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
import {getAeroports} from '../../services/auth';
import CustomIcon from '../CustomIcon';
const SearchAndroidLong = (props) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  console.log(data, search);
  return (
    <View
      style={[
        {
          width: widthPercentageToDP('95%'),
          height:
            search == '' || data.length == 0
              ? heightPercentageToDP('7%')
              : heightPercentageToDP('35%'),
          borderColor: '#B2B2B2',
          borderWidth: 1,
          borderRadius: normalize(30),
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: widthPercentageToDP('5%'),
          marginBottom: heightPercentageToDP('1%'),
        },
        props.viewStyle,
      ]}>
      <View
        style={{
          width: widthPercentageToDP('10%'),
          zIndex: 1,
          bottom:
            search === '' || data.length === 0
              ? null
              : heightPercentageToDP('12.5%'),
        }}>
        <CustomIcon
          size={normalize(props.size)}
          name={props.icon}
          style={{color: 'black'}}
        />
      </View>

      <Autocomplete
        inputContainerStyle={{
          width: aspectRatio > 1.8 ? wp('70%') : wp('70%'),
          borderWidth: 0,
          flex: 1,
          height: hp('6.7%'),
          padding: 18 * ratio,
          fontSize: normalize(16),
          color: 'black',
          justifyContent: 'center',
          paddingTop:
            aspectRatio > 1.8
              ? heightPercentageToDP('0.5%')
              : heightPercentageToDP('2%'),
          // right: search === '' || data.length === 0 ? null : 50,
        }}
        listContainerStyle={{right: wp('11%')}}
        listStyle={{
          width: wp('90%'),
          height: heightPercentageToDP('25%'),
          right: wp('4%'),
          borderWidth: 0,
        }}
        renderTextInput={() => (
          <TextInput
            placeholder={props.label}
            placeholderTextColor={'black'}
            onChangeText={async (text) => {
              setSearch(text);
              if (text !== '') {
                props.setDefault(text);
                let {data: d} = await getAeroports(text);
                setData(d);
              } else {
                console.log(123);
                props.setDefault(text);
                setData([]);
              }
            }}
            value={props.default}
            style={{
              color: 'black',
              fontSize: normalize(16),
              height: hp('6.7%'),
            }}
          />
        )}
        keyboardShouldPersistTaps="always"
        data={data}
        defaultValue={props.default}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() => {
              props.setDefault(item.data.name);
              props.setId(item.data.airport_id);
              setData([]);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: heightPercentageToDP('5%'),
            }}>
            <Text
              style={{
                width: wp('75%'),
                fontSize: normalize(20),
                color: 'black',
              }}>
              {item.data.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          zIndex: 1,
          width: widthPercentageToDP('15%'),
          alignItems: 'center',
          bottom:
            search === '' || data.length === 0
              ? null
              : heightPercentageToDP('12.5%'),
        }}>
        <SimpleLineIcons
          name={'pencil'}
          color={'rgba(0, 0, 0, 0.5)'}
          size={normalize(20)}
        />
      </View>
    </View>
  );
};
export default SearchAndroidLong;
