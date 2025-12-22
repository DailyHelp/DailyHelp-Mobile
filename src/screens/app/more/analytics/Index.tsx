import dayjs from 'dayjs';
import React, {useMemo, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import {IAnalytics} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import {scale} from '../../../../shared/Scaling';
import {Colors} from '../../../../shared/themes/Index';
import utils from '../../../../shared/Utils';
import MultipleProgressBar from './MultipleProgressBar';
import RevenueLabel from './RevenueLabel';
import RevenueRings from './RevenueRings';
import TipsContainer from './TipsContainer';
import SectionBorderSeparatedCard from '../../../../components/SectionBorderSeparatedCard';
import moreService from '../services/More.service';

const Analytics: IAnalytics = ({navigation}) => {
  utils.useHideBottomTab(navigation);

  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  // Close the date filter sheet when user navigates away from analytics page
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Cleanup: close the sheet when screen loses focus
        SheetManager.hide('CustomDateFilter');
      };
    }, []),
  );

  // Calculate date ranges for predefined filters
  const getDateRangeForFilter = (filter: string): {startDate?: Date; endDate?: Date} => {
    const now = dayjs();
    
    switch (filter) {
      case 'Today': {
        const start = now.startOf('day').toDate();
        const end = now.endOf('day').toDate();
        return {startDate: start, endDate: end};
      }
      case 'Current week': {
        const start = now.startOf('week').toDate();
        const end = now.endOf('week').toDate();
        return {startDate: start, endDate: end};
      }
      case 'Last week': {
        const lastWeek = now.subtract(1, 'week');
        const start = lastWeek.startOf('week').toDate();
        const end = lastWeek.endOf('week').toDate();
        return {startDate: start, endDate: end};
      }
      case 'This month': {
        const start = now.startOf('month').toDate();
        const end = now.endOf('month').toDate();
        return {startDate: start, endDate: end};
      }
      case 'This Year': {
        const start = now.startOf('year').toDate();
        const end = now.endOf('year').toDate();
        return {startDate: start, endDate: end};
      }
      case 'All time':
        return {}; // No date range for all time
      default:
        return {};
    }
  };

  // Calculate dates based on selected filter
  const {startDate, endDate} = useMemo(() => {
    if (selectedDateFilter === 'Custom date') {
      return {
        startDate: customStartDate,
        endDate: customEndDate,
      };
    }
    return getDateRangeForFilter(selectedDateFilter);
  }, [selectedDateFilter, customStartDate, customEndDate]);

  const {analytics} = moreService.useAnalytics(startDate, endDate);

  console.log(analytics);
  

  const dateFilters = [
    'Custom date',
    'Today',
    'Current week',
    'Last week',
    'This month',
    'This Year',
    'All time',
  ];

  const handleDateFilterPress = async (filter: string) => {
    if (filter === 'Custom date') {
      const result = await SheetManager.show('CustomDateFilter', {
        payload: {
          startDate: customStartDate,
          endDate: customEndDate,
        },
      });
      if (result?.startDate || result?.endDate) {
        setSelectedDateFilter('Custom date');
        setCustomStartDate(result?.startDate);
        setCustomEndDate(result?.endDate);
      }
    } else {
      setSelectedDateFilter(filter);
      // Clear custom dates when selecting a predefined filter
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
  };

  // Revenue data and progress (0-1) for rings to match mock
  const revenueProgress = {
    earnings: analytics?.data.revenue.rings.earnings,
    tips: analytics?.data.revenue.rings.tips,
    commission: analytics?.data.revenue.rings.commission,
  };
  const revenueAmounts = {
    earnings: `₦${analytics?.data.revenue.rings.earnings || 0}`,
    tips: `+ ₦${analytics?.data.revenue.rings.tips || 0}`,
    commission: `- ₦${analytics?.data.revenue.rings.commission || 0}`,
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
        {/* Date Filter */}
        <View style={{padding: scale(16), backgroundColor: Colors.lightGrey}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', gap: 8}}>
              {dateFilters.map((filter, index) => {
                const isActive = selectedDateFilter === filter;
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: scale(10),
                      paddingHorizontal: scale(16),
                      borderWidth: isActive ? .5 : 0,
                      borderColor: isActive ? Colors.lemonGreen : 'transparent',
                      backgroundColor: isActive ? Colors.lightPrimary : Colors.white,
                    }}
                    onPress={() => handleDateFilterPress(filter)}>
                    <Typography
                      textAlign="center"
                      color={'gray'}
                      fontWeight={isActive ? 'bold' : 'regular'}
                      size="sm">
                      {filter}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
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
                  earningsProgress={revenueProgress.earnings || 0}
                  tipsProgress={revenueProgress.tips || 0}
                  commissionProgress={revenueProgress.commission || 0}
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
                amount={analytics?.data.revenue.breakdown.jobPayment || 0}
                title="Job payment"
              />
              <SectionBorderSeparatedCard
                amount={analytics?.data.revenue.breakdown.tips || 0}
                title="Tips"
              />

              <SectionBorderSeparatedCard
                amount={analytics?.data.revenue.breakdown.income || 0}
                title="Income"
                isBold
              />
              <SectionBorderSeparatedCard
                amount={analytics?.data.revenue.breakdown.commissionRate || 0}
                title=" DailyHelp commission"
              />
              <SectionBorderSeparatedCard
                amount={`${analytics?.data.revenue.breakdown.deductions || 0}%`}
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
                <Typography size="sm" fontWeight="bold" currency>
                  {analytics?.data.revenue.breakdown.yourEarnings || 0}
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
              {analytics?.data.jobs.total || 0}
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
                  {analytics?.data.jobs.completed || 0}
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
                  {analytics?.data.jobs.canceled || 0}
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
                  {analytics?.data.jobs.disputed || 0}
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
                  {analytics?.data.offers.accepted || 0}/
                  {analytics?.data.offers.total || 0}
                </Typography>
              </Container>
              <Container gap={7}>
                <Typography size="md" color="gray">
                  Acceptance rate
                </Typography>
                <Typography size="lg" fontWeight="medium" textAlign="center">
                  {analytics?.data.offers.acceptanceRate || 0}%
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
                <Typography size="sm">
                  {analytics?.data.offers.breakdown.youAccepted.count || 0} (
                  {analytics?.data.offers.breakdown.youAccepted.percent}%)
                </Typography>
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
                <Typography size="sm">
                  {analytics?.data.offers.breakdown.youDeclined.count || 0} (
                  {analytics?.data.offers.breakdown.youDeclined.percent}%)
                </Typography>
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
                <Typography size="sm">
                  {analytics?.data.offers.breakdown.youCancelled.count || 0} (
                  {analytics?.data.offers.breakdown.youCancelled.percent}%)
                </Typography>
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
                <Typography size="sm">
                  {analytics?.data.offers.breakdown.clientDeclined.count || 0} (
                  {analytics?.data.offers.breakdown.clientDeclined.percent}%)
                </Typography>
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
                <Typography size="sm">
                  {analytics?.data.offers.breakdown.clientCancelled.count || 0}(
                  {analytics?.data.offers.breakdown.clientCancelled.percent}%)
                </Typography>
              </View>
            </View>
          </Container>
        </View>
      </ScrollView>
    </View>
  );
};

export default Analytics;
