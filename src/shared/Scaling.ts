import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const scale = (size: number) => wp((size / 375) * 100)
const verticalScale = (size: number) => hp((size / 812) * 100)
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor

// Combined scaling function that uses both width and height
const responsiveFontSize = (size: number, factor = 0.5, minSize = 12) => {
  const scaledSize =
    size + (Math.min(scale(size), verticalScale(size)) - size) * factor
  return Math.max(scaledSize, minSize)
}

export { scale, verticalScale, moderateScale, responsiveFontSize }
