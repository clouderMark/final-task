import {ChangeEvent, useEffect, useState} from 'react';
import {Box, Pagination} from '@mui/material';
import {useGetAllItemsMutation} from '../redux/itemApi';
import ThemedTypography from './ThemedTypography';
import {useAppSelector} from '../redux/hooks';
import {selectLang} from './content/redux/langSlice';
import {content} from './content/content';
import ListItem from './ListItem/ListItem';
import {EPath} from '../types/EPath';

const defaultLimit = 9;
const defaultPage = 1;

const AllCollectionItems = () => {
  const {lang} = useAppSelector(selectLang);
  const [getData, {data}] = useGetAllItemsMutation();
  const [limit] = useState(defaultLimit);
  const [page, setPage] = useState(defaultPage);

  useEffect(() => {
    getData({page: page - 1, limit});
  }, []);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      {data && data.items.length ? (
        <Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3}}>
            {data.items.map((el) => (
              <ListItem
                id={el.id}
                navigateTo={EPath.Item}
                image={el.image}
                key={el.id}
                child={
                  <>
                    <ThemedTypography>{el.authorName}</ThemedTypography>
                    <ThemedTypography>{el.name}</ThemedTypography>
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
        <ThemedTypography sx={{mt: 3}}>{content[lang].listIsEmty}</ThemedTypography>
      )}
    </Box>
  );
};

export default AllCollectionItems;
