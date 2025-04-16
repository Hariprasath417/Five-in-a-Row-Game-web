import { Box } from '@mui/material';

const Cell = ({ value, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: 32,
      height: 32,
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }}
  >
    {value}
  </Box>
);

export default Cell;
