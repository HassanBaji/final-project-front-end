import {Dimensions, I18nManager, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';

const {width} = Dimensions.get('window');

export const isRTL = I18nManager.isRTL;

export const horizontalNavOption = isIOS
  ? {gestureResponseDistance: width / 1.5}
  : {};
