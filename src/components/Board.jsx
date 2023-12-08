import Square from "../components/Square";

function Board({ squares, onClick, XIcon, OIcon }) {
  return (
    <div className="w-[33.75rem] flex flex-wrap justify-center">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          XIcon={XIcon}
          OIcon={OIcon}
        />
      ))}
    </div>
  );
}

export default Board;
