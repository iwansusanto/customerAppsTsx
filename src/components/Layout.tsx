/**
 * @Author: Iwan Susanto <macbookair>
 * @Date:   2018-09-04T10:30:12+07:00
 * @Email:  iwandevapps@gmail.com
 * @Project: MSHWAR
 * @Last modified by:   macbookair
 * @Last modified time: 2018-09-04T21:26:18+07:00
 */

import React from 'react';
import { PixelRatio, Dimensions, Platform } from 'react-native';
let pixelRatio = PixelRatio.get();

//  const {width, height} = require('Dimensions').get('window');
/* Width and Height for Iphone 8 */
const width = 375;
const height = 667;

export const percentageWidth = (originalSize) => {
  return originalSize*100/width;
}

export const percentageHeight = (originalSize) => {
 return originalSize*100/height;
}

export const isIphoneX = () => {
 const { height, width } = Dimensions.get('window');
 return (
   Platform.OS === 'ios' && (height === 812 || width === 812)
 )
}



//  export const widthPercentageToDP = widthPercent => {
//   const screenWidth = Dimensions.get('window').width;
//   // Convert string input to decimal number
//   const elemWidth = parseFloat(widthPercent);
//   return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
// };

// export const heightPercentageToDP = heightPercent => {
//   const screenHeight = Dimensions.get('window').height;
//   // Convert string input to decimal number
//   const elemHeight = parseFloat(heightPercent);
// return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
// };