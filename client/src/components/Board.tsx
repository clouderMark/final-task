import {TableContainer, Paper, Table, TableHead, TableRow, TableBody} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {theme} from '../styles/theme';

interface IProps {
  tableHeadCells?: JSX.Element;
  tableBodyCells: JSX.Element;
}

export const Board = (props: IProps) => {
  const {type} = useAppSelector(selectTheme);

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        mb: 2,
        backgroundColor: theme.palette.first[type],
        'th, td': {color: theme.palette.third[type]},
      }}
    >
      <Table size="small">
        {props.tableHeadCells ? (
          <TableHead>
            <TableRow>{props.tableHeadCells}</TableRow>
          </TableHead>
        ) : null}
        {props.tableBodyCells ? <TableBody>{props.tableBodyCells}</TableBody> : null}
      </Table>
    </TableContainer>
  );
};
