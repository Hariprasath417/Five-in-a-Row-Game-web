import api from './api';

const startNewGame = () => api.post('/new-game');
const userMove = (gameId, row, col) => api.post(`/${gameId}/move/user`, { row, col });
const aiMove = (gameId) => api.get(`/${gameId}/move/ai`);
const saveBoard = (gameId) => api.post(`/${gameId}/save-board`);

const gameService = {
  startNewGame,
  userMove,
  aiMove,
  saveBoard,
};

export default gameService;
