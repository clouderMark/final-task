import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useGetAllUserCollectionsMutation} from '../redux/collectionApi';
import ThemedTypography from './ThemedTypography';
import ListItem from './ListItem/ListItem';
import {EPath} from '../types/EPath';
import {selectUser} from './LoginUser/redux/userSlice/userSlice';
import {useAppSelector} from '../redux/hooks';
import {selectDialogWithTitle} from './DialogWithTitle/dialogWithTitleSlice';

const defaultLimit = 12;
const defaultPage = 0;

const AllCollections = () => {
  const {token} = useAppSelector(selectUser);
  const [getData, {data}] = useGetAllUserCollectionsMutation();
  const [page] = useState(defaultPage);
  const [limit] = useState(defaultLimit);
  const {title} = useAppSelector(selectDialogWithTitle);

  useEffect(() => {
    if (token) {
      getData({page, limit, token});
    }
  }, [token, title]);

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3}}>
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
