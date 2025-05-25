import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import {appStore} from '../shared/stores/appStore';
import offerStyle from './offers/offerStyle';

const Attachment: IAttachment = ({data, canClose = true}) => {
  const [playingVideoUri, setPlayingVideoUri] = React.useState<string | null>(
    null,
  );
  return (
    <React.Fragment>
      {data?.attachment.map((uri, key) => {
        const isVideo =
          uri.endsWith('.mp4') ||
          uri.endsWith('.mov') ||
          uri.endsWith('.avi') ||
          uri.includes('video');

        const isPlaying = playingVideoUri === uri;

        return (
          <View key={key} style={offerStyle.videoContainer}>
            {/* Show video if playing, else show image */}
            {isVideo && isPlaying ? (
              <Video
                source={{uri}}
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
                  source={{uri}}
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
                    onPress={() => setPlayingVideoUri(uri)}
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
                  appStore.toggleGalleryImageSelection(uri);
                  if (playingVideoUri === uri) setPlayingVideoUri(null); // stop playing if removed
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
