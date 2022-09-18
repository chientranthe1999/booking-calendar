import { useState } from 'react';

import { useRouter } from 'next/router';
// @mui
import { Card, Container, TableHead, Typography, TableContainer, TableRow, TableBody, TableCell, Table, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Label from '../../components/Label';
// import CheckCircleOutlineIcon from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';

// routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';

import { getUsers, activeUser, deActiveUser } from '../../apis/user';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------
const ROLE = {
  ASSISTANT: 2,
  USER: 3,
};

const USER_STATUS = {
  ACTIVE: 1,
  DE_ACTIVE: 2,
};

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

UserList.getInitialProps = async () => {
  const users = await getUsers();
  return {
    users,
  };
};

export default function UserList({ users }) {
  const headLabel = [
    { id: 1, label: 'Họ và tên' },
    { id: 2, label: 'Email' },
    { id: 3, label: 'Số điện thoại' },
    { id: 5, label: 'Địa chỉ' },
    { id: 6, label: 'Trạng thái' },
    { id: 8, label: 'Role' },
    { id: 7, label: '' },
  ];

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const theme = useTheme();

  const [tableData, setTableData] = useState(users.data);

  const handleActiveUser = async (id) => {
    await activeUser(id);
    const { data } = await getUsers();
    setTableData(data);
  };

  const handleDeactiveUser = async (id) => {
    await deActiveUser(id);
    const { data } = await getUsers();

    setTableData(data);
    // return <Alert severity="success">This is a success alert — check it out!</Alert>;
  };

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography gutterBottom variant="h3">
          Quán lý user
        </Typography>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', paddingTop: '8px' }}>
              {/* table main content */}
              <Table size="medium">
                {/* header */}
                <TableHead>
                  <TableRow>
                    {headLabel.map((headCell) => (
                      <TableCell
                        key={`label-${headCell.id}`}
                        align={headCell.align || 'center'}
                        sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        {row.status === USER_STATUS.ACTIVE ? (
                          <Label sx={{ width: '64px' }} color="primary">
                            Active
                          </Label>
                        ) : (
                          <Label sx={{ width: '64px' }} color="default">
                            Disable
                          </Label>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.role === ROLE.USER ? (
                          <Label sx={{ width: '64px' }} color="secondary">
                            User
                          </Label>
                        ) : (
                          <Label sx={{ width: '64px' }} color="info">
                            Assistant
                          </Label>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.status === USER_STATUS.ACTIVE ? (
                          <LoadingButton
                            loading={false}
                            size="small"
                            type="submit"
                            variant="contained"
                            fullWidth
                            onClick={() => handleDeactiveUser(row.id)}
                            sx={{ backgroundColor: theme.palette.warning.dark, width: '80px' }}
                          >
                            Deactive
                          </LoadingButton>
                        ) : (
                          <LoadingButton
                            loading={false}
                            size="small"
                            type="submit"
                            variant="contained"
                            fullWidth
                            onClick={() => handleActiveUser(row.id)}
                            sx={{ backgroundColor: theme.palette.primary.dark, width: '80px' }}
                          >
                            Active
                          </LoadingButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* <TableNoData isNotFound={isNotFound} /> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
