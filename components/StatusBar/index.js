import React from 'react';

import {StatusBar, View} from 'react-native';
import styles from './styles/GeneralStatusBarColorStyles';

const StatusBar = ({backgroundColor, ...props}) => {
  return (
    <StatusBar
      translucent={true}
      barStyle={'light-content'}
      backgroundColor="transparent"
      {...props}>
      <View style={[styles.statusBar, {backgroundColor: 'transparent'}]} />
    </StatusBar>
  );
};
export default StatusBar;
