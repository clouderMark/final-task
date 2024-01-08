import {useEffect, useState} from 'react';
import {createSearchParams, useNavigate, useSearchParams} from 'react-router-dom';
import {Button, TableCell, TablePagination, TableRow} from '@mui/material';
import {useChangeUserRoleMutation, useChangeUserStatusMutation, useGetAllUsersMutation} from '../../redux/userApi';
import {useAppSelector} from '../../redux/hooks';
import {selectUser} from '../LoginUser/redux/userSlice/userSlice';
import {Board} from '../../components/Board';
import TableCells from '../../components/TableCells/TableCells';
import {ERole, IObject, TId} from '../../types/types';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';
import {EPath} from '../../types/EPath';
import {getSearchParams} from './getSearchParams';
import {EParams} from './types';

const defaultLimit = 1;
const defaultPage = 0;

const AdminUserTable = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {lang} = useAppSelector(selectLang);
  const {token} = useAppSelector(selectUser);
  const [page, setPage] = useState(defaultPage);
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
    const {page: paramsPage, limit: paramsLimit} = getSearchParams(searchParams);

    if (paramsPage && paramsPage > defaultPage) setPage(paramsPage - 1);
    if (paramsLimit && paramsLimit > defaultLimit) setLimit(paramsLimit);
  }, []);

  useEffect(() => {
    if (token) {
      getData({token, page, limit});
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getData({token, page, limit});
    }
  }, [isRoleSuccess, isStatusSuccess, page, limit]);

  useEffect(() => {
    createParams();
  }, [page, limit]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (data && +event.target.value * page <= data.numberOfRecords) {
      setLimit(+event.target.value);
    } else if (data) {
      setPage(Math.ceil(data.numberOfRecords / +event.target.value) - 1);
      setLimit(+event.target.value);
    }
  };

  const createParams = () => {
    const params: IObject = {};

    if (page > defaultPage) params[EParams.PAGE] = `${page + 1}`;
    if (limit > defaultLimit) params[EParams.LIMIT] = `${limit}`;

    navigate({
      pathname: EPath.AdminUsers,
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <>
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
    </>
  );
};

export default AdminUserTable;
