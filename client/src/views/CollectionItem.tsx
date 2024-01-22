import {useEffect} from 'react';
import {Box, Container, IconButton} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {useNavigate, useParams} from 'react-router-dom';
import {
  useDeleteCollectionMutation,
  useGetOneCollectionMutation,
  useUpdateCollectionMutation,
} from '../redux/collectionApi';
import ThemedTypography from '../components/ThemedTypography';
import {EPath, GOOGLEAPI} from '../types/EPath';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectLang} from '../components/content/redux/langSlice';
import {content} from '../components/content/content';
import {theme} from '../styles/theme';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import CreateCollection from '../components/CreateCollection/CreateCollection';
import {selectDialogWithTitle, setShow} from '../components/DialogWithTitle/dialogWithTitleSlice';
import {setData} from '../components/CreateCollection/redux/createCollectionSlice';
import {selectUser} from '../components/LoginUser/redux/userSlice/userSlice';

const CollectionItem = () => {
  const dispatch = useAppDispatch();
  const id: number = Number(useParams().id);
  const {token} = useAppSelector(selectUser);
  const [getData, {data}] = useGetOneCollectionMutation();
  const [deleteItem, {isSuccess: isDeleteSuccess}] = useDeleteCollectionMutation();
  const {lang} = useAppSelector(selectLang);
  const {type} = useAppSelector(selectTheme);
  const {id: userId} = useAppSelector(selectUser);
  const navigate = useNavigate();
  const {title} = useAppSelector(selectDialogWithTitle);

  useEffect(() => {
    getData({id});
  }, [id, title]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(EPath.Collections, {replace: true});
    }
  }, [isDeleteSuccess]);

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

  const handleDeleteCLick = () => {
    deleteItem({token, id});
  };

  return (
    <Container>
      {data ? (
        <>
          {userId === data.userId ? (
            <Box sx={{display: 'flex'}}>
              <IconButton onClick={handleEditCLick} sx={{m: 1, color: theme.palette.third[type], ml: 'auto'}}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton onClick={handleDeleteCLick} sx={{m: 1, color: theme.palette.third[type]}}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Box>
          ) : null}
          <Box sx={{mt: 3}}>
            {data.image.length ? (
              <Box
                component="img"
                sx={{
                  width: '100%',
                  maxWidth: '700px',
                  mr: 4,
                  float: 'left',
                }}
                src={GOOGLEAPI + data.image}
              />
            ) : null}
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
