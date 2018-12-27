import React from 'react';
import { PixelRatio, Dimensions, Platform } from 'react-native';
let pixelRatio = PixelRatio.get();

//  const {width, height} = require('Dimensions').get('window');
/* Based responsive Width and height in Iphone 8 */
const width = 375;
const height = 667;

export const percentageWidth = (originalSize) => {
  return originalSize*100/width;
}

export const percentageHeight = (originalSize) => {
 return originalSize*100/height;
}