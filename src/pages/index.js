import { useState } from 'react';

// layouts
import Layout from '../layouts';
import Page from '../components/Page';
// components
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// ----------------------------------------------------------------------
// @mui
import { Box, Card, Container, Stack, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// ----------------------------------------------------------------------
import { FormProvider, RHFTextField, RHFSelect } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';

Appoinment.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const FullWidthInput = styled(Box)({
  flex: 1,
  '& .MuiTextField-root': {
    width: '100%',
  },
});

export default function Appoinment() {
  const [date, setDate] = useState(null);

  const defaultValue = {
    name: 'Chiến',
    email: 'tranthechien2012@gmail.com',
    user_id: 1,
    phonenumber: '0868547591',
    time: '16:30',
    date: '2022-16-08',
  };

  const appoimentSchema = Yup.object().shape({
    name: Yup.string().required('Hãy nhập vào tên của bạn'),
    email: Yup.string().email('Hãy nhập đúng định dạng email').required('Hãy nhập vào email'),
  });

  const methods = useForm({
    resolver: yupResolver(appoimentSchema),
    defaultValue,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = () => {};

  const users = [
    { name: 'Chien', user_id: 1 },
    { name: 'Chien2', user_id: 2 },
    { name: 'Chien3', user_id: 3 },
    { name: 'Chien4', user_id: 4 },
    { name: 'Chien5', user_id: 5 },
    { name: 'Chien6', user_id: 6 },
  ];

  return (
    <Page title="Appoinment form">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Tạo cuộc gặp mặt mới
        </Typography>

        <Card sx={{ p: 2 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} mb={2}>
              <RHFTextField label="Tên của bạn" name="name" />
              {/* Stack =  div + css (display: flex); */}
              <Stack direction="row" spacing={2}>
                <RHFTextField label="Email" name="email" />
                <RHFTextField label="Số điện thoại" name="phonenumber" />
              </Stack>
              <RHFTextField label="Địa chỉ" name="address" />

              <RHFSelect label="Người cần gặp" name="user_id">
                {users.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>

              <Stack direction="row" spacing={2}>
                <FullWidthInput>
                  <DatePicker
                    label="Chọn ngày"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FullWidthInput>
                <FullWidthInput
                  sx={{
                    flex: 1,
                  }}
                >
                  <TimePicker
                    label="Chọn giờ"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FullWidthInput>
              </Stack>
            </Stack>

            <LoadingButton loading={isSubmitting} size="large" type="submit" variant="contained">
              Lưu
            </LoadingButton>
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
}
