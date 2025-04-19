import { useEffect, useState, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
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
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Header />
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Board board={board} onCellClick={handleCellClick} aiLastMove={aiLastMove} />
        {gameOver && (
          <Typography variant="h6" sx={{ mt: 2, color: winner === 'user' ? 'green' : 'red', fontWeight: 'bold' }}>
            Game Over! Winner: {winner === 'user' ? 'You' : 'AI'}
          </Typography>
        )}
        <ControlPanel onRestart={handleRestart} onUndo={handleUndo} disableUndo={gameOver} />
      </Container>
    </Box>
  );
};

export default Game;
