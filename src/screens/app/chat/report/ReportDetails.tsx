import {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {IReport} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {scale} from '../../../../shared/Scaling';
interface Attachment {
  id: string;
  uri: string;
  type: 'image' | 'document';
  name: string;
  size?: number;
}

const ReportDetails: IReport = ({
  isPending,
  onAttachment,
  onChangeDescription,
  handleSubmit,
  values,
}) => {
  const {width} = Dimensions.get('window');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  console.log(values);

  const showAttachmentOptions = (): void => {
    Alert.alert(
      'Add Attachment',
      'Choose an option',
      [
        {text: 'Photo Library', onPress: openImageLibrary},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const openImageLibrary = (): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
      selectionLimit: 5,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets) {
        const newAttachments: Attachment[] = response.assets.map(asset => ({
          id: Date.now().toString() + Math.random(),
          uri: asset.uri || '',
          type: 'image' as const,
          name: asset.fileName || 'Image',
          size: asset.fileSize,
        }));
        setAttachments(prev => [...prev, ...newAttachments]);
      }
    });
  };

  const removeAttachment = (id: string): void => {
    setAttachments(prev => prev.filter(item => item.id !== id));
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const renderAttachment = (item: Attachment): React.ReactElement => {
    return (
      <View key={item.id} style={styles.attachmentItem}>
        <View style={styles.attachmentContent}>
          {item.type === 'image' ? (
            <Image source={{uri: item.uri}} style={styles.attachmentImage} />
          ) : (
            <View style={styles.documentIcon}>
              <Text style={styles.documentIconText}>📄</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeAttachment(item.id)}>
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Container>
        <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
          <Typography fontWeight="bold" size="xlg">
            Provide more details
          </Typography>
          <Typography fontWeight="regular" size="md" color="gray">
            Tell us more about what happened
          </Typography>
        </View>

        <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
          <CustomInput
            label="Description"
            height={150}
            multiline
            numberOfLines={6}
            value={values?.description}
            placeholder="Describe in detail what happened."
            onChangeText={onChangeDescription}
          />
        </View>
        <View style={styles.container}>
          <Typography
            color="darkGray"
            size="md"
            fontWeight="semibold"
            paddingBottom={8}>
            Include attachments{' '}
            <Typography color="gray"> (Optional)</Typography>
          </Typography>

          <Container flexDirection="row" gap={8}>
            <TouchableOpacity
              style={styles.attachmentButton}
              onPress={showAttachmentOptions}
              activeOpacity={0.7}>
              <View style={styles.attachmentButtonContent}>
                <Assets.Icon />
              </View>
            </TouchableOpacity>

            {attachments.length > 0 && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{height: 100}}
                contentContainerStyle={{flexDirection: 'row', gap: 10}}>
                {attachments.map(renderAttachment)}
              </ScrollView>
            )}
          </Container>
        </View>
      </Container>
      <View
        style={{
          paddingHorizontal: 16,
          marginBottom: 20,
        }}>
        <MainButton
          loading={isPending}
          onPress={() => {
            onAttachment?.(JSON.stringify(attachments.map(p => p.uri)));
            handleSubmit?.();
          }}>
          Submit report
        </MainButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 10,
  },

  attachmentButton: {
    width: 95,
    height: 95,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  attachmentButtonContent: {
    alignItems: 'center',
  },
  attachmentsList: {
    maxHeight: 300,
  },
  attachmentItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachmentContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentImage: {
    width: 92,
    height: 92,
    borderRadius: 6,
    marginRight: 12,
  },
  documentIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginRight: 12,
  },
  documentIconText: {
    fontSize: 20,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  attachmentSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  removeButton: {
    width: 24,
    position: 'absolute',
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
    top: 3,
    left: 75,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportDetails;
