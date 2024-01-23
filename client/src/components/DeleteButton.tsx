import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useAppDispatch} from '../redux/hooks';

interface IProps {
  action: ActionCreatorWithPayload<string>;
  payload: string;
}

const DeleteButton = (props: IProps) => {
  const {action, payload} = props;
  const dispatch = useAppDispatch();

  return (
    <IconButton color="warning" aria-label="delete" onClick={() => dispatch(action(payload))}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
