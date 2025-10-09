import React from 'react';
import Container from '../../../../components/container/Index';
import {ScrollView, View} from 'react-native';
import Typography from '../../../../components/Typography';
import IconF from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../../../shared/Scaling';

const TipsContainer: ITipsContainer = ({data}) => {
  const [currentTipIndex, setCurrentTipIndex] = React.useState(0);

  return (
    <Container gap={6}>
      {/* Tips Container - ScrollView with all tip cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12}}
        onMomentumScrollEnd={event => {
          const cardWidth = 280 + 12; // card width + gap
          const currentIndex = Math.round(
            event.nativeEvent.contentOffset.x / cardWidth,
          );
          setCurrentTipIndex(currentIndex);
        }}
        onScrollBeginDrag={() => {
          // Optional: handle scroll start
        }}>
        {data?.map((tip, index) => (
          <Container
            key={index}
            backgroundColor="lighterPrimary"
            borderRadius={15}
            padding={scale(20)}
            width={280}>
            <Container flex={1} gap={6}>
              <Container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography size="md" fontWeight="bold" marginBottom={8}>
                  {tip.title}
                </Typography>
                <Container>
                  <IconF name="star" size={18} color="#FFD100" />
                </Container>
              </Container>

              <Typography size="sm" color="gray">
                {tip.description}
              </Typography>
            </Container>
          </Container>
        ))}
      </ScrollView>

      {/* Pagination Dots - EXACTLY as in image */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 5,
          marginBottom: 20,
        }}>
        {data?.map((_, index) => (
          <View
            key={index}
            style={{
              width: 6,
              height: 6,
              borderRadius: 4,
              backgroundColor:
                index === currentTipIndex ? '#757C91' : '#D6DBE7',
            }}
          />
        ))}
      </View>
    </Container>
  );
};

export default TipsContainer;
