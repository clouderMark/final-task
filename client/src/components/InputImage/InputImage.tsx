import {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {Box, BoxProps, Button} from '@mui/material';
import {cardInputImage as styles} from './styles/cardInputImage';
import {IImage} from '../../types/types';
import {useAppSelector} from '../../redux/hooks';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';

interface IProps {
  value: IImage;
  setValue: Dispatch<SetStateAction<IImage>>;
  sx?: BoxProps;
  error?: boolean | null;
}

const InputImage = (props: IProps) => {
  const {value, setValue} = props;
  const {lang} = useAppSelector(selectLang);
  let error;

  if (typeof props.error === 'boolean') {
    error = props.error;
  } else error = true;

  const handleImgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;

    if (files) {
      const file = files[0];

      setValue({image: file, imageUrl: URL.createObjectURL(file)});
    }
  };

  return (
    <Box sx={[styles.card, !error ? {border: '1.5px solid red'} : {border: 0}, {...props.sx}]}>
      <Box sx={styles.img} component="img" src={value.imageUrl || ''} />
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleImgeChange(e)}
          placeholder={`${content[lang].photo} ...`}
          hidden
          accept="image/*"
          aria-label="upload picture"
        />
        {`${value ? content[lang].change : content[lang].add} ${content[lang].photo.toLowerCase()}`}
      </Button>
    </Box>
  );
};

export default InputImage;
