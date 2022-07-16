import React from 'react';
import { Box, Typography } from '@mui/material';
const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant='h1' color='primary'>
        movie<span style={{ color: '#90be6d' }}>mania</span>
      </Typography>
    </Box>
  );
};

export default Header;
