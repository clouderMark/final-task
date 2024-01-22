import {ChangeEvent, useEffect, useState} from 'react';
import {Box, Pagination} from '@mui/material';
import {useGetAllUserCollectionsMutation} from '../redux/collectionApi';
import ThemedTypography from './ThemedTypography';
import ListItem from './ListItem/ListItem';
import {EPath} from '../types/EPath';
import {selectUser} from './LoginUser/redux/userSlice/userSlice';
import {useAppSelector} from '../redux/hooks';
import {selectDialogWithTitle} from './DialogWithTitle/dialogWithTitleSlice';

const defaultLimit = 9;
const defaultPage = 1;

const AllCollections = () => {
  const {token} = useAppSelector(selectUser);
  const [getData, {data}] = useGetAllUserCollectionsMutation();
  const [limit] = useState(defaultLimit);
  const {title} = useAppSelector(selectDialogWithTitle);
  const [page, setPage] = useState(defaultPage);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (token) {
      getData({page: page - 1, limit, token});
    }
  }, [token, title, page]);

  return (
    <Box>
      {data ? (
        <Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3}}>
            {data.collections.map((el) => (
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
            ))}
          </Box>
          {Math.ceil(data.numberOfRecords / limit) > 1 ? (
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Pagination
                count={Math.ceil(data.numberOfRecords / limit)}
                showFirstButton
                showLastButton
                onChange={handlePageChange}
                page={page}
              />
            </Box>
          ) : null}
        </Box>
      ) : (
        <ThemedTypography component="p" sx={{mb: 10}}>
          По вашему запросу ничего не найдено
        </ThemedTypography>
      )}
    </Box>
  );
};

export default AllCollections;
