import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const [que, setQue] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [selectOpt, setSelectOpt] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=18&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      setQue(data.results);
    }
    fetchData();
  }, [difficulty]);

  if (que.length === 0) return <h1 className="loading">Loading.....</h1>;

  const currentQue = que[currInd];

  const options = [
    ...currentQue.incorrect_answers,
    currentQue.correct_answer,
  ].sort(() => Math.random() - 0.5);

  function nextQue() {
    if (!selectOpt) {
      alert("Please select an option");
      return;
    }

    if (selectOpt === currentQue.correct_answer) {
      alert("Corrent!");
    } else {
      alert(`Wrong! Answer is ${currentQue.correct_answer}`);
    }

    if (currInd < que.length - 1) {
      setCurrInd((prev) => prev + 1);
      setSelectOpt("");
    } else {
      alert("Quiz Completed");
      navigate("/");
    }
  }

  function decodeHTML(para) {
    const txt = document.createElement("textarea");
    txt.innerHTML = para;
    return txt.value;
  }

  return (
    <div id="quiz-container">
      <div id="question-container">
        <div className="question">
          <p>
            Que {currInd + 1} of {que.length}: {decodeHTML(currentQue.question)}
          </p>
        </div>
        <div className="choices">
          {options.map((opt, index) => (
            <div className="opt" key={index}>
              <input
                name="ans"
                value={opt}
                checked={selectOpt === opt}
                onChange={(e) => setSelectOpt(e.target.value)}
                type="radio"
                id={`action-${index}`}
              />
              <label htmlFor={`action-${index}`}>{opt}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
