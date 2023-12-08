import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import logo from "../../assets/logo.svg";
import resetButton from "../../assets/icon-restart.svg";
import XIcon from "../../assets/icon-x.svg";
import OIcon from "../../assets/icon-o.svg";
import crossTurn from "../../assets/icon-x-pick.svg";
import circleTurn from "../../assets/icon-o-turn.svg";
import CPUModal from "../components/CPUModal";

function GameStart({ mark }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [tie, setTie] = useState(0);
  const [drawModal, setDrawModal] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(crossTurn);
  const [openModal, setOpenModal] = useState(false);
  const [openXModal, setOpenXModal] = useState(false);

  useEffect(() => {
    if (mark === "O") {
      setCurrentTurn(isPlayerX ? circleTurn : crossTurn);
    } else if (mark === "X") {
      setCurrentTurn(isPlayerX ? crossTurn : circleTurn);
    }
  }, [isPlayerX, crossTurn, circleTurn]);

  useEffect(() => {
    if (mark === "O") {
      setIsPlayerX(!isPlayerX);
    }
  }, []);

  const reset = () => {
    setBoard(Array(9).fill(null));
    if (mark === "O") {
      setIsPlayerX(false);
    } else {
      setIsPlayerX(true);
    }
    setGameOver(false);
  };

  useEffect(() => {
    if (!isPlayerX && !gameOver) {
      const emptySquares = board.reduce((acc, val, index) => {
        if (!val) {
          acc.push(index);
        }
        return acc;
      }, []);
      const computerMove = findBestMove(board, emptySquares);

      setTimeout(() => {
        handlePlayerMove(computerMove);
      }, 1000);
    }
  }, [isPlayerX, board, gameOver]);

  const handlePlayerMove = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = board.slice();
    if (mark === "X") {
      newBoard[index] = isPlayerX ? "X" : "O";
    } else if (mark === "O") {
      setIsPlayerX(!isPlayerX);
      newBoard[index] = isPlayerX ? "O" : "X";
    }

    setBoard(newBoard);
    const winner = checkForWinner(newBoard);
    setGameOver(winner || isBoardFull(newBoard));

    if (winner === "X") {
      setXWins(xWins + 1);
      setOpenXModal(true);
    } else if (winner === "O") {
      setOWins(oWins + 1);
      setOpenModal(true);
    } else if (isBoardFull(newBoard)) {
      setTie(tie + 1);
      setDrawModal(true);
    }

    setIsPlayerX(!isPlayerX);
  };

  const checkForWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const isBoardFull = (currentBoard) => {
    return currentBoard.every((square) => square !== null);
  };

  const findBestMove = (currentBoard, emptySquares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < emptySquares.length; i++) {
      const move = emptySquares[i];
      currentBoard[move] = "O";

      const score = minimax(currentBoard, 0, false);

      currentBoard[move] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const scores = {
    X: -1,
    O: 1,
    draw: 0,
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const winner = checkForWinner(currentBoard);
    if (winner !== null) {
      return scores[winner];
    }

    if (isBoardFull(currentBoard)) {
      return scores.draw;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = "O";
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = "X";
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-12 md:gap-0 md:justify-between w-[33rem] md:w-[33.75rem] my-2 p-2">
        <div>
          <img src={logo} alt="" className="w-20" />
        </div>
        <div className="box bg-lightBlack flex items-center w-44 justify-center gap-4 pt-4 pb-6 px-6 rounded-xl uppercase font-bold text-offGrey">
          <div>
            <img src={currentTurn} alt="" className="w-5 h-5" />
          </div>
          <p>turn</p>
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-offGrey p-2 rounded-md"
            onClick={() => reset()}
          >
            <img src={resetButton} alt="" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      <Board
        squares={board}
        onClick={handlePlayerMove}
        XIcon={XIcon}
        OIcon={OIcon}
      />
      <div className="flex items-center justify-center md:justify-between uppercase gap-2 md:gap-0 w-[33rem] md:w-[33.75rem] my-2 p-2">
        <div className="bg-lightCyan text-black w-32 rounded-xl p-4">
          <span className="text-darkBlack text-sm font-medium">
            x ({mark === "X" ? "you" : "cpu"})
          </span>
          <p className="text-darkBlack font-bold text-2xl">{xWins}</p>
        </div>
        <div className="bg-offGrey text-black w-32 rounded-xl p-4">
          <span className="text-darkBlack text-sm font-medium">ties</span>
          <p className="text-darkBlack font-bold text-2xl">{tie}</p>
        </div>
        <div className="bg-lightOrange text-black w-32 rounded-xl p-4">
          <span className="text-darkBlack text-sm font-medium">
            o ({mark === "X" ? "cpu" : "you"})
          </span>
          <p className="text-darkBlack font-bold text-2xl">{oWins}</p>
        </div>
      </div>

      {mark === "O" && (
        <CPUModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          winner={"you win"}
          symbol={OIcon}
          reset={reset}
          mark={mark}
        />
      )}
      {mark === "O" && (
        <CPUModal
          isOpen={openXModal}
          onClose={() => setOpenXModal(false)}
          winner={"oh no, you lost..."}
          symbol={XIcon}
          reset={reset}
          mark={mark}
        />
      )}
      {mark === "X" && (
        <CPUModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          winner={"oh no, you lost..."}
          symbol={OIcon}
          reset={reset}
          mark={mark}
        />
      )}
      {mark === "X" && (
        <CPUModal
          isOpen={openXModal}
          onClose={() => setOpenXModal(false)}
          winner={"you win"}
          symbol={XIcon}
          reset={reset}
          mark={mark}
        />
      )}

      {drawModal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-darkBlack p-6 shadow-lg w-full uppercase">
              <div className="p-4">
                <h2 className="font-bold text-4xl text-offGrey">round tied</h2>
              </div>
              <div className="mt-4">
                <Link to="/">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="uppercase font-bold text-darkBlack bg-offGrey py-2 px-4 rounded-xl mx-4"
                  >
                    quit
                  </motion.button>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    reset();
                    setDrawModal(false);
                  }}
                  className="uppercase font-bold text-darkBlack bg-darkOrange py-2 px-4 rounded-xl mx-4"
                >
                  next round
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}

export default GameStart;
