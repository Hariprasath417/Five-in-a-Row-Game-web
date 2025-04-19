import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, keyframes } from '@mui/material';
import { styled } from '@mui/system';

// Keyframes for animated text
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const AnimatedText = styled(Typography)(({ theme }) => ({
  animation: `${pulse} 3s infinite`,
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
  textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
}));

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url("/assets/Screenshot (19).png")', // Make sure the image is saved in your public/assets folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pb: 12,
        color: '#fff',
      }}
    >
      <AnimatedText
        variant="h2"
        sx={{
          mb: 3,
          fontFamily: '"Cinzel", serif', // Optional fantasy-style font
          letterSpacing: 2,
        }}
      >
        The Fifth Move
      </AnimatedText>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          px: 5,
          py: 1.8,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          fontWeight: 'bold',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
          },
        }}
        onClick={handleStart}
      >
        It’s Go Time
      </Button>
    </Box>
  );
};

export default Home;
