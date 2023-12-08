function Square({ value, onClick, XIcon, OIcon }) {
  return (
    <button
      className="box flex items-center justify-center w-32 h-32 md:h-40 md:w-40
              bg-lightBlack rounded-xl cursor-pointer m-2"
      onClick={onClick}
    >
      {value === "X" && <img src={XIcon} alt="X" />}
      {value === "O" && <img src={OIcon} alt="O" />}
    </button>
  );
}

export default Square;
