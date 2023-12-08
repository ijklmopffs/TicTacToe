import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CPUModal = ({ isOpen, onClose, winner, symbol, reset, mark }) => {
  if (!isOpen) {
    return null;
  }
  console.log(mark);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-darkBlack p-6 shadow-lg w-full flex items-center justify-center uppercase">
          <div className="p-4">
            <p className="font-bold text-offGrey mb-4">{winner}</p>
            <div className="flex items-center gap-4">
              <div>
                <img src={symbol} alt="" className="w-16 h-16" />
              </div>
              <h2
                className={`font-bold text-4xl tracking-wider ${
                  mark === "O"
                    ? "text-darkOrange"
                    : mark === "X"
                    ? "text-darkCyan"
                    : "text-darkOrange"
                }`}
              >
                takes the round
              </h2>
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
                  onClose();
                }}
                className="uppercase font-bold text-darkBlack bg-darkOrange py-2 px-4 rounded-xl mx-4"
              >
                next round
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CPUModal;
