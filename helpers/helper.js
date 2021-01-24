import Http from '../utils/Http';
import {Dimensions, Platform, PixelRatio, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Upload from 'react-native-background-upload';
import {MaskService} from 'react-native-masked-text';

let option = {
  separator: '.',
  delimiter: ',',
  unit: '',
  suffixUnit: '',
  precision: 0,
};
export function addComma(number) {
  return MaskService.toMask(
    'money',
    parseFloat(number.toString().replace(/,/g, '')),
    option,
  );
}

export function setBearerToken(token) {
  Http.defaults.headers.common.Authorization = 'Bearer ' + token;
}
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
const {width, height} = Dimensions.get('window');
const calRatio = 16 * (width / height);
export const screenWidth = width;
export const screenHeight = height;
export const ratio = (calRatio < 9 ? width / 9 : height / 18) / (360 / 9);
export const aspectRatio = height / width;
export function handleChoosePhoto(func) {
  ImagePicker.openPicker({
    multiple: false,
    mediaType: 'photo',
    compressImageMaxWidth: 1000,
  }).then((images) => {
    console.log(images, 123);
    func(images);
  });
}
export function handleChoosePhotos(func, image) {
  ImagePicker.openPicker({
    multiple: true,
    mediaType: 'photo',
    compressImageMaxWidth: 1000,
  }).then((images) => {
    func(image.concat(images));
  });
}

export const imageUpload = async (image, token, jet_id) => {
  const options = {
    url: 'some url',
    path:
      Platform.OS === 'ios' ? image.path : image.path.replace('file://', ''),

    method: 'POST',
    field: 'image',
    type: 'multipart',
    parameters: {
      jet_id: jet_id.toString(),
    },
    maxRetries: 2, // set retry count (Android only). Default 2
    headers: {
      'content-type': 'application/json', // Customize content-type
      Authorization: `Bearer ${token}`,
    },
    // Below are options only supported on Android
  };
  Upload.startUpload(options)
    .then((uploadId) => {
      Upload.addListener('progress', uploadId, (data) => {
        console.log(`Progress: ${data.progress}%`);
      });
      Upload.addListener('error', uploadId, (data) => {
        console.log(`Error: ${data.error}%`);
      });
      Upload.addListener('cancelled', uploadId, (data) => {
        console.log('Cancelled!');
      });
      Upload.addListener('completed', uploadId, (data) => {
        // data includes responseCode: number and responseBody: Object
      });
    })
    .catch((err) => {
      console.log('Upload error!', err);
    });
};
export const galleryUpload = async (image, token, jet_id) => {
  if (image.path !== undefined) {
    const options = {
      url: 'some url',
      path:
        Platform.OS === 'ios' ? image.path : image.path.replace('file://', ''),

      method: 'POST',
      field: 'image',
      type: 'multipart',
      parameters: {
        jet_id: jet_id.toString(),
      },
      maxRetries: 2, // set retry count (Android only). Default 2
      headers: {
        'content-type': 'application/json', // Customize content-type
        Authorization: `Bearer ${token}`,
      },
      // Below are options only supported on Android
    };
    Upload.startUpload(options)
      .then((uploadId) => {
        Upload.addListener('progress', uploadId, (data) => {
          console.log(`Progress: ${data.progress}%`);
        });
        Upload.addListener('error', uploadId, (data) => {
          console.log(`Error: ${data.error}%`);
        });
        Upload.addListener('cancelled', uploadId, (data) => {
          console.log('Cancelled!');
        });
        Upload.addListener('completed', uploadId, (data) => {
          // data includes responseCode: number and responseBody: Object
        });
      })
      .catch((err) => {
        console.log('Upload error!', err);
      });
  }
};

export function deleteImageHandler(func, image, index) {
  let filtered = image.filter((data, ind) => ind !== index);
  func(filtered);
}
export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 50;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
