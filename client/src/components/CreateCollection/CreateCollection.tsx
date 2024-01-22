import {Box, FormControlLabel, Switch} from '@mui/material';
import {ChangeEvent, FormEvent, useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {BaseQueryFn, FetchArgs, MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {selectUser} from '../LoginUser/redux/userSlice/userSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import DialogWithTitle from '../DialogWithTitle';
import ThemedButton from '../ThemedButton';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';
import ThemedTextField from '../ThemedTextField';
import ThemedMultiSelect from '../ThemedMultiSelect';
import {propsTypeValues} from './value';
import {EName} from './redux/types';
import InputImage from '../InputImage/InputImage';
import {
  reset,
  selectCollection,
  setDescription,
  setImage,
  setName,
  setPropType,
  setTheme,
  setVisibility,
} from './redux/createCollectionSlice';
import ThemedTypography from '../ThemedTypography';
import {styles} from './styles';
import {ICollection, ICollectionReq, ICollectionUpdateReq, ICustomError} from '../../types/types';

const API_KEY = process.env.REACT_APP_TINY_API_KEY;

interface IProps {
  useSubmit: UseMutation<MutationDefinition<ICollectionReq,BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,never,ICollection,'collectionApi'>> | UseMutation<MutationDefinition<ICollectionUpdateReq, BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>, never, ICollection, "collectionApi">>; // eslint-disable-line
}

const CreateCollection = (properties: IProps) => {
  const {useSubmit} = properties;
  const dispatch = useAppDispatch();
  const {name, description, theme, visible, image, props, title, id} = useAppSelector(selectCollection);
  const {token} = useAppSelector(selectUser);
  const {lang} = useAppSelector(selectLang);
  const [send, {isSuccess}] = useSubmit();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!title) {
      dispatch(reset());
    }
  }, [title]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name.trim());
    data.append('description', description.trim());
    if (image.image) {
      data.append('image', image.image, image.image.name);
    }

    data.append('theme', theme);
    data.append('visible', `${visible}`);
    data.append('itemPropType', JSON.stringify(props));

    send({data, token, id: id!});
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
                name={EName.THEME}
                value={theme}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTheme(e.target.value))}
                placeholder={`${content[lang].collection.theme}...`}
                sx={{width: '100%', mt: 1, mb: 2}}
              />
              <ThemedMultiSelect
                inputLabel={content[lang].collection.propsType}
                value={props}
                action={setPropType}
                values={propsTypeValues}
              />
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
                  sx={styles.switch}
                />
              </Box>
              <ThemedTextField
                name={EName.NAME}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
                placeholder={`${content[lang].collection.name}...`}
                sx={{width: '100% !important', mb: 3}}
              />
              <Box>
                <ThemedTypography sx={{m: 1}}>{content[lang].collection.desctription}: </ThemedTypography>
                <Editor
                  apiKey={API_KEY}
                  init={{
                    plugins:
                      'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss', // eslint-disable-line
                    toolbar:
                      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat', // eslint-disable-line
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      {value: 'First.Name', title: 'First Name'},
                      {value: 'Email', title: 'Email'},
                    ],
                    ai_request: (
                      _: any, // eslint-disable-line
                      respondWith: any, // eslint-disable-line
                    ) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')), // eslint-disable-line
                  }}
                  onEditorChange={(e) => dispatch(setDescription(e))}
                  value={description}
                />
              </Box>
            </Box>
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

export default CreateCollection;
