import Cell from './Cell';
import Box from '@mui/material/Box';

const Board = ({ board, onCellClick, aiLastMove }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(15, 32px)"
      gridTemplateRows="repeat(15, 32px)"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: '2px solid #ccc',
        position: 'relative',
        width: 'fit-content',
        backgroundColor: '#fff',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isAiRow = aiLastMove?.row === rowIndex;
          const isAiCol = aiLastMove?.col === colIndex;

          return (
            <Box
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              sx={{
                width: 32,
                height: 32,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: '#fff',
                ...(isAiRow && {
                  borderTop: '2px solid red',
                  borderBottom: '2px solid red',
                }),
                ...(isAiCol && {
                  borderLeft: '2px solid red',
                  borderRight: '2px solid red',
                }),
              }}
            >
              <Cell value={cell} />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Board;
