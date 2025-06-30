import {ScrollView} from 'react-native';
import {ColorKeys} from '../../shared/themes/Index';

export const Scroll: IContainer<ColorKeys> = ({children, ...props}) => {
  let {
    horizontal,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    scrollsToTop,
  } = props;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollsToTop={scrollsToTop}
      horizontal={horizontal}>
      {children}
    </ScrollView>
  );
};
