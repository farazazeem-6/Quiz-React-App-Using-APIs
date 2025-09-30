import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>QUIZ APP USING REACT</h1>
      <p>Select Difficulty</p>
      <button onClick={() => navigate("/quiz/easy")}>Easy</button>
      <button onClick={() => navigate("/quiz/medium")}>Medium</button>
      <button onClick={() => navigate("/quiz/hard")}>Hard</button>
    </div>
  );
}

export default Home;
