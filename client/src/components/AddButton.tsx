import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material';
import {ActionCreatorWithoutPayload} from '@reduxjs/toolkit';
import {useAppDispatch} from '../redux/hooks';

interface IProps {
  action: ActionCreatorWithoutPayload;
}

const AddButton = (props: IProps) => {
  const {action} = props;
  const dispatch = useAppDispatch();

  return (
    <IconButton color="secondary" aria-label="add" onClick={() => dispatch(action())}>
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
