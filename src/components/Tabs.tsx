import React from 'react';
import MainButton from './button/MainButton';
import Container from './container/Index';

const Tabs: ITabs = ({onPress, tabs, initialTab}) => {
  const [index, setIndex] = React.useState(initialTab);

  React.useEffect(() => {
    onPress?.(index!);
  }, [index]);

  const width = 100 / tabs?.length!;
  const borderRadius = 100;

  return (
    <Container
      width={'full'}
      flexDirection="row"
      justifyContent="space-between">
      {tabs?.map(({title, slug}, key) => (
        <MainButton
          onPress={() => setIndex(slug)}
          key={key}
          disabled={!(slug === index)}
          enableButtonColor={'black'}
          disableButtonColor={'transparent'}
          borderRadius={borderRadius}
          color={'white'}
          disableColor={'gray'}
          width={`${width}%`}>
          {title}
        </MainButton>
      ))}
    </Container>
  );
};
export default Tabs;
