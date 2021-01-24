import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import style from './styles';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import {normalize} from '../../helpers/helper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const JetInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    setIsFocused(!!props.value);
  }, [props.value]);
  return (
    <View style={[style.container, props.styleContainter]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: widthPercentageToDP('78%'),
        }}>
        <TextInput
          style={[
            style.input,
            props.style,
            props.error && {borderColor: 'red'},
          ]}
          autoCapitalize={false}
          onFocus={setIsFocused}
          onBlur={() => setIsFocused(!!props.value)}
          placeholder={!isFocused ? props.placeholder : ''}
          value={props.value}
          onChangeText={props.onChange}
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          {...props}
        />
        {!props.icon && (
          <SimpleLineIcons
            name={'pencil'}
            color={'rgba(0, 0, 0, 0.5)'}
            size={normalize(20)}
          />
        )}
      </View>
      <Text style={[style.label, props.label, props.error && {color: 'red'}]}>
        {props.place}
      </Text>
    </View>
  );
};
export default JetInput;
