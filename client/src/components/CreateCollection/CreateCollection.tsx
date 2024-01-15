import {Box, FormControlLabel, Switch} from '@mui/material';
import {ChangeEvent, FormEvent} from 'react';
import {useCreateCollectionMutation} from '../../redux/collectionApi';
import {selectUser} from '../LoginUser/redux/userSlice/userSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import DialogWithTitle from '../DialogWithTitle/DialogWithTitle';
import ThemedButton from '../ThemedButton';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';
import ThemedTextField from '../ThemedTextField';
import ThemedMultiSelect from '../ThemedMultiSelect';
import {propsTypeValues} from './value';
import {EName} from './redux/types';
import InputImage from '../InputImage/InputImage';
import {
  selectCollection,
  setDescription,
  setImage,
  setName,
  setPropType,
  setTheme,
  setVisibility,
} from './redux/createCollectionSlice';
import ThemedTypography from '../ThemedTypography';

const CreateCollection = () => {
  const dispatch = useAppDispatch();
  const {name, description, theme, visible, image, props} = useAppSelector(selectCollection);
  const {token} = useAppSelector(selectUser);
  const {lang} = useAppSelector(selectLang);
  const [send] = useCreateCollectionMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name.trim());
    data.append('description', description.trim());
    if (image.image) {
      data.append('image', image.image);
    }

    data.append('theme', theme);
    data.append('visible', `${visible}`);
    data.append('itemPropType', JSON.stringify(props));

    send({data, token});
  };

  return (
    <DialogWithTitle
      child={
        <Box noValidate onSubmit={handleSubmit} component="form">
          <Box sx={{display: 'flex'}}>
            <Box sx={{width: '335px', mr: 2}}>
              <InputImage imageUrl={image.imageUrl} action={setImage} />
            </Box>
            <Box sx={{flexGrow: 1}}>
              <Box sx={{display: 'flex', mb: 1}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={visible}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setVisibility(e.target.checked))}
                      name={EName.VISIBLE}
                    />
                  }
                  label={
                    <ThemedTypography>
                      {visible ? content[lang].visible : `${content[lang].no} ${content[lang].visible.toLowerCase()}`}
                    </ThemedTypography>
                  }
                  sx={{
                    ml: 'auto',
                    width: '140px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                />
              </Box>
              <ThemedTextField
                name={EName.NAME}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
                placeholder="name..."
                sx={{width: '100% !important', mb: 3}}
              />
              <ThemedTextField
                name={EName.DESCRIPTION}
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setDescription(e.target.value))}
                placeholder="description..."
                multiline={true}
                rows={8}
                sx={{width: '100%', mb: 3}}
              />
            </Box>
          </Box>
          <ThemedTextField
            name={EName.THEME}
            value={theme}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTheme(e.target.value))}
            placeholder="theme..."
            sx={{width: '100%', mb: 3}}
          />

          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <ThemedMultiSelect
              inputLabel={content[lang].collection.propsType}
              value={props}
              action={setPropType}
              values={propsTypeValues}
            />
            <ThemedButton sx={{ml: 'auto'}} type="submit" aria-label="save" variant="outlined">
              {content[lang].save}
            </ThemedButton>
          </Box>
        </Box>
      }
    />
  );
};

export default CreateCollection;
