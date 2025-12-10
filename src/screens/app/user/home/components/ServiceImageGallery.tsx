import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ServiceImageGallery: IServiceImageGalleryProps = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    if (visible && initialIndex !== currentIndex) {
      setCurrentIndex(initialIndex);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }, 100);
    }
  }, [visible, initialIndex]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{uri: item}} style={styles.image} resizeMode="contain" />
      </View>
    );
  };

  if (!visible || images.length === 0) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon2 name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Typography fontWeight="bold" size="md" color="white">
              Gallery
            </Typography>
            <View style={styles.closeButton} />
          </View>

          {/* Image List */}
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => `image-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.flatListContent}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            initialScrollIndex={initialIndex}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: false,
                });
              });
            }}
          />

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.leftNavButton]}
              onPress={goToPrevious}
              activeOpacity={0.7}>
              <Icon name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.rightNavButton]}
              onPress={goToNext}
              activeOpacity={0.7}>
              <Icon name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {/* Counter */}
          <View style={styles.counterContainer}>
            <Typography fontWeight="medium" size="md" color="white">
              {currentIndex + 1} of {images.length}
            </Typography>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(50),
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    zIndex: 10,
  },
  closeButton: {
    width: scale(40),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(600),
  },
  image: {
    width: SCREEN_WIDTH,
    maxWidth: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -verticalScale(25)}],
    width: scale(50),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 10,
  },
  leftNavButton: {
    left: scale(20),
  },
  rightNavButton: {
    right: scale(20),
  },
  counterContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    zIndex: 10,
  },
});

export default ServiceImageGallery;
