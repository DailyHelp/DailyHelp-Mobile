import {MD3LightTheme} from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#121921',
    // secondary: '#017441',
  },
};

export const Colors = {
  primary: '#C1FF1D',
  secondary: '#017441',
  gray: '#757C91',
  danger: '#F0443A',
  lightGreen: '#27A535',
  green: '#014C2B',
  lighterGreen: '#95D21A',
  green2: '#4A6600',
  white: 'white',
  black: '#121921',
  darkGray: '#3B4152',
  lightBlack: '#3B4152',
  orange: '#FF6B01',
  disabled: '#014C2B',
  transparent: 'transparent',
  pink: '#FDE9E7',
  lightGrey: '#F9F9FB',
  lightDeepGrey: '#D6DBE7',
  lightPink: '#FEF6F6',
  deepGreen: '#FCFCFC',
  lighterGray: '#A9AFC2',
  lemonGreen: '#02CA71',
  offWhite: '#F9F9FB',
  lemonDanger: '',
  bronze: '#E27C00',
  lightPrimary: '#F9FFEB',
  lighterPrimary:'#E6FFF4'
};

// Get the type of all keys in Colors
export type ColorKeys = keyof typeof Colors;

export const Dimensions = {};
