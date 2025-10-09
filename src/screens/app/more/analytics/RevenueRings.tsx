import Svg, {Circle} from 'react-native-svg';

const RevenueRings: IRevenueRings = ({
  earningsProgress = 0.92,
  tipsProgress = 0.65,
  commissionProgress = 0.35,
  earningsColor = '#27A535',
  tipsColor = '#95D21A',
  commissionColor = '#F0443A',
  size = 170,
}) => {
  const center = size / 2;
  const baseStroke = 10;
  const gap = 10;

  const outerRadius = center - baseStroke / 2;
  const middleRadius = outerRadius - (baseStroke + gap);
  const innerRadius = middleRadius - (baseStroke + gap);

  const renderRing = (radius: number, color: string, progress: number) => {
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);
    return (
      <>
        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={'#E8EDF4'}
          strokeWidth={baseStroke}
          fill={'transparent'}
        />
        {/* Progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={baseStroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap={'round'}
          transform={`rotate(-90 ${center} ${center})`}
          fill={'transparent'}
        />
      </>
    );
  };

  return (
    <Svg width={size} height={size}>
      {renderRing(outerRadius, earningsColor, earningsProgress)}
      {renderRing(middleRadius, tipsColor, tipsProgress)}
      {renderRing(innerRadius, commissionColor, commissionProgress)}
    </Svg>
  );
};

export default RevenueRings