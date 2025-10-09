import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IAnalytics} from '../../../../@types/routes';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import SectionBorderSeparatedCard from '../../../../components/SectionBorderSeperatedCard';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import MultipleProgressBar from './MultipleProgressBar';
import RevenueLabel from './RevenueLabel';
import RevenueRings from './RevenueRings';
import TipsContainer from './TipsContainer';
import {Colors} from '../../../../shared/themes/Index';

const Analytics: IAnalytics = ({navigation}) => {
  utils.useHideBottomTab(navigation);

  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');

  const dateFilters = ['Today', 'Current week', 'Last week', 'This month'];

  // Revenue data and progress (0-1) for rings to match mock
  const revenueProgress = {
    earnings: 0.92,
    tips: 0.65,
    commission: 0.35,
  };
  const revenueAmounts = {
    earnings: '₦2,020,000',
    tips: '+ ₦20,000',
    commission: '- ₦200,000',
  };

  const tipsData = [
    {
      title: 'Complete more jobs',
      description: "The more jobs you finish, the more offers you'll get.",
    },
    {
      title: 'Respond to offers quickly',
      description: 'Fast replies help you appear more reliable to clients.',
    },
    {
      title: 'Avoid last-minute cancellations',
      description: 'Too many cancellations reduce your visibility.',
    },
    {
      title: 'Keep your availability updated',
      description: "This helps clients send offers when you're truly free.",
    },
    {
      title: 'Maintain a high job rating',
      description: 'Good ratings push your profile higher in search results.',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#F9F9FB'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Date Filter - EXACTLY as in image */}
        <View style={{padding: scale(16), backgroundColor: 'white'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', gap: 5}}>
              {dateFilters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'column',
                    borderRadius: 15,
                    alignItems: 'center',
                    padding: scale(13),
                    borderWidth: 1,
                    borderColor:
                      selectedDateFilter === filter
                        ? Colors['primary']
                        : 'transparent',
                    backgroundColor:
                      selectedDateFilter === filter
                        ? Colors['lightPrimary']
                        : 'transparent',
                  }}
                  onPress={() => setSelectedDateFilter(filter)}>
                  <Typography
                    textAlign="center"
                    color={'gray'}
                    fontWeight={
                      selectedDateFilter === filter ? 'bold' : 'regular'
                    }>
                    {filter}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Revenue Section - EXACTLY as in image */}
        <View style={{padding: scale(16)}}>
          <Typography
            size="md"
            fontWeight="bold"
            color="gray"
            marginBottom={20}>
            Revenue
          </Typography>

          <Container marginBottom={20}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{paddingVertical: 10, paddingLeft: 6}}>
                <RevenueRings
                  earningsProgress={revenueProgress.earnings}
                  tipsProgress={revenueProgress.tips}
                  commissionProgress={revenueProgress.commission}
                />
              </View>
              <RevenueLabel
                earnings={revenueAmounts.earnings}
                tips={revenueAmounts.tips}
                commission={revenueAmounts.commission}
              />
            </View>
          </Container>

          {/* Breakdown Card - EXACTLY as in image */}
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: scale(16),
              marginBottom: 20,
            }}>
            <Typography size="md" fontWeight="bold" marginBottom={15}>
              Breakdown
            </Typography>

            <View style={{gap: 16, marginTop: 10}}>
              <SectionBorderSeparatedCard
                amount={2200000}
                title="Job payment"
              />
              <SectionBorderSeparatedCard amount={22000} title="Tips" />

              <SectionBorderSeparatedCard
                amount={2200000}
                title="Income"
                isBold
              />
              <SectionBorderSeparatedCard
                amount={200000}
                title=" DailyHelp commission"
              />
              <SectionBorderSeparatedCard
                amount={'10%'}
                title=" Deductions"
                isBold
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                }}>
                <Typography size="sm" fontWeight="bold">
                  Your earnings
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm" fontWeight="bold">
                  ₦2,020,000
                </Typography>
              </View>
            </View>
          </View>

          <TipsContainer data={tipsData} />

          {/* Jobs Section - EXACTLY as in image */}
          <Typography size="sm" color="gray" fontWeight="bold">
            JOBS
          </Typography>

          <View
            style={{
              backgroundColor: '#27A535',
              borderRadius: 10,
              padding: scale(16),
              marginBottom: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Typography size="sm" fontWeight="bold" color="white">
              Total Jobs
            </Typography>
            <Typography size="sm" fontWeight="bold" color="white">
              54
            </Typography>
          </View>

          <Container
            backgroundColor="white"
            borderRadius={15}
            padding={scale(16)}
            marginBottom={20}>
            <View style={{gap: 16}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                }}>
                <Typography size="sm" color="gray">
                  Completed Jobs
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm" fontWeight="bold">
                  48
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                }}>
                <Typography size="sm" color="gray">
                  Canceled Jobs
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm" fontWeight="bold">
                  3
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                }}>
                <Typography size="sm" color="gray">
                  Disputed Jobs
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm" fontWeight="bold">
                  3
                </Typography>
              </View>
            </View>
          </Container>

          {/* Offers Section - EXACTLY as in image */}
          <Typography
            size="sm"
            color="gray"
            fontWeight="bold"
            marginBottom={20}>
            OFFERS
          </Typography>

          <Container
            backgroundColor="white"
            marginTop={10}
            borderRadius={15}
            padding={scale(16)}
            marginBottom={20}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Container gap={7}>
                <Typography size="md" color="gray">
                  Offers
                </Typography>
                <Typography size="lg" fontWeight="medium">
                  54/80
                </Typography>
              </Container>
              <Container gap={7}>
                <Typography size="md" color="gray">
                  Acceptance rate
                </Typography>
                <Typography size="lg" fontWeight="medium">
                  67.5%
                </Typography>
              </Container>
            </View>

            {/* Horizontal Bar Chart - EXACTLY as in image */}
            <MultipleProgressBar />

            {/* Color-coded legend - EXACTLY as in image */}
            <View style={{gap: 15}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#27A535',
                    borderRadius: 2,
                  }}
                />
                <Typography size="sm" color="gray">
                  You accepted
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm"> 54 (67.5%)</Typography>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#FF6B01',
                    borderRadius: 2,
                  }}
                />
                <Typography size="sm" color="gray">
                  You declined
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm">6 (7.5%)</Typography>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#F0443A',
                    borderRadius: 2,
                  }}
                />
                <Typography size="sm" color="gray">
                  You cancelled
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm">4 (5%)</Typography>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#FFD100',
                    borderRadius: 2,
                  }}
                />
                <Typography size="sm" color="gray">
                  Client declined
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm">6 (7.5%)</Typography>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#757C91',
                    borderRadius: 2,
                  }}
                />
                <Typography size="sm" color="gray">
                  Client cancelled
                </Typography>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginHorizontal: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6DBE7',
                    borderStyle: 'dashed',
                  }}
                />
                <Typography size="sm">10 (12.5%)</Typography>
              </View>
            </View>
          </Container>
        </View>
      </ScrollView>
    </View>
  );
};

export default Analytics;
