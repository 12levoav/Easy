import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import style from './styles';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import {aspectRatio, normalize, ratio} from '../../helpers/helper';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
import {getAeroports} from '../../services/auth';
const SearchIos = (props) => {
  const [data, setData] = useState([]);

  return (
    <View
      style={[
        {
          flex: 1,
          zIndex: 1,
          width: wp('80%'),
          height: aspectRatio > 1.8 ? hp('6.7%') : hp('8.7%'),
          borderRadius: 3,
          borderBottomWidth: 1,
          borderColor: 'rgba(0,0,0,0.8)',
          marginTop: hp('5%'),
          color: 'black',
        },
        props.viewStyle,
      ]}>
      <View
        style={{
          height: hp('6.7%'),
          flexDirection: 'row',
          alignItems: 'center',
          width: wp('80%'),
          color: 'black',
        }}>
        <Autocomplete
          inputContainerStyle={{
            width: aspectRatio > 1.8 ? wp('74%') : wp('73.5%'),
            borderWidth: 0,
            flex: 1,
            height: hp('6.7%'),
            padding: 10 * ratio,
            fontSize: normalize(16),
            color: 'black',
            justifyContent: 'center',
            paddingTop:
              aspectRatio > 1.8
                ? heightPercentageToDP('3%')
                : heightPercentageToDP('5%'),
          }}
          listStyle={{
            width: wp('80%'),
            height: heightPercentageToDP('25%'),
          }}
          renderTextInput={() => (
            <TextInput
              onChangeText={async (text) => {
                props.setDefault(text);
                let {data: d} = await getAeroports(text);
                setData(d);
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
          onChangeText={async (text) => {
            props.setDefault(text);
            let {data: d} = await getAeroports(text);
            setData(d);
          }}
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
        <SimpleLineIcons
          name={'pencil'}
          color={'rgba(0, 0, 0, 0.5)'}
          size={normalize(20)}
        />
      </View>
      <Text
        style={{
          fontSize: normalize(18),
          color: 'black',
          position: 'absolute',
          left: 10 * ratio,
          bottom: hp('5.5%'),
          textAlign: 'center',
        }}>
        {props.label}
      </Text>
    </View>
  );
};
export default SearchIos;
