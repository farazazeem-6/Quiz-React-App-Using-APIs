import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const { difficulty } = useParams(); // easy | medium | hard
  const nav = useNavigate();
  return (
    <div>
      <h1>This is quiz page</h1>
      <p>You selected: {difficulty}</p>
      <button onClick={() => nav("/")}>Go Home</button>
    </div>
  );
}

export default Quiz;
