import {View} from 'react-native';
import {ICheckout} from '../../../../@types/routes';
import Typography from '../../../../components/Typography';
import {verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';

const Checkout: ICheckout = () => {
  const summary = [
    {title: 'Amount', value: 32000},
    {title: 'Service fee', value: 2000},
    {title: 'Total', value: 34000},
  ];

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 7}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          flexDirection: 'column',
          gap: 7,
          marginTop: verticalScale(10),
          borderRadius: 6,
          padding: 16,
        }}>
        <Typography color="#757C91" fontWeight="bold">
          DESCRIPTION
        </Typography>

        <Typography readMore readMoreConstant limit={90} lineHeight={25}>
          I want to make a brazzilian twisting for my wedding, see the
          attachment for sample
        </Typography>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          flexDirection: 'column',
          gap: 7,
          marginTop: verticalScale(10),
          borderRadius: 6,
          padding: 16,
        }}>
        <Typography color="#757C91" fontWeight="bold">
          SUMMARY
        </Typography>

        <View style={{flexDirection: 'column', gap: 10}}>
          {summary.map(({title, value}, key) => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              key={key}>
              {title.toLowerCase() == 'total' ? (
                <Typography color="#757C91" fontWeight="bold">
                  {title}
                </Typography>
              ) : (
                <Typography color="#757C91">{title}</Typography>
              )}

              {title.toLowerCase() == 'total' ? (
                <Typography fontWeight="bold">
                  ₦{utils.numberWithCommas(value)}
                </Typography>
              ) : (
                <Typography>₦{utils.numberWithCommas(value)}</Typography>
              )}
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          flexDirection: 'column',
          gap: 7,
          marginTop: verticalScale(10),
          borderRadius: 6,
          padding: 16,
        }}>
        <Typography color="#757C91" fontWeight="bold">
          PAYMENT OPTIONS
        </Typography>
      </View>
    </View>
  );
};
export default Checkout;
