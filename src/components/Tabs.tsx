import React from 'react';
import {View} from 'react-native';
import MainButton from './button/MainButton';

const Tabs: ITabs = ({onPress, tabs, initialTab}) => {
  const [index, setIndex] = React.useState(initialTab);

  React.useEffect(() => {
    onPress?.(index!);
  }, [index]);

  const width = 100 / tabs?.length!;
  const borderRadius = 100;
  const disableButtonColor = 'transparent';
  const enabledButtonColor = '#121921';
  const enableColor = '#FCFCFC';
  const disableColor = '#757C91';

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {tabs?.map(({title, slug}, key) => (
        <MainButton
          onPress={() => setIndex(slug)}
          key={key}
          disabled={!(slug === index)}
          enableButtonColor={enabledButtonColor}
          disableButtonColor={disableButtonColor}
          borderRadius={borderRadius}
          enableColor={enableColor}
          disableColor={disableColor}
          width={`${width}%`}>
          {title}
        </MainButton>
      ))}
    </View>
  );
};
export default Tabs;
