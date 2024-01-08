import {useEffect, useState} from 'react';
import {Button, Container, TableCell, TablePagination, TableRow} from '@mui/material';
import {useChangeUserRoleMutation, useChangeUserStatusMutation, useGetAllUsersMutation} from '../redux/userApi';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from './login/redux/userSlice/userSlice';
import {Board} from '../components/Board';
import TableCells from '../components/TableCells/TableCells';
import {ERole, TId} from '../types/types';
import {selectLang} from '../components/content/redux/langSlice';
import {content} from '../components/content/content';

const defaultLimit = 1;

const AdminUsers = () => {
  const {lang} = useAppSelector(selectLang);
  const {token} = useAppSelector(selectUser);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(defaultLimit);
  const [getData, {data, isSuccess}] = useGetAllUsersMutation();
  const [changeRole, {isSuccess: isRoleSuccess}] = useChangeUserRoleMutation();
  const [changeStatus, {isSuccess: isStatusSuccess}] = useChangeUserStatusMutation();
  const headCells = [
    {
      field: 'id',
      value: 'id',
    },
    {
      field: 'userName',
      value: content[lang].adminUser.userName,
    },
    {
      field: 'changeStatus',
      value: content[lang].adminUser.changeStatus,
    },
    {
      field: 'changeRole',
      value: content[lang].adminUser.changeRole,
    },
  ];

  useEffect(() => {
    if (token) {
      getData({token, page, limit});
    }
  }, [token]);

  const handleClickChangeRole = (id: TId) => {
    if (token) {
      changeRole({token, id});
    }
  };

  const handleClickChangeStatus = (id: TId) => {
    if (token) {
      changeStatus({token, id});
    }
  };

  useEffect(() => {
    if (token) {
      getData({token, page, limit});
    }
  }, [isRoleSuccess, isStatusSuccess, page, limit]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (data && +event.target.value * page <= data.numberOfRecords) {
      setLimit(+event.target.value);
    }
  };

  return (
    <Container maxWidth={false}>
      {isSuccess ? (
        <>
          <Board
            tableHeadCells={<TableCells cells={headCells} />}
            tableBodyCells={
              <>
                {data?.users.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell scope="row">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleClickChangeStatus(row.id!)}
                        color="warning"
                      >
                        {content[lang].adminUser.statusIs}{' '}
                        {row.isBlocked ? content[lang].adminUser.blocked : content[lang].adminUser.active}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleClickChangeRole(row.id!)}
                        color="warning"
                      >
                        {content[lang].adminUser.roleIs}{' '}
                        {row.role === ERole.ADMIN ? content[lang].admin : content[lang].user}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            }
          />
          <TablePagination
            rowsPerPageOptions={[defaultLimit, 10, 25]}
            component="div"
            count={data ? data.numberOfRecords : 0}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{div: {flexDirection: 'row'}}}
          />
        </>
      ) : null}
    </Container>
  );
};

export default AdminUsers;
