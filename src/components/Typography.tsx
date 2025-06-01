import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../shared/themes/Typography';
import utils from '../shared/Utils';
import {TouchableOpacity, View} from 'react-native';
import React from 'react';

const Typography: ITypography = ({
  children,
  size,
  fontWeight,
  color,
  textAlign,
  fontType = 'Geist',
  padding,
  limit,
  readMore,
  readMoreConstant,
  margin,
  marginTop,
  paddingTop,
  textDecorationLine,
  lineHeight,
  currency,
  backgroundColor,
  paddingBottom,
}) => {
  const [ellipse, setEllipse] = React.useState(limit);
  const [showMore, setShowMore] = React.useState(readMore);

  React.useEffect(() => setEllipse(limit), [limit]);
  React.useEffect(() => setShowMore(readMore), [readMore]);

  const geist = fontType === 'Geist';
  const grotesk = fontType === 'CabinetGrotesk';
  const figtree = fontType === 'Figtree';

  let fontFamily = geist ? fonts.GeistRegular : fonts.regular;
  let fontSize = customFontSize.sm;

  // font-family
  if (fontWeight === 'bold' && geist) fontFamily = fonts.GeistBold;
  if (fontWeight === 'extrabold' && geist) fontFamily = fonts.GeistExtraBold;
  if (fontWeight === 'medium' && geist) fontFamily = fonts.GeistMedium;
  if (fontWeight === 'semibold' && geist) fontFamily = fonts.GeistSemiBold;

  if (fontWeight === 'bold' && grotesk) fontFamily = fonts.bold;
  if (fontWeight === 'extrabold' && grotesk) fontFamily = fonts.extraBold;
  if (fontWeight === 'medium' && grotesk) fontFamily = fonts.medium;

  if (fontWeight === 'italics' && figtree) fontFamily = fonts.FigtreeItalic;

  // font-size
  if (size === 'lg') fontSize = customFontSize.lg;
  if (size === 'md') fontSize = customFontSize.md;
  if (size === 'xs') fontSize = customFontSize.xs2;
  if (size === 'xxlg') fontSize = customFontSize.xxlg;
  if (size === 'xlg') fontSize = customFontSize.xlg;
  if (size === 'm2d') fontSize = customFontSize.m2d;
  if (size === 'm3d') fontSize = customFontSize.m3d;

  let string = children as string;

  if (ellipse) children = utils.ellipseText(children as string, ellipse);

  if (currency) children = `₦${utils.numberWithCommas(children as number)}`;

  if (showMore || readMoreConstant)
    return (
      <View style={{flexDirection: 'column', gap: 7}}>
        <Text
          style={{
            fontFamily,
            fontSize,
            color,
            textAlign,
            padding,
            paddingTop,
            margin,
            marginTop,
            lineHeight,
            backgroundColor,
            paddingBottom,
          }}>
          {children}
        </Text>

        <TouchableOpacity
          onPress={() => {
            setShowMore(!showMore);
            if (showMore) setEllipse(undefined);
            else setEllipse(limit);
          }}>
          {string.length > limit! && (
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.md,
                color: '#017441',
              }}>
              Read {!showMore ? 'less' : 'more'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );

  return (
    <Text
      style={{
        fontFamily,
        fontSize,
        color,
        textAlign,
        padding,
        paddingTop,
        margin,
        marginTop,
        textDecorationLine,
        lineHeight,
        backgroundColor,
        paddingBottom,
      }}>
      {children}
    </Text>
  );
};
export default Typography;
