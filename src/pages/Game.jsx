import { useEffect, useState, useRef } from 'react';
import { Box, Container, Typography, Button, Paper, Grid, Divider } from '@mui/material';
import Board from '../components/Board';
import Header from '../components/Header';
import ControlPanel from '../components/ControlPanel';
import gameService from '../services/gameService';

const Game = () => {
  const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill('')));
  const [history, setHistory] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [aiLastMove, setAiLastMove] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const hasStarted = useRef(false);

  useEffect(() => {
    const startGame = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;
      const response = await gameService.startNewGame();
      setGameId(response.data.gameId);
    };
    startGame();
  }, []);

  const handleCellClick = async (row, col) => {
    if (!board[row][col] && !gameOver) {
      const updatedBoard = board.map(r => [...r]);
      updatedBoard[row][col] = 'X';
      setHistory([...history, board]);
      setBoard(updatedBoard);
      setStep(step + 1);

      const userResponse = await gameService.userMove(gameId, row, col);

      if (userResponse.data.winner) {
        setGameOver(true);
        setWinner(userResponse.data.winner);
        return;
      }

      const aiResponse = await gameService.aiMove(gameId);
      const aiMove = aiResponse.data.move;

      if (aiMove) {
        updatedBoard[aiMove.row][aiMove.col] = 'O';
        setBoard([...updatedBoard]);
        setAiLastMove({ row: aiMove.row, col: aiMove.col });
        setStep(step + 2); // One for player, one for AI

        if (aiResponse.data.winner) {
          setGameOver(true);
          setWinner(aiResponse.data.winner);
        }
      }
    }
  };

  const handleUndo = () => {
    if (gameOver || history.length === 0) return;
    const prevBoard = history[history.length - 1];
    setBoard(prevBoard);
    setHistory(history.slice(0, -1));
    setAiLastMove(null);
    setStep(step - 2);
  };

  const handleRestart = async () => {
    const shouldSave = window.confirm('Do you want to save the current board?');
    if (shouldSave && gameId) {
      await gameService.saveBoard(gameId);
    }

    const response = await gameService.startNewGame();
    setGameId(response.data.gameId);
    setBoard(Array(15).fill(null).map(() => Array(15).fill('')));
    setHistory([]);
    setAiLastMove(null);
    setGameOver(false);
    setWinner(null);
    setStep(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Board Section */}
          <Grid item xs={12} md={8} display="flex" justifyContent="center">
            <Board board={board} onCellClick={handleCellClick} aiLastMove={aiLastMove} />
          </Grid>

          {/* Side Panel */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Button variant="outlined" fullWidth onClick={() => setShowInfo(!showInfo)}>
                Toggle Info
              </Button>

              {showInfo && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    <strong>Current Step:</strong> {step}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Total Steps:</strong> {step}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    <strong>Whose Turn:</strong> {gameOver ? 'Game Over' : 'Player (Black)'}
                  </Typography>

                  <Button variant="contained" color="primary" fullWidth sx={{ py: 2, fontSize: '1rem' }}>
                    Your turn
                  </Button>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="body1">
                    <strong>Player:</strong> Black stones
                  </Typography>
                  <Typography variant="body1">
                    <strong>AI:</strong> White stones
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Game Over Message */}
        {gameOver && (
          <Typography variant="h6" sx={{ mt: 3, color: winner === 'user' ? 'green' : 'red', fontWeight: 'bold', textAlign: 'center' }}>
            Game Over! Winner: {winner === 'user' ? 'You' : 'AI'}
          </Typography>
        )}

        {/* Control Panel */}
        <Box display="flex" justifyContent="center" mt={3}>
          <ControlPanel onRestart={handleRestart} onUndo={handleUndo} disableUndo={gameOver} />
        </Box>
      </Container>
    </Box>
  );
};

export default Game;
