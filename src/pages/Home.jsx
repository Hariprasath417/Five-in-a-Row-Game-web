import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to Five in a Row
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ px: 4, py: 1.5, borderRadius: 2, boxShadow: 2 }}
        onClick={handleStart}
      >
        Start Game
      </Button>
    </Box>
  );
};

export default Home;
