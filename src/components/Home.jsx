import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <img className="bk-img" src="./src/assets/bk.png" alt="" />
      <img className="logo-img" src="./src/assets/logo.svg" alt="" />
      <div className="home-data">
        <h1 className="home-heading">Welcome to Quiz App</h1>
        <p className="category">Select Category</p>
        <div className="btn">
          <button
            className="button easy"
            onClick={() => navigate("/quiz/easy")}
          >
            Easy
          </button>
          <button
            className="button medium"
            onClick={() => navigate("/quiz/medium")}
          >
            Medium
          </button>
          <button
            className="button hard"
            onClick={() => navigate("/quiz/hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
