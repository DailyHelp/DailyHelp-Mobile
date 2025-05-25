import {responsiveFontSize} from '../Scaling';

export const fonts = {
  regular: 'CabinetGrotesk-Regular',
  medium: 'CabinetGrotesk-Medium',
  bold: 'CabinetGrotesk-Bold',
  light: 'CabinetGrotesk-Light',
  black: 'CabinetGrotesk-Black',
  thin: 'CabinetGrotesk-Thin',
  extraBold: 'CabinetGrotesk-ExtraBold',
  extraLight: 'CabinetGrotesk-ExtraLight',
  GeistBold: 'Geist-Bold',
  GeistThin: 'Geist-Thin',
  GeistLight: 'Geist-Light',
  GeistBlack: 'Geist-Black',
  GeistMedium: 'Geist-Medium',
  GeistRegular: 'Geist-Regular',
  GeistSemiBold: 'Geist-SemiBold',
  GeistExtraBold: 'Geist-ExtraBold',
  GeistExtraBoldLight: 'Geist-ExtraLight',
  FigtreeItalic: 'Figtree-Italic',
};

export const customFontSize = {
  xs2: responsiveFontSize(12, 0.5, 12),
  sm: responsiveFontSize(14, 0.5, 14),
  md: responsiveFontSize(16, 0.5, 16),
  m2d: responsiveFontSize(18, 0.5, 18),
  m3d: responsiveFontSize(20, 0.5, 20),
  lg: responsiveFontSize(24, 0.5, 24),
  xlg: responsiveFontSize(28, 0.5, 28),
  xxlg: responsiveFontSize(35, 0.5, 28),
};
