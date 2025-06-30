import {Switch} from 'react-native-switch';

const CustomSwitchInput: IInput = ({value, onChangeText}) => (
  <Switch
    value={value === 'true' ? true : false}
    onValueChange={val => onChangeText?.(`${val}`)}
    disabled={false}
    circleSize={30}
    barHeight={30}
    circleBorderInactiveColor="#F1F2F4"
    backgroundActive={'green'}
    backgroundInactive={'#F1F2F4'}
    circleActiveColor={'white'}
    circleInActiveColor={'white'}
    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
    innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}} // style for inner animated circle for what you (may) be rendering inside the circle
    outerCircleStyle={{}} // style for outer animated circle
    renderActiveText={false}
    renderInActiveText={false}
    switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
    switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
    switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
    switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
  />
);

export default CustomSwitchInput;
