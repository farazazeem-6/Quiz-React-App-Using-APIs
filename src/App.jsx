import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./styles/Quiz.css";
import { Fragment } from "react";
import bkImg from "./assets/bk.png";
import logoImg from "./assets/logo.svg";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Fragment>
      <img className="bk-img" src={bkImg} alt="" />
      <img className="logo-img" src={logoImg} alt="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:difficulty" element={<Quiz />} />
      </Routes>
    </Fragment>
  );
}

export default App;
