import { Button, Stack } from '@mui/material';

const ControlPanel = ({ onRestart, onUndo, disableUndo }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="error"
        onClick={onUndo}
        disabled={disableUndo} // Disable when game is over
      >
        Undo Move
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={onRestart}
      >
        Restart Game
      </Button>
    </Stack>
  );
};

export default ControlPanel;