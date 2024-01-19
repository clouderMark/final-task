import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import {card} from './styles';

interface IProps {
  navigateTo: string;
  id: string | number;
  image: string;
  child: JSX.Element;
}

const ListItem = (props: IProps) => {
  const {image, child, id, navigateTo} = props;
  const navigate = useNavigate();

  return (
    <Card sx={card.card} onClick={() => navigate(`/${navigateTo}/${id}`)}>
      {image ? (
        <CardMedia sx={card.img} component="img" image={image} />
      ) : (
        <CardMedia sx={card.img} component="img" image="http://via.placeholder.com/335" />
      )}
      <CardContent sx={card.content}>
        <Typography sx={card.title} component="strong">
          {child}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ListItem;
