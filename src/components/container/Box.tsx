import {StyleProp, View, ViewStyle} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';

export const Box: IContainer = ({children, ...props}) => {
  let {
    padding = 5,
    margin = 0,
    marginTop = 0,
    paddingTop = 0,
    paddingBottom = 0,
    width = '90%',
    alignItems,
    backgroundColor = 'white',
    flexDirection = 'column',
    height,
    justifyContent,
    flex,
    gap,
    alignSelf = 'center',
  } = props;
  const isNumber = (value: any) => Number.isNaN(value);

  if (isNumber(width)) width = scale(width as number);
  if (isNumber(height)) height = verticalScale(height as number);

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
  };

  return (
    <View style={{flex, backgroundColor}}>
      <View style={style}>{children}</View>
    </View>
  );
};
