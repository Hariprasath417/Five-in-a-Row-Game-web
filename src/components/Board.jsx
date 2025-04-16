import Cell from './Cell';
import Box from '@mui/material/Box';

const Board = ({ board, onCellClick }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(15, 40px)"
      gridTemplateRows="repeat(15, 40px)"
      gap="4px"
      justifyContent="center"
      mt={2}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Box key={`${rowIndex}-${colIndex}`}>
            <Cell
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default Board;
