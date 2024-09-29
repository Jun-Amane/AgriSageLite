import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        AgriSageLite
      </MuiLink>{' '}
      {new Date().getFullYear()}.
        Designed by Ziyu Zhou in Tai'an.
    </Typography>
  );
}
