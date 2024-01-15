import {Box, SelectChangeEvent} from '@mui/material';
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
import {propsTypeValues} from './value';

export interface IDefaultValue {
  name: string;
  description: string;
  theme: string;
  image: string;
  visible: boolean;
}

export const defaultValue: IDefaultValue = {
  name: '',
  description: '',
  theme: '',
  image: '',
  visible: true,
};

const CreateCollection = () => {
  const {token} = useAppSelector(selectUser);
  const [value, setValue] = useState(defaultValue);
  const {lang} = useAppSelector(selectLang);
  const [send] = useCreateCollectionMutation();
  const [propsType, setPropType] = useState<string[]>([]);

  const handleInputChange = (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>) => {
    const data = {...value, [event.target.name]: event.target.value};

    setValue(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', value.name.trim());
    data.append('description', value.description.trim());
    data.append('image', value.image);
    data.append('theme', value.theme);
    data.append('visible', `${value.visible}`);
    data.append('itemPropType', JSON.stringify(propsType));

    send({data, token});
  };

  return (
    <DialogWithTitle
      child={
        <Box noValidate onSubmit={handleSubmit} component="form">
          <ThemedTextField
            name="name"
            value={value.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="name..."
            sx={{width: '100% !important', mb: 3}}
          />
          <ThemedTextField
            name="description"
            value={value.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="description..."
            sx={{width: '100%', mb: 3}}
          />
          <ThemedTextField
            name="image"
            value={value.image}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="image..."
            sx={{width: '100%', mb: 3}}
          />
          <ThemedTextField
            name="theme"
            value={value.theme}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder="theme..."
            sx={{width: '100%', mb: 3}}
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
