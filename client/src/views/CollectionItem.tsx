import {useEffect} from 'react';
import {Box, Container, IconButton} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {useParams} from 'react-router-dom';
import {useGetOneCollectionMutation, useUpdateCollectionMutation} from '../redux/collectionApi';
import ThemedTypography from '../components/ThemedTypography';
import {GOOGLEAPI} from '../types/EPath';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectLang} from '../components/content/redux/langSlice';
import {content} from '../components/content/content';
import {theme} from '../styles/theme';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import CreateCollection from '../components/CreateCollection/CreateCollection';
import {setShow} from '../components/DialogWithTitle/dialogWithTitleSlice';
import {setData} from '../components/CreateCollection/redux/createCollectionSlice';
import {selectUser} from '../components/LoginUser/redux/userSlice/userSlice';

const CollectionItem = () => {
  const dispatch = useAppDispatch();
  const id: number = Number(useParams().id);
  const [getData, {data}] = useGetOneCollectionMutation();
  const {lang} = useAppSelector(selectLang);
  const {type} = useAppSelector(selectTheme);
  const {id: userId} = useAppSelector(selectUser);

  useEffect(() => {
    getData({id});
  }, [id]);

  const handleEditCLick = () => {
    dispatch(setShow({title: content[lang].collection.edit, id}));
    if (data) {
      dispatch(
        setData({
          name: data.name,
          description: data.description,
          theme: data.theme,
          visible: data.visible,
          props: data.item_prop_types ? data.item_prop_types.map((el) => el.value) : [],
          image: {
            image: null,
            imageUrl: GOOGLEAPI + data.image,
          },
        }),
      );
    }
  };

  return (
    <Container>
      {data ? (
        <>
          {userId === data.userId ? (
            <IconButton onClick={handleEditCLick} sx={{m: 1, color: theme.palette.third[type], ml: 'auto'}}>
              <EditRoundedIcon />
            </IconButton>
          ) : null}
          <Box sx={{display: 'flex'}}>
          </Box>
          <Box sx={{mt: 3}}>
            <Box
              component="img"
              sx={{width: '100%', maxWidth: '700px', mr: 4, float: 'left'}}
              src={GOOGLEAPI + data.image}
            />
            <ThemedTypography component="h2" sx={{fontSize: '24px'}}>
              {data.name}
            </ThemedTypography>
            <ThemedTypography dangerouslySetInnerHTML={{__html: data.description}}></ThemedTypography>
            <ThemedTypography>
              {content[lang].collection.theme}: {data.theme}
            </ThemedTypography>
          </Box>
          <CreateCollection useSubmit={useUpdateCollectionMutation} />
        </>
      ) : (
        <ThemedTypography>ЧТо то пошло не так</ThemedTypography>
      )}
    </Container>
  );
};

export default CollectionItem;
