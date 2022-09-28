import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const FullWidthInput = styled(Box)({
  flex: 1,
  '& .MuiTextField-root': {
    width: '100%',
  },
});

export default function RHFSelect({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FullWidthInput>
          <TimePicker
            label="Chọn giờ"
            ampm={false}
            inputFormat="HH:mm"
            {...field}
            {...other}
            renderInput={(params) => <TextField fullWidth {...params} error={!!error} helperText={error?.message} />}
          />
        </FullWidthInput>
      )}
    />
  );
}
