import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {reset, selectDialogWithTitle} from './dialogWithTitleSlice';
import {selectTheme} from '../../styles/themeSlice/themeSlice';
import {theme} from '../../styles/theme';

interface IProps {
  child: JSX.Element;
}

const DialogWithTitle = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {type} = useAppSelector(selectTheme);
  const {child} = props;
  const {title} = useAppSelector(selectDialogWithTitle);

  return (
    <Dialog
      open={Boolean(title)}
      onClose={() => dispatch(reset())}
      PaperProps={{sx: {minWidth: '94%', backgroundColor: theme.palette.fourth[type]}}}
    >
      <DialogTitle sx={{color: theme.palette.third[type]}}>{title}</DialogTitle>
      <DialogContent>{child}</DialogContent>
    </Dialog>
  );
};

export default DialogWithTitle;
