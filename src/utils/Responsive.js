import {Dimensions, PixelRatio, Platform} from 'react-native';
export const {width} = Dimensions.get('window');
export const {height} = Dimensions.get('window');
/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  // Parse string percentage input and convert it to number.

  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height;
  // Parse string percentage input and convert it to number.

  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  let scale;
  if (SCREEN_WIDTH > SCREEN_HEIGHT) {
    scale = SCREEN_HEIGHT / 320;
  } else {
    scale = SCREEN_WIDTH / 320;
  }
  console.warn(scale);
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export {widthPercentageToDP, heightPercentageToDP, normalize};
