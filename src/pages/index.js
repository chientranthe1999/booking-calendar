// layouts
import Page from '../components/Page';
// components
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// ----------------------------------------------------------------------
// @mui
import { Card, Container, Stack, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
import { FormProvider, RHFTextField, RHFSelect, RHFCalendar, RHFTimePicker } from '../components/hook-form';

export default function Appoinment() {
  const defaultValues = {
    name: 'Chiến',
    email: 'tranthechien2012@gmail.com',
    user_id: '',
    ccid: '123456',
    phonenumber: '0868547591',
    time: '16:30',
    date: '2022-08-16',
    address: 'ChienTT',
  };

  const appoimentSchema = Yup.object().shape({
    name: Yup.string().required('Hãy nhập vào tên của bạn'),
    email: Yup.string().email('Hãy nhập đúng định dạng email').required('Hãy nhập vào email'),
    phonenumber: Yup.string().required('Nhập vào số điện thoại của bạn'),
    date: Yup.string().required('Nhập vào ngày hẹn'),
    time: Yup.string().required('Nhập vào số thời gian hẹn'),
    ccid: Yup.string().required('Nhập vào số ccid của bạn'),
    user_id: Yup.string().required('Hãy chọn người cần gặp'),
  });

  const methods = useForm({
    resolver: yupResolver(appoimentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (e) => {
    console.log(e);
  };

  const users = [
    { name: 'Chien', user_id: 1 },
    { name: 'Chien2', user_id: 2 },
    { name: 'Chien3', user_id: 3 },
    { name: 'Chien4', user_id: 4 },
    { name: 'Chien5', user_id: 5 },
    { name: 'Chien6', user_id: 6 },
  ];

  return (
    <Page title="Appoinment form" sx={{ pt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Tạo cuộc gặp mặt mới
        </Typography>

        <Card sx={{ p: 2 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} mb={2}>
              {/* name */}
              <RHFTextField label="Tên của bạn" name="name" />

              {/* email, phonenumber */}
              <Stack direction="row" spacing={2}>
                <RHFTextField label="Email" name="email" />
                <RHFTextField label="Số điện thoại" name="phonenumber" />
              </Stack>
              <RHFTextField label="Địa chỉ" name="address" />

              <RHFTextField label="Số CCID" name="ccid" />

              <RHFSelect label="Người cần gặp" name="user_id">
                {users.map((user) => (
                  <MenuItem key={user.user_id} value={user.user_id}>
                    {user.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Stack direction="row" spacing={2}>
                <RHFCalendar name="date" />
                <RHFTimePicker name="time" />
              </Stack>
            </Stack>

            {/* Loading button */}
            <Stack direction="row">
              <LoadingButton loading={isSubmitting} size="large" type="submit" variant="contained" sx={{ marginLeft: 'auto' }}>
                Tạo mới
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
}
