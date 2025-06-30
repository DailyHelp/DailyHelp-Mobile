import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import CustomInput from '../../../../../components/customInput/Index';
import MainButton from '../../../../../components/button/MainButton';
import { ColorKeys } from '../../../../../shared/themes/Index';

const RateService = React.forwardRef<ActionSheetRef, IWorkerSuggestion>(
  (props, ref) => {
    const rating = [
      {
        emoji: '😡',
        title: 'Terrible service',
        slug: 'terrible_service',
        color: 'danger',
      },
      {
        emoji: '🤨',
        title: 'Not so great service',
        slug: 'not_so_great_service',
        color: 'danger',
      },
      {
        emoji: '🙂',
        title: 'Okay service',
        slug: 'okay_service',
        color: 'orange',
      },
      {
        emoji: '😀',
        title: 'Good service',
        slug: 'good_service',
        color: 'lightGreen',
      },
      {
        emoji: '🤩',
        title: 'Excellent service',
        slug: 'excellent_service',
        color: 'lightGreen',
      },
    ];

    const tips = [1000, 2000, 3000, 4000];

    return (
      <ActionSheet ref={ref} gestureEnabled>
        <View style={{backgroundColor: 'white', padding: scale(5)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Icon name="close" color={'#757C91'} size={15} />
          </View>
          {/* Header */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: scale(20),
            }}>
            <Typography fontWeight="bold" size="lg">
              Rate service provider
            </Typography>
          </View>

          <View style={{borderTopWidth: 1, borderBlockStartColor: '#F1F2F4'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  padding: scale(10),
                  flexDirection: 'column',
                  gap: 7,
                  width: '60%',
                }}>
                <Typography fontWeight="semibold" size="lg">
                  How did Amarachi perform?
                </Typography>
                <Typography color="gray" size="md">
                  Tell us about your experience working with them.
                </Typography>
              </View>

              <CustomAvatar
                badgeSize={30}
                avatarSize={70}
                data={{image: Assets.Worker1}}
              />
            </View>
          </View>
          <Formik initialValues={{rate: '', tip: ''}} onSubmit={() => {}}>
            {({values: v, handleChange}) => (
              <React.Fragment>
                <ScrollView>
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderBlockStartColor: '#F1F2F4',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: scale(20),
                      }}>
                      {rating.map(({emoji}, ind) => (
                        <TouchableOpacity
                          key={ind}
                          onPress={() => handleChange('rate')(ind.toString())}>
                          <View
                            style={{
                              padding: scale(16),
                              backgroundColor:
                                v.rate === ind.toString()
                                  ? '#F9FFEB'
                                  : '#F9F9FB',
                              borderRadius: 10,
                              borderWidth: v.rate === ind.toString() ? 1 : 0,
                              borderColor: '#95D21A',
                            }}>
                            <Typography>{emoji}</Typography>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {v.rate && (
                      <Typography
                        textAlign="center"
                        size="m3d"
                        fontWeight="semibold"
                        paddingBottom={verticalScale(15)}
                        color={rating[+v.rate].color as ColorKeys}>
                        {rating[+v.rate].title}
                      </Typography>
                    )}
                  </View>

                  <View
                    style={{
                      borderTopWidth: 1,
                      borderBlockStartColor: '#F1F2F4',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 30,
                        padding: scale(20),
                      }}>
                      <CustomInput
                        numberOfLines={5}
                        height={verticalScale(150)}
                        multiline
                        placeholder="They did exceptionally great!"
                        label="Tell us more"
                      />

                      <View
                        style={{
                          flexDirection: 'column',
                          gap: 5,
                        }}>
                        <Typography fontWeight="semibold" size="md">
                          Tip them
                        </Typography>
                        <Typography color="gray">
                          They get 100% of every tip
                        </Typography>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        {tips.map((tip, ind) => (
                          <TouchableOpacity
                            key={ind}
                            onPress={() => handleChange('tip')(tip.toString())}>
                            <View
                              style={{
                                padding: scale(16),
                                backgroundColor:
                                  v.tip === tip.toString()
                                    ? '#F9FFEB'
                                    : '#F9F9FB',
                                borderRadius: 10,
                                borderWidth: v.tip === tip.toString() ? 1 : 0,
                                borderColor: '#95D21A',
                              }}>
                              <Typography currency>{tip}</Typography>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          gap: 5,
                        }}>
                        <Typography size="md">Wallet balance</Typography>
                        <View></View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
                <View style={{padding: scale(10)}}>
                  <MainButton>Rate service provider</MainButton>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </ActionSheet>
    );
  },
);
export default RateService;
