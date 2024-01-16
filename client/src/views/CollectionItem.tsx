import {useEffect} from 'react';
import {Container} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useGetOneCollectionMutation} from '../redux/collectionApi';
import ThemedTypography from '../components/ThemedTypography';

const CollectionItem = () => {
  const id: number = Number(useParams().id);
  const [getData, {data}] = useGetOneCollectionMutation();

  useEffect(() => {
    getData({id});
  }, [id]);

  return (
    <Container>
      {data ? (
        <ThemedTypography>{data.name}</ThemedTypography>
      ) : (
        <ThemedTypography>ЧТо то пошло не так</ThemedTypography>
      )}
    </Container>
  );
};

export default CollectionItem;
