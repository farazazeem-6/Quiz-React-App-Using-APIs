import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import "./styles/Quiz.css";
import { Fragment } from "react";

function App() {
  const API_URLS = {
    easy: "https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple",
    medium: "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple",
    hard: "https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple",
  };
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:difficulty" element={<Quiz />} />
      </Routes>
    </Fragment>
  );
}

export default App;
