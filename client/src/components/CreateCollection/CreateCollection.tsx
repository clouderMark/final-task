import {Box, FormControlLabel, Switch} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useCreateCollectionMutation} from '../../redux/collectionApi';
import {selectUser} from '../LoginUser/redux/userSlice/userSlice';
import {useAppSelector} from '../../redux/hooks';
import DialogWithTitle from '../DialogWithTitle/DialogWithTitle';
import ThemedButton from '../ThemedButton';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';
import ThemedTextField from '../ThemedTextField';
import ThemedMultiSelect from '../ThemedMultiSelect';
import {defaultValue, propsTypeValues} from './value';
import {EName} from './types';

const CreateCollection = () => {
  const {token} = useAppSelector(selectUser);
  const [value, setValue] = useState(defaultValue);
  const {lang} = useAppSelector(selectLang);
  const [send] = useCreateCollectionMutation();
  const [propsType, setPropType] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = {
      ...value,
      [event.target.name]: event.target.name === EName.VISIBLE ? event.target.checked : event.target.value,
    };

    setValue(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', value[EName.NAME].trim());
    data.append('description', value[EName.DESCRIPTION].trim());
    data.append('image', value[EName.IMAGE]);
    data.append('theme', value[EName.THEME]);
    data.append('visible', `${value[EName.VISIBLE]}`);
    data.append('itemPropType', JSON.stringify(propsType));

    send({data, token});
  };

  return (
    <DialogWithTitle
      child={
        <Box noValidate onSubmit={handleSubmit} component="form">
          <ThemedTextField
            name={EName.NAME}
            value={value[EName.NAME]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="name..."
            sx={{width: '100% !important', mb: 3}}
          />
          <ThemedTextField
            name={EName.DESCRIPTION}
            value={value[EName.DESCRIPTION]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="description..."
            sx={{width: '100%', mb: 3}}
          />
          <ThemedTextField
            name={EName.IMAGE}
            value={value[EName.IMAGE]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="image..."
            sx={{width: '100%', mb: 3}}
          />
          <ThemedTextField
            name={EName.THEME}
            value={value[EName.THEME]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="theme..."
            sx={{width: '100%', mb: 3}}
          />
          <FormControlLabel
            control={
              <Switch
                checked={value[EName.VISIBLE]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                name={EName.VISIBLE}
              />
            }
            label={content[lang].visible}
          />
          <ThemedMultiSelect
            inputLabel={content[lang].collection.propsType}
            value={propsType}
            setValue={setPropType}
            values={propsTypeValues}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
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
