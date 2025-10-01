import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const [que, setQue] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [selectOpt, setSelectOpt] = useState("");
  const [shuffleOptions, setShuffleOptions] = useState([]);

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

  useEffect(() => {
    if (que && que.length > 0 && que[currInd]) {
      const currentQue = que[currInd];
      if (currentQue.incorrect_answers && currentQue.correct_answer) {
        const shuffled = [
          ...currentQue.incorrect_answers,
          currentQue.correct_answer,
        ].sort(() => Math.random() - 0.5);
        setShuffleOptions(shuffled);
      }
    }
  }, [currInd, que]);

  
  if (!que || que.length === 0 || shuffleOptions.length === 0) {
    return <h1 className="loading">Loading.....</h1>;
  }

  const currentQue = que[currInd];

  function nextQue() {
    if (!selectOpt) {
      alert("Please select an option");
      return;
    }

    if (selectOpt === currentQue.correct_answer) {
      alert("Correct!");
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
          {shuffleOptions.map((opt, index) => (
            <div className="opt" key={index}>
              <input
                name="ans"
                value={opt}
                checked={selectOpt === opt}
                onChange={(e) => setSelectOpt(e.target.value)}
                type="radio"
                id={`action-${index}`}
              />
              <label htmlFor={`action-${index}`}>{decodeHTML(opt)}</label>
            </div>
          ))}
        </div>
        <div className="next-btn">
          <button onClick={() => nextQue()} className="button next">
            Submit
          </button>
        </div>
      </div>
      <button onClick={() => navigate("/")} className="button home">
        Home
      </button>
    </div>
  );
}

export default Quiz;