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
const SearchIosLong = (props) => {
  const [data, setData] = useState([]);

  return (
    <View
      style={[
        {
          width: widthPercentageToDP('95%'),
          height: heightPercentageToDP('7%'),
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
      <View style={{width: widthPercentageToDP('10%')}}>
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
              ? heightPercentageToDP('2.5%')
              : heightPercentageToDP('4%'),
        }}
        listContainerStyle={{right: wp('11%')}}
        listStyle={{
          width: wp('87%'),
          height: heightPercentageToDP('25%'),
          right: wp('10%'),
        }}
        renderTextInput={() => (
          <TextInput
            placeholder={props.label}
            placeholderTextColor={'black'}
            onChangeText={async (text) => {
              setData([]);
              if (text !== '') {
                props.setDefault(text);
                let {data: d} = await getAeroports(text);
                setData(d);
              } else {
                console.log(123, 'here');
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
      <View style={{width: widthPercentageToDP('15%')}}>
        <SimpleLineIcons
          name={'pencil'}
          color={'rgba(0, 0, 0, 0.5)'}
          size={normalize(20)}
        />
      </View>
    </View>
  );
};
export default SearchIosLong;
