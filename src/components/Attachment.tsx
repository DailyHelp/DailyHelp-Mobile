import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import {appStore} from '../shared/stores/appStore';
import offerStyle from './offers/offerStyle';

const Attachment: IAttachment = ({data, canClose = true, onClose}) => {
  const [playingVideoUri, setPlayingVideoUri] = React.useState<string | null>(
    null,
  );
  return (
    <React.Fragment>
      {data?.attachment
        .filter(uri => uri && typeof uri === 'string' && uri.trim().length > 0)
        .map((uri, key) => {
          const trimmedUri = uri.trim();
          const isVideo =
            trimmedUri.endsWith('.mp4') ||
            trimmedUri.endsWith('.mov') ||
            trimmedUri.endsWith('.avi') ||
            trimmedUri.includes('video');

          const isPlaying = playingVideoUri === trimmedUri;

          return (
          <View
            key={key + new Date().toISOString()}
            style={offerStyle.videoContainer}>
            {/* Show video if playing, else show image */}
            {isVideo && isPlaying ? (
              <Video
                source={{uri: trimmedUri}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
                resizeMode="cover"
                muted={false}
                repeat
                controls={false} // can enable native controls if you prefer
              />
            ) : (
              <>
                <Image
                  source={{uri: trimmedUri}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />

                {/* Play Icon Overlay */}
                {isVideo && (
                  <TouchableOpacity
                    onPress={() => setPlayingVideoUri(trimmedUri)}
                    activeOpacity={0.7}
                    style={offerStyle.playButton}>
                    <Icon name="playcircleo" size={24} color="#FFF" />
                  </TouchableOpacity>
                )}
              </>
            )}

            {/* Close Icon */}
            {canClose && (
              <TouchableOpacity
                onPress={() => {
                  appStore.toggleGalleryImageSelection(trimmedUri);
                  if (playingVideoUri === trimmedUri) setPlayingVideoUri(null); // stop playing if removed
                  onClose?.(trimmedUri);
                }}
                style={offerStyle.cancelButton}>
                <Icon name="closecircle" size={18} color="#F00" />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </React.Fragment>
  );
};
export default Attachment;
