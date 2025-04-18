const Cell = ({ value }) => {
  if (!value) return null;

  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: value === 'X' ? 'black' : 'white',
        border: value === 'O' ? '1px solid #333' : 'none',
        boxShadow: 'inset 0 0 3px rgba(0,0,0,0.6)'
      }}
    />
  );
};

export default Cell;
