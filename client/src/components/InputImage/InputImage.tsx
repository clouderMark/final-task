import {ChangeEvent} from 'react';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Box, BoxProps, Button} from '@mui/material';
import {cardInputImage as styles} from './styles/cardInputImage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';

interface IProps {
  imageUrl: string | null;
  action: ActionCreatorWithPayload<FileList | null>;
  sx?: BoxProps;
  error?: boolean | null;
}

const InputImage = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {imageUrl, action} = props;
  const {lang} = useAppSelector(selectLang);
  let error;

  if (typeof props.error === 'boolean') {
    error = props.error;
  } else error = true;

  return (
    <Box sx={[styles.card, !error ? {border: '1.5px solid red'} : {border: 0}, {...props.sx}]}>
      <Box sx={styles.img} component="img" src={imageUrl || ''} />
      <Button
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        aria-label="upload picture"
        component="label"
        color="first"
        variant="contained"
      >
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(action(e.target.files))}
          placeholder={`${content[lang].photo} ...`}
          hidden
          accept="image/*"
          aria-label="upload picture"
        />
        {`${imageUrl ? content[lang].change : content[lang].add} ${content[lang].photo.toLowerCase()}`}
      </Button>
    </Box>
  );
};

export default InputImage;
