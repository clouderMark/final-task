import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {ActionCreatorWithoutPayload} from '@reduxjs/toolkit';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {theme} from '../styles/theme';

interface IProps {
  title: string;
  child: JSX.Element;
  onClose: ActionCreatorWithoutPayload;
}

const DialogWithTitle = (props: IProps) => {
  const {title, onClose} = props;
  const dispatch = useAppDispatch();
  const {type} = useAppSelector(selectTheme);
  const {child} = props;

  return (
    <Dialog
      open={Boolean(title)}
      onClose={() => dispatch(onClose())}
      PaperProps={{sx: {minWidth: '94%', backgroundColor: theme.palette.fourth[type]}}}
    >
      <DialogTitle sx={{color: theme.palette.third[type]}}>{title}</DialogTitle>
      <DialogContent>{child}</DialogContent>
    </Dialog>
  );
};

export default DialogWithTitle;
