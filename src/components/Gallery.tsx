import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  FlatList,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {scale, verticalScale} from '../shared/Scaling';
import {appStore} from '../shared/stores/appStore';
import utils from '../shared/Utils';
import Typography from './Typography';

const Gallery = React.forwardRef<ActionSheetRef, IGallery>(
  (props, bottomSheetRef) => {
    const [images, setImages] = React.useState<PhotoIdentifier[]>([]);
    const [cursor, setCursor] = React.useState('');
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [playingVideoUri, setPlayingVideoUri] = React.useState<string | null>(
      null,
    );

    const fetchPhotos = async (page?: number) => {
      if (!hasNextPage) return;
      setLoading(true);
      const response = await utils.getPhotos(page);
      const newPhotos = response.edges;

      // Filter duplicates
      setImages(prev => {
        const existingUris = new Set(prev.map(img => img.node.image.uri));
        const uniquePhotos = newPhotos.filter(
          img => !existingUris.has(img.node.image.uri),
        );
        return [...prev, ...uniquePhotos];
      });

      setCursor(response.page_info.end_cursor!);
      setHasNextPage(response.page_info.has_next_page);
      setLoading(false);
    };

    React.useEffect(() => {
      fetchPhotos();
    }, []);

    const selectedImages =
      props.selectedImages ?? appStore.selectedGalleryImages;

    const toggleSelection = React.useCallback(
      (uri: string) => {
        if (props.toggleGalleryImageSelection) {
          props.toggleGalleryImageSelection(uri);
        } else {
          appStore.toggleGalleryImageSelection(uri);
        }
      },
      [props.toggleGalleryImageSelection],
    );

    const renderItem = ({item}: {item: any}) => {
      if (item?.isCamera) {
        return (
          <TouchableOpacity
            style={{
              width: scale(90),
              height: verticalScale(90),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#eee',
              margin: 2,
            }}>
            <Icon name="camera-outline" size={30} color="#999" />
          </TouchableOpacity>
        );
      }

      const uri = item.node.image.uri;
      const type = item.node.type;
      const isVideo = type?.startsWith('video/');
      const isSelected = selectedImages.includes(uri);
      const isPlaying = playingVideoUri === uri;

      return (
        <TouchableOpacity
          onPress={async () => {
            const selectedCount = selectedImages.length;
            if (
              props.maxSelect &&
              !isSelected &&
              selectedCount >= props.maxSelect
            ) {
              return;
            }

            if (isSelected) {
              toggleSelection(uri);
              return;
            }

            if (props.selectImages) {
              try {
                await props.selectImages?.(uri);
                toggleSelection(uri);
              } catch (error) {
                console.error('Failed to select image:', error);
              }
            } else {
              toggleSelection(uri);
            }
          }}
          style={{margin: 1, position: 'relative'}}>
          {isVideo && isPlaying ? (
            <Video
              source={{uri}}
              style={{
                width: scale(92),
                height: verticalScale(92),
                opacity: isSelected ? 0.5 : 1,
              }}
              muted={false}
              resizeMode="cover"
              repeat
            />
          ) : (
            <>
              <Image
                source={{uri}}
                style={{
                  width: scale(92),
                  height: verticalScale(92),
                  opacity: isSelected ? 0.5 : 1,
                }}
                resizeMode="cover"
              />

              {isVideo && (
                <TouchableOpacity
                  onPress={() => setPlayingVideoUri(uri)}
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  activeOpacity={0.8}>
                  <Icon name="play-circle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </>
          )}

          {isSelected && (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: 12,
                padding: 2,
              }}>
              <Icon name="checkmark-circle" size={20} color="#4ADE80" />
            </View>
          )}
        </TouchableOpacity>
      );
    };

    const loadMore = React.useCallback(() => {
      if (hasNextPage && !loading) {
        fetchPhotos(+cursor + 10);
      }
    }, [cursor, hasNextPage, loading]);

    return (
      <ActionSheet 
        ref={bottomSheetRef} 
        gestureEnabled 
        closable={false}
        overlayColor="black"
        defaultOverlayOpacity={0.5}>
        <View style={{paddingBottom: 20}}>
          {/* Header */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props?.close?.()}>
              <Typography fontWeight="bold" size="md" color="gray">
                Cancel
              </Typography>
            </TouchableOpacity>
            <Typography fontWeight="bold" size="md" color="darkGray">
              Image gallery
            </Typography>

            <TouchableOpacity
              onPress={() => {
                props?.close?.();
              }}>
              <Typography fontWeight="bold" size="md" color="gray">
                Attach
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Gallery or Loading */}
          <View style={{maxHeight: '95%', marginTop: 12}}>
            {loading && images.length === 0 ? (
              <ActivityIndicator size="large" color="#999" />
            ) : (
              <FlatList
                data={[{isCamera: true}, ...images]}
                extraData={selectedImages}
                initialNumToRender={12}
                maxToRenderPerBatch={8}
                windowSize={5}
                numColumns={4}
                keyExtractor={(item: any, index) =>
                  item.isCamera ? `camera-${index}` : item.node.image.uri
                }
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 40,
                }}
              />
            )}
          </View>
        </View>
      </ActionSheet>
    );
  },
);

export default observer(Gallery);
