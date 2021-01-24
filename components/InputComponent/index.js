import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import style from './styles';

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    setIsFocused(!!props.value);
  }, [props.value]);
  return (
    <View style={[style.container, props.styleContainter]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          {...props}
        />
      </View>
      <Text style={[style.label, props.label, props.error && {color: 'red'}]}>
        {props.place}
      </Text>
    </View>
  );
};
export default Input;
