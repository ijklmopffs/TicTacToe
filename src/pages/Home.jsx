import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ mark, handleSetMark }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      exit={{ opacity: 0 }}
      className="p-4 w-[28.75rem]"
    >
      <div className="my-10">
        <svg
          width="72"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <g fill="none" fillRule="evenodd">
            <path
              d="M8.562 1.634 16 9.073l7.438-7.439a3 3 0 0 1 4.243 0l2.685 2.685a3 3 0 0 1 0 4.243L22.927 16l7.439 7.438a3 3 0 0 1 0 4.243l-2.685 2.685a3 3 0 0 1-4.243 0L16 22.927l-7.438 7.439a3 3 0 0 1-4.243 0L1.634 27.68a3 3 0 0 1 0-4.243L9.073 16 1.634 8.562a3 3 0 0 1 0-4.243L4.32 1.634a3 3 0 0 1 4.243 0Z"
              fill="#31C3BD"
            />
            <path
              d="M56.1 0c8.765 0 15.87 7.106 15.87 15.87 0 8.766-7.105 15.871-15.87 15.871-8.765 0-15.87-7.105-15.87-15.87C40.23 7.106 47.334 0 56.1 0Zm0 9.405a6.466 6.466 0 1 0 0 12.931 6.466 6.466 0 0 0 0-12.931Z"
              fill="#F2B137"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </div>
      <div className="bg-lightBlack rounded-xl p-4 text-center box">
        <p className="font-bold text-offGrey">PICK PLAYER 1’S MARK</p>
        <div className="bg-darkBlack flex items-center gap-2 justify-between w-[24.75rem] p-2 rounded-xl my-5">
          <div
            onClick={handleSetMark}
            className={
              mark === "X"
                ? "mx-auto bg-offGrey cursor-pointer w-48 p-1 rounded-xl"
                : "mx-auto bg-none cursor-pointer w-48 p-1 rounded-xl"
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.5569 5.28973L26.7103 0.443061C26.1195 -0.147687 25.1617 -0.147687 24.571 0.443061L16 9.01404L7.42902 0.443061C6.83827 -0.147687 5.88048 -0.147687 5.28973 0.443061L0.443061 5.28973C-0.147687 5.88048 -0.147687 6.83827 0.443061 7.42902L9.01404 16L0.443061 24.571C-0.147687 25.1617 -0.147687 26.1195 0.443061 26.7103L5.28973 31.5569C5.88048 32.1477 6.83827 32.1477 7.42902 31.5569L16 22.986L24.571 31.5569C25.1617 32.1477 26.1195 32.1477 26.7103 31.5569L31.5569 26.7103C32.1477 26.1195 32.1477 25.1617 31.5569 24.571L22.986 16L31.5569 7.42902C32.1477 6.83827 32.1477 5.88048 31.5569 5.28973Z"
                fill={mark === "X" ? "#1A2A33" : "#A8BFC9"}
              />
            </svg>
          </div>
          <div
            onClick={handleSetMark}
            className={
              mark === "X"
                ? "bg-none w-48 p-1 rounded-xl cursor-pointer"
                : "bg-offGrey w-48 p-1 rounded-xl cursor-pointer"
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.7412 15.8706C31.7412 7.10551 24.6357 0 15.8706 0C7.10551 0 0 7.10551 0 15.8706C0 24.6357 7.10551 31.7412 15.8706 31.7412C24.6357 31.7412 31.7412 24.6357 31.7412 15.8706ZM9.4048 15.8706C9.4048 12.2996 12.2996 9.4048 15.8706 9.4048C19.4416 9.4048 22.3364 12.2996 22.3364 15.8706C22.3364 19.4416 19.4416 22.3364 15.8706 22.3364C12.2996 22.3364 9.4048 19.4416 9.4048 15.8706Z"
                fill={mark === "X" ? "#A8BFC9" : "#1A2A33"}
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-offGrey">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="flex flex-col gap-4 my-10">
        <Link to="/cpu">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl w-full text-darkBlack bg-darkOrange p-4 rounded-xl cpu"
          >
            NEW GAME (VS CPU)
          </motion.button>
        </Link>
        <Link to="/player">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl w-full text-darkBlack bg-darkCyan p-4 rounded-xl player"
          >
            NEW GAME (VS PLAYER)
          </motion.button>
        </Link>
      </div>
    </motion.main>
  );
}
