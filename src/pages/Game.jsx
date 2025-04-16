import { useEffect, useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import Board from '../components/Board';
import Header from '../components/Header';
import ControlPanel from '../components/ControlPanel';
import gameService from '../services/gameService';

const Game = () => {
  const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill('')));
  const [history, setHistory] = useState([]);
  const [gameId, setGameId] = useState(null);

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
    if (!board[row][col]) {
      const updatedBoard = board.map(r => [...r]);
      updatedBoard[row][col] = 'X';

      setHistory([...history, board]);
      setBoard(updatedBoard);

      await gameService.userMove(gameId, row, col);
      const aiResponse = await gameService.aiMove(gameId);

      const aiMove = aiResponse.data.move;
      if (aiMove) {
        updatedBoard[aiMove.row][aiMove.col] = 'O';
        setBoard([...updatedBoard]);
      }
    }
  };

  const handleUndo = () => {
    const prev = history.pop();
    if (prev) setBoard(prev);
    setHistory([...history]);
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
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Header />
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Board board={board} onCellClick={handleCellClick} />
        <ControlPanel onRestart={handleRestart} onUndo={handleUndo} />
      </Container>
    </Box>
  );
};

export default Game;
