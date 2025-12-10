import {observer} from 'mobx-react-lite';
import React from 'react';
import {appStore} from '../shared/stores/appStore';
import offerStyle from './offers/offerStyle';
import {TouchableOpacity, View} from 'react-native';
import Attachment from './Attachment';
import Typography from './Typography';
import Assets from '../assets/Assets';
import Icon from 'react-native-vector-icons/AntDesign';
import utils from '../shared/Utils';

const AttachmentContainer: IAttachmentContainer = ({
  openGallery,
  allowUpload = true,
  children,
  data,
  canClose
}) => {
  React.useEffect(() => {
    utils.hasAndroidPermission().then(console.log);
  }, []);
  
  const attachment = data || appStore.selectedGalleryImages;

  return (
    <React.Fragment>
      {attachment.length > 0 ? (
        <View style={offerStyle.galleryContainer}>
          {/* Plus Button */}
          {allowUpload && (
            <TouchableOpacity onPress={() => openGallery?.()}>
              <View style={offerStyle.plusContainer}>
                <Icon name="plus" size={24} color="#757C91" />
              </View>
            </TouchableOpacity>
          )}

          <Attachment data={{attachment}} canClose={canClose} />
        </View>
      ) : (
        // Dashed upload box
        allowUpload && (
          <TouchableOpacity onPress={() => openGallery?.()}>
            {children || (
              <View style={offerStyle.attachmentButton}>
                <Assets.Camera />
                <Typography fontWeight="medium" size="lg">
                  Attachment
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        )
      )}
    </React.Fragment>
  );
};
export default React.memo(observer(AttachmentContainer));
