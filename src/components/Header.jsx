import { Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      textAlign: 'center',
      py: 2,
      backgroundColor: 'primary.main',
      color: 'white',
      boxShadow: 1,
    }}
  >
    <Typography variant="h4" fontWeight="600">
      Five in a Row
    </Typography>
  </Box>
);

export default Header;
