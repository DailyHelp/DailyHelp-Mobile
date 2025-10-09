import {View} from 'react-native';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import dayjs from 'dayjs';

interface JobTimelineProps {
  timeline?: any[];
  isLoading?: boolean;
}

const JobTimeline: React.FC<JobTimelineProps> = ({timeline, isLoading}) => {
  // Default timeline if no data is provided
  const defaultTimeline = [
    {
      action: 'Offer Accepted',
      date: '23 Mar, 2025, 09:30',
      status: 'completed',
    },
    {action: 'Job Start', date: '23 Mar, 2025, 09:30', status: 'completed'},
    {action: 'Job End', date: 'In-progress', status: 'pending'},
  ];

  const timelineData = timeline || defaultTimeline;

  if (isLoading) {
    return (
      <View
        style={{
          flexDirection: 'column',
          gap: 7,
          padding: scale(10),
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <Typography fontWeight="bold" color="lightBlack">
          JOB TIMELINE
        </Typography>
        <Typography size="md" color="gray">
          Loading timeline...
        </Typography>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 7,
        padding: scale(10),
        borderRadius: 10,
        backgroundColor: 'white',
      }}>
      <Typography fontWeight="bold" color="lightBlack">
        JOB TIMELINE
      </Typography>

      <View style={{flexDirection: 'column', gap: 21}}>
        {timelineData.map((item, index) => {
          const isLast = index === timelineData.length - 1;
          const nextItem = timelineData[index + 1];
          const showLine = !isLast;
          const isPending = nextItem?.status === 'pending';
          const isCompleted = item.status === 'completed';

          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8,
                }}>
                <View style={{width: scale(20), alignItems: 'center'}}>
                  <Icon
                    name={isCompleted ? 'checkmark-circle' : 'time-outline'}
                    size={scale(20)}
                    color={!isCompleted ? '#757C91' : '#3B4152'}
                  />
                  {showLine && (
                    <View
                      style={{
                        height: verticalScale(20),
                        width: scale(1),
                        borderStyle: isPending ? 'dashed' : 'solid',
                        borderWidth: scale(0.5),
                        borderColor: isPending ? '#757C91' : '#3B4152',
                        position: 'absolute',
                        top: verticalScale(22),
                        left: scale(10),
                      }}
                    />
                  )}
                </View>
                <Typography size="md" color="gray">
                  {item.action}
                </Typography>
              </View>
              <Typography size="sm">{item.date}</Typography>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default JobTimeline;
