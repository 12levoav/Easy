import React from 'react';
import {ActivityIndicator, Dimensions, SafeAreaView} from 'react-native';

const ActivityView = () => (
  <SafeAreaView
    forceInSet={{top: 'always'}}
    style={{
      position: 'absolute',
      top: -100,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height + 100,
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: 100,
    }}>
    <ActivityIndicator
      animating={true}
      color="#F8C440"
      size="large"
      hidesWhenStopped
      style={{marginTop: 'auto', marginBottom: 'auto'}}
    />
  </SafeAreaView>
);

export default ActivityView;
