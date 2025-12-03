import {View} from 'react-native';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import dayjs from 'dayjs';
import JobTimelineDto from '../dto/JobTimeline.dto';

interface JobTimelineProps {
  timeline?: JobTimelineDto[];
  isLoading?: boolean;
  status: string;
}

const JobTimeline: React.FC<JobTimelineProps> = ({
  timeline,
  isLoading,
  status,
}) => {
  // Default timeline if no data is provided
  console.log(timeline);

  const timelineData = timeline || [];

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
          const isPending = status === 'in_progress';
          const isCompleted = index != timelineData.length - 1;

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
                  {item.event}
                </Typography>
              </View>
              <Typography size="sm">
                {dayjs(item.createdAt).format('DD MMM, YYYY, hh:mm')}
              </Typography>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default JobTimeline;
