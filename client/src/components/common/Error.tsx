import { Box, Typography } from '@mui/material';

const Error = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h3'>Sorry!</Typography>
      <Typography variant='h4'>
        An error has occured, please try again later.
      </Typography>
    </Box>
  );
};

export default Error;
