import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';
import utils from '../../shared/Utils';
import {ColorKeys, Colors} from '../../shared/themes/Index';

export const Scroll: IContainer<ColorKeys> = ({children, ...props}) => {
  let {
    padding = 0,
    margin = 0,
    marginTop = 0,
    paddingTop = 0,
    paddingBottom = 0,
    width = '90',
    alignItems,
    backgroundColor = 'transparent',
    flexDirection = 'column',
    height,
    justifyContent,
    flex,
    gap,
    alignSelf = 'center',
    borderRadius,
    mainBackgroundColor = 'transparent',
    borderColor = 'gray',
    borderStyle,
    borderWidth,
    position,
    bottom,
    left,
    right,
    top,
    borderTopLeftRadius,
    borderTopRightRadius,
  } = props;
  const isNumber = (value: any) => Number.isNaN(value);

  if (isNumber(width)) width = scale(width as number);
  if (isNumber(height)) height = verticalScale(height as number);

  if (typeof width !== 'number') {
    width = utils.getDimensions(width as Dimensions);
  }

  if (typeof height !== 'number') {
    height = utils.getDimensions(height as Dimensions);
  }

  const style: StyleProp<ViewStyle> = {
    padding: scale(padding),
    margin: scale(margin),
    marginTop: scale(marginTop),
    paddingTop: verticalScale(paddingTop),
    paddingBottom: verticalScale(paddingBottom),
    width,
    height,
    alignItems,
    justifyContent,
    flexDirection,
    gap,
    alignSelf,
    borderRadius,
    borderWidth,
    borderStyle,
    backgroundColor: Colors[backgroundColor],
    borderColor: Colors[borderColor],
    position,
    top,
    bottom,
    left,
    right,
    borderTopLeftRadius,
    borderTopRightRadius,
  };

  return (
    <ScrollView
      style={{
        flex,
        backgroundColor: Colors[mainBackgroundColor],
        borderRadius,
      }}>
      <View style={style}>{children}</View>
    </ScrollView>
  );
};
