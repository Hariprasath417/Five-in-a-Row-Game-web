// src/store/gameContext.js
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill('')));
  const [history, setHistory] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [winner, setWinner] = useState(null);

  const resetBoard = () => {
    setBoard(Array(15).fill(null).map(() => Array(15).fill('')));
    setHistory([]);
    setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        history,
        setHistory,
        gameId,
        setGameId,
        winner,
        setWinner,
        resetBoard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
