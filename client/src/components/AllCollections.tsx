import {ChangeEvent, useEffect, useState} from 'react';
import {Box, Pagination} from '@mui/material';
import {useGetAllUserCollectionsMutation} from '../redux/collectionApi';
import ThemedTypography from './ThemedTypography';
import ListItem from './ListItem/ListItem';
import {EPath} from '../types/EPath';
import {selectUser} from './LoginUser/redux/userSlice/userSlice';
import {useAppSelector} from '../redux/hooks';
import {selectCollection} from './CreateCollection/redux/createCollectionSlice';
import {content} from './content/content';
import {selectLang} from './content/redux/langSlice';

const defaultLimit = 9;
const defaultPage = 1;

const AllCollections = () => {
  const {token} = useAppSelector(selectUser);
  const {lang} = useAppSelector(selectLang);
  const [getData, {data}] = useGetAllUserCollectionsMutation();
  const [limit] = useState(defaultLimit);
  const {title} = useAppSelector(selectCollection);
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
        <ThemedTypography component="p" sx={{mb: 10, mt: 3}}>
          {content[lang].listIsEmty}
        </ThemedTypography>
      )}
    </Box>
  );
};

export default AllCollections;
