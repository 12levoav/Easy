import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const win = Dimensions.get('window');

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? hp('4%') : 0;
export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
