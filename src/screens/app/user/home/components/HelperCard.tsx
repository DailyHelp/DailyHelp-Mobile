import {Card} from 'react-native-paper';

const HelperCard: IHelperCard = ({image}) => {
  return (
    <Card mode="elevated">
      <Card.Cover source={image} />
    </Card>
  );
};
export default HelperCard;
