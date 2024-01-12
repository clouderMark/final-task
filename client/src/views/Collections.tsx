import {Container} from '@mui/material';
import CreateCollection from '../components/CreateCollection';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setShow} from '../components/DialogWithTitle/dialogWithTitleSlice';
import ThemedButton from '../components/ThemedButton';
import {selectLang} from '../components/content/redux/langSlice';
import {content} from '../components/content/content';

const Collections = () => {
  const dispatch = useAppDispatch();
  const {lang} = useAppSelector(selectLang);

  const handleClickPopUp = () => {
    dispatch(setShow({title: content[lang].collection.create}));
  };

  return (
    <Container>
      <ThemedButton onClick={handleClickPopUp} variant="outlined">
        {content[lang].collection.create}
      </ThemedButton>
      <CreateCollection />
    </Container>
  );
};

export default Collections;
