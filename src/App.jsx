import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameStart2 from "./pages/GameStart2";
import GameStart from "./pages/GameStart";
import "./App.css";

function App() {
  const [mark, setMark] = useState("X");
  const handleSetMark = () => {
    setMark((prevMark) => (prevMark === "X" ? "O" : "X"));
  };

  return (
    <AnimatePresence>
      <Routes>
        <Route
          path="/"
          element={<Home mark={mark} handleSetMark={handleSetMark} />}
        />
        <Route path="/player" element={<GameStart2 />} />
        <Route path="/cpu" element={<GameStart mark={mark} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
