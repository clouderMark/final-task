import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useGetAllCollectionsMutation} from '../redux/collectionApi';
import ThemedTypography from './ThemedTypography';
import ListItem from './ListItem/ListItem';
import {EPath} from '../types/EPath';

const defaultLimit = 12;
const defaultPage = 0;

const AllCollections = () => {
  const [getData, {data}] = useGetAllCollectionsMutation();
  const [page] = useState(defaultPage);
  const [limit] = useState(defaultLimit);

  useEffect(() => {
    getData({page, limit});
  }, []);

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      {data ? (
        data.collections.map((el) => (
          <ListItem
            id={el.id}
            navigateTo={EPath.Collection}
            image={el.image}
            key={el.id}
            child={
              <>
                <ThemedTypography>{el.name}</ThemedTypography>
                <ThemedTypography>{el.theme}</ThemedTypography>
              </>
            }
          />
        ))
      ) : (
        <ThemedTypography component="p" sx={{mb: 10}}>
          По вашему запросу ничего не найдено
        </ThemedTypography>
      )}
    </Box>
  );
};

export default AllCollections;
