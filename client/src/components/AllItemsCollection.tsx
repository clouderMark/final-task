import {useEffect} from 'react';
import {Box} from '@mui/system';
import {selectCollection} from '../redux/collectionApi';
import {useAppSelector} from '../redux/hooks';
import {useGetItemsByIdMutation} from '../redux/itemApi';
import ThemedTypography from './ThemedTypography';
import {EPath} from '../types/EPath';
import {content} from './content/content';
import ListItem from './ListItem/ListItem';
import {selectLang} from './content/redux/langSlice';

const AllItemsCollection = () => {
  const {id} = useAppSelector(selectCollection);
  const [getItems, {data}] = useGetItemsByIdMutation();
  const {lang} = useAppSelector(selectLang);

  useEffect(() => {
    if (id) {
      getItems({id});
    }
  }, []);

  return (
    <>
      {data?.length ? (
        <Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3}}>
            {data.map((el) => (
              <ListItem
                id={el.id}
                navigateTo={EPath.Item}
                image={el.image}
                key={el.id}
                child={
                  <>
                    <ThemedTypography>{el.name}</ThemedTypography>
                  </>
                }
              />
            ))}
          </Box>
        </Box>
      ) : (
        <ThemedTypography component="p" sx={{mb: 10, mt: 3}}>
          {content[lang].listIsEmty}
        </ThemedTypography>
      )}
    </>
  );
};

export default AllItemsCollection;
