import { useState } from 'react';

// layouts
import Layout from '../layouts';
import Page from '../components/Page';
import { FormProvider, RHFTextField } from '../components/hook-form';
// ----------------------------------------------------------------------
import Scrollbar from '../components/Scrollbar';

// @mui
import { Box, Card, Container, TableHead, Typography, TableContainer, TableRow, TableBody, TableCell, Table, Stack } from '@mui/material';
import Label from '../components/Label';

import DialogAnimate from '../components/animate/DialogAnimate';
// ----------------------------------------------------------------------
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { getAppointments, finishAppointment, cancelAppointment, acceptAppointment } from '../apis/appointment';

Appoinment.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

Appoinment.getInitialProps = async () => {
  const { data } = await getAppointments();

  return {
    appoinments: data,
  };
};

const APPOINMENT_STATUS = {
  WATING: 1,
  ACCEPTED: 2,
  CANCEL: 3,
  DONE: 4,
};

export default function Appoinment({ appoinments }) {
  const headLabel = [
    { id: 1, label: 'Họ và tên' },
    { id: 2, label: 'Email' },
    { id: 3, label: 'Số điện thoại' },
    { id: 4, label: 'Thời gian' },
    { id: 5, label: 'CCID' },
    { id: 10, label: 'Mô tả' },
    { id: 6, label: 'Trạng thái' },
    { id: 7, label: '' },
  ];

  const defaultValues = {
    phonenumber: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const theme = useTheme();

  const getLabelInfor = (status) => {
    const convertedStatus = Number(status);
    switch (convertedStatus) {
      case APPOINMENT_STATUS.WATING:
        return (
          <Label sx={{ width: '64px' }} color="secondary">
            Waiting
          </Label>
        );
      case APPOINMENT_STATUS.ACCEPTED:
        return (
          <Label sx={{ width: '64px' }} color="info">
            Accepted
          </Label>
        );
      case APPOINMENT_STATUS.CANCEL:
        return (
          <Label sx={{ width: '64px' }} color="warning">
            Cancel
          </Label>
        );
      case APPOINMENT_STATUS.DONE:
        return (
          <Label sx={{ width: '64px' }} color="success">
            Done
          </Label>
        );
    }
  };

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = () => {};

  const [tableData, setAppointment] = useState(appoinments);

  const updateData = async () => {
    const { data } = await getAppointments();
    setAppointment(data);
  };

  return (
    <Page title="Appoinment List">
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Danh sách cuộc họp
        </Typography>
        <DialogAnimate open={false}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ pb: 3 }}>
              Xác nhận thời gian gặp mặt
            </Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} mb={3}>
                <RHFTextField label="Time" name="phonenumber" />
                <RHFTextField label="Ngày" name="phonenumber" />
              </Stack>
            </FormProvider>
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'end' }}>
              <LoadingButton loading={false} size="medium" type="submit" variant="contained" sx={{ backgroundColor: theme.palette.warning.dark }}>
                Hủy
              </LoadingButton>
              <LoadingButton loading={false} size="medium" type="submit" variant="contained">
                Chấp nhận
              </LoadingButton>
            </Stack>
          </Box>
        </DialogAnimate>

        {/* search form */}
        {/* <Card sx={{ py: 2 }}> */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mb={2} direction="row">
            <RHFTextField label="Số điện thoại" name="phonenumber" sx={{ width: '40%' }} />
            <LoadingButton loading={false} size="large" type="submit" variant="contained" sx={{ marginLeft: 'auto', width: '120px', height: '56px' }}>
              Tìm kiếm
            </LoadingButton>
          </Stack>
        </FormProvider>
        {/* </Card> */}

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', paddingTop: '8px' }}>
              {/* table main content */}
              <Table size="medium">
                {/* header */}
                <TableHead>
                  <TableRow>
                    {headLabel.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.align || 'center'} sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell align="center">{row.user_name}</TableCell>
                      <TableCell align="center">{row.user_email}</TableCell>
                      <TableCell align="center">{row.user_phone}</TableCell>
                      <TableCell align="center">{`${row.accepted_time} ${row.date}`} </TableCell>
                      <TableCell align="center">{row.user_ccid}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{getLabelInfor(row.status)}</TableCell>
                      <TableCell align="right">
                        <ActionButton status={row.status} id={row.id} updateData={() => updateData()} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

const ActionButton = ({ status, id, updateData }) => {
  const isSubmitting = false;

  const theme = useTheme();

  const handleAppointmentAction = async (id, flag) => {
    try {
      switch (flag) {
        case APPOINMENT_STATUS.ACCEPTED:
          await acceptAppointment(id, { accepted_time: '12:00' });
          break;
        case APPOINMENT_STATUS.CANCEL:
          await cancelAppointment(id);
          break;
        case APPOINMENT_STATUS.DONE:
          await finishAppointment(id);
          break;
      }

      updateData();
    } catch (e) {
      console.log(e);
    }
  };

  switch (status) {
    case APPOINMENT_STATUS.WATING:
      return (
        <Stack spacing={1} sx={{ justifyContent: 'right' }}>
          <LoadingButton
            loading={isSubmitting}
            size="small"
            type="submit"
            variant="contained"
            onClick={() => handleAppointmentAction(id, APPOINMENT_STATUS.ACCEPTED)}
            sx={{ backgroundColor: theme.palette.secondary.main, minWidth: '100px' }}
          >
            Chấp nhận
          </LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            size="small"
            type="submit"
            variant="contained"
            onClick={() => handleAppointmentAction(id, APPOINMENT_STATUS.CANCEL)}
            sx={{ backgroundColor: theme.palette.warning.dark, minWidth: '100px' }}
          >
            Hủy
          </LoadingButton>
        </Stack>
      );

    case APPOINMENT_STATUS.ACCEPTED:
      return (
        <LoadingButton
          loading={isSubmitting}
          size="small"
          type="submit"
          variant="contained"
          fullWidth
          onClick={() => handleAppointmentAction(id, APPOINMENT_STATUS.DONE)}
        >
          Hoàn thành
        </LoadingButton>
      );

    default:
      return null;
  }
};
