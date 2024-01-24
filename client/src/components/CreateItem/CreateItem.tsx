import {ChangeEvent, FormEvent, useEffect} from 'react';
import {Box} from '@mui/material';
import DialogWithTitle from '../DialogWithTitle';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectItem, setImage, setName} from './redux/createItemSlice';
import {useCreateItemMutation} from '../../redux/itemApi';
import {selectUser} from '../LoginUser/redux/userSlice/userSlice';
import InputImage from '../InputImage/InputImage';
import ThemedTextField from '../ThemedTextField';
import {EName} from './redux/types';
import {content} from '../content/content';
import {selectLang} from '../content/redux/langSlice';
import {styles} from './styles';
import AddProps from './AddProps';
import {selectCollection} from '../../redux/collectionApi';
import {EItemTypeProp} from '../../types/types';
import ThemedButton from '../ThemedButton';

const CreateItem = () => {
  const {title, name, image, str, bool, int, text, date} = useAppSelector(selectItem);
  const [create, {isSuccess}] = useCreateItemMutation();
  const {token} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const {lang} = useAppSelector(selectLang);
  const {itemPropTypes, id} = useAppSelector(selectCollection);

  useEffect(() => {
    dispatch(reset());
  }, [isSuccess]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name.trim());
    if (image.image) {
      data.append('image', image.image, image.image.name);
    }

    if (itemPropTypes.includes(EItemTypeProp.STR) && str.length) {
      const props = str.filter((prop) => prop.key.trim() !== '' && prop.value.trim() !== '');

      if (props.length) {
        data.append('strProps', JSON.stringify(props));
      }
    }

    if (itemPropTypes.includes(EItemTypeProp.BOOL) && bool.length) {
      const props = bool.filter((prop) => prop.key.trim() !== '');

      if (props.length) {
        data.append('boolProps', JSON.stringify(props));
      }
    }

    if (itemPropTypes.includes(EItemTypeProp.INT) && int.length) {
      const props = int.filter((prop) => prop.key.trim() !== '');

      if (props.length) {
        data.append('intProps', JSON.stringify(props));
      }
    }

    if (itemPropTypes.includes(EItemTypeProp.TEXT) && text.length) {
      const props = text.filter((prop) => prop.key.trim() !== '' && prop.value.trim() !== '');

      if (props.length) {
        data.append('textProps', JSON.stringify(props));
      }
    }

    if (itemPropTypes.includes(EItemTypeProp.DATE) && date.length) {
      const props = date.filter((prop) => prop.key.trim() !== '' && prop.value.trim() !== '');

      if (props.length) {
        data.append('dateProps', JSON.stringify(props));
      }
    }

    if (id !== null) {
      data.append('collectionId', `${id}`);
    }

    create({data, token});
  };

  return (
    <DialogWithTitle
      title={title}
      onClose={reset}
      child={
        <Box noValidate onSubmit={handleSubmit} component="form">
          <Box sx={styles.box}>
            <Box sx={styles.imgBox}>
              <InputImage imageUrl={image.imageUrl} action={setImage} />
              <ThemedTextField
                name={EName.NAME}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
                placeholder={`${content[lang].item.itemName}...`}
                sx={{width: '100%', mt: 1, mb: 2}}
              />
            </Box>
            <AddProps />
          </Box>
          <Box sx={{display: 'flex', mt: 3}}>
            <ThemedButton sx={{ml: 'auto'}} type="submit" aria-label="save" variant="outlined">
              {content[lang].save}
            </ThemedButton>
          </Box>
        </Box>
      }
    />
  );
};

export default CreateItem;
