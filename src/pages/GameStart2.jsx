import { motion } from "framer-motion";
import circle from "../../assets/icon-o.svg";
import cross from "../../assets/icon-x.svg";
// import circleOutline from "../../assets/icon-o-outline.svg";
// import crossOutline from "../../assets/icon-x-outline.svg";
import logo from "../../assets/logo.svg";
import crossTurn from "../../assets/icon-x-pick.svg";
import circleTurn from "../../assets/icon-o-turn.svg";
import resetButton from "../../assets/icon-restart.svg";
import { useRef, useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

let data = ["", "", "", "", "", "", "", "", ""];

export default function GameStart2() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [tie, setTie] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openXModal, setOpenXModal] = useState(false);
  const [drawModal, setDrawModal] = useState(false);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${cross} class='w-16 h-16'/>`;
      data[num] = "x";
      setCount((count) => count + 1);
      e.target.classList.add("player-x");
    } else {
      e.target.innerHTML = `<img src=${circle} class='w-16 h-16'>`;
      data[num] = "o";
      setCount((count) => count + 1);
      e.target.classList.add("player-o");
    }
    checkWin();
  };

  const draw = () => {
    setTie((tie) => tie + 1);
    setDrawModal(true);
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data.every((cell) => cell !== "")) {
      draw();
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      setXWins((xWins) => xWins + 1);
      setOpenXModal(true);
    } else if (winner === "o") {
      setOWins((oWins) => oWins + 1);
      setOpenModal(true);
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
    setCount(0);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        exit={{ opacity: 0 }}
        className="p-4 w-[28.75rem] text-white"
      >
        <div className="flex items-center justify-between w-[27rem] md:w-[28.75rem] my-2 p-2">
          <div>
            <img src={logo} alt="" className="w-20" />
          </div>
          <div className="box bg-lightBlack flex items-center w-44 justify-center gap-4 pt-4 pb-6 px-6 rounded-xl uppercase font-bold text-offGrey">
            <div>
              <img
                src={count % 2 === 0 ? crossTurn : circleTurn}
                alt=""
                className="w-5 h-5"
              />
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
        <div className="w-[28.75rem] flex md:justify-center">
          <div className="row1">
            <div
              onClick={(e) => toggle(e, 0)}
              ref={box1}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40
              bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 1)}
              ref={box2}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 2)}
              ref={box3}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
          </div>
          <div className="row2">
            <div
              onClick={(e) => toggle(e, 3)}
              ref={box4}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 4)}
              ref={box5}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 5)}
              ref={box6}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
          </div>
          <div className="row3">
            <div
              onClick={(e) => toggle(e, 6)}
              ref={box7}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 7)}
              ref={box8}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
            <div
              onClick={(e) => toggle(e, 8)}
              ref={box9}
              className="box flex items-center md:justify-center w-32 h-32 md:h-40 md:w-40 bg-lightBlack rounded-xl cursor-pointer m-2"
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between uppercase w-[27rem] md:w-[28.75rem] my-2 p-2">
          <div className="bg-lightCyan text-black w-32 rounded-xl p-2">
            <span className="text-darkBlack text-sm font-medium">x (p2)</span>
            <p className="text-darkBlack font-bold text-2xl">{xWins}</p>
          </div>
          <div className="bg-offGrey text-black w-32 rounded-xl p-2">
            <span className="text-darkBlack text-sm font-medium">ties</span>
            <p className="text-darkBlack font-bold text-2xl">{tie}</p>
          </div>
          <div className="bg-lightOrange text-black w-32 rounded-xl p-2">
            <span className="text-darkBlack text-sm font-medium">o (p1)</span>
            <p className="text-darkBlack font-bold text-2xl">{oWins}</p>
          </div>
        </div>
      </motion.main>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        winner={1}
        symbol={circle}
        reset={reset}
      />
      <Modal
        isOpen={openXModal}
        onClose={() => setOpenXModal(false)}
        winner={2}
        symbol={cross}
        reset={reset}
      />
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
