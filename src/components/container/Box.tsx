import {StyleProp, View, ViewStyle} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';
import utils from '../../shared/Utils';
import {ColorKeys, Colors} from '../../shared/themes/Index';

export const Box: IContainer<ColorKeys> = ({children, ...props}) => {
  let {
    padding,
    margin,
    marginTop,
    paddingTop,
    paddingBottom,
    alignItems,
    backgroundColor = 'transparent',
    flexDirection = 'column',
    height,
    justifyContent,
    flex,
    gap,
    alignSelf,
    borderRadius,
    borderWidth,
    borderStyle,
    borderColor = 'lightGrey',
    position,
    paddingHorizontal,
    paddingVertical,
    top,
    bottom,
    left,
    right,
    borderTopLeftRadius,
    borderTopRightRadius,
    width = 'auto',
    flexWrap,
    marginBottom,
    borderBottomWidth,
    marginVertical,
    flexShrink,
  } = props;

  const isNumber = (value?: any) => typeof value === 'number';

  if (isNumber(width)) width = scale(width as number);
  if (isNumber(height)) height = verticalScale(height as number);
  if (isNumber(padding)) padding = scale(padding);
  if (isNumber(paddingTop)) paddingTop = verticalScale(paddingTop);
  if (isNumber(paddingBottom)) paddingBottom = verticalScale(paddingBottom);
  if (isNumber(paddingHorizontal)) paddingHorizontal = scale(paddingHorizontal);
  if (isNumber(paddingVertical)) paddingVertical = scale(paddingVertical);
  if (isNumber(margin)) margin = scale(margin);
  if (isNumber(marginTop)) marginTop = verticalScale(marginTop);
  if (isNumber(marginBottom)) marginBottom = verticalScale(marginBottom);
  if (isNumber(borderBottomWidth))
    borderBottomWidth = verticalScale(borderBottomWidth);
  if (isNumber(marginVertical)) marginVertical = verticalScale(marginVertical);

  if (typeof width === 'string') {
    width = utils.getDimensions(width as Dimensions);
  }

  if (typeof height === 'string') {
    height = utils.getDimensions(height as Dimensions);
  }

  const style: StyleProp<ViewStyle> = {
    padding,
    margin,
    marginTop,
    paddingTop,
    paddingBottom,
    alignItems,
    justifyContent,
    flexDirection,
    gap,
    alignSelf,
    borderWidth,
    borderStyle,
    backgroundColor: Colors[backgroundColor],
    borderRadius,
    borderColor: Colors[borderColor],
    position,
    paddingHorizontal,
    paddingVertical,
    top,
    bottom,
    left,
    right,
    borderTopLeftRadius,
    borderTopRightRadius,
    flexWrap,
    width,
    height,
    flex,
    marginBottom,
    borderBottomWidth,
    marginVertical,
    flexShrink,
  };

  return <View style={style}>{children}</View>;
};
