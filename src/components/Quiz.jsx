import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const [que, setQue] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [selectOpt, setSelectOpt] = useState("");
  const [shuffleOptions, setShuffleOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

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

    const answerData = {
      question: currentQue.question,
      userAnswer: selectOpt,
      correctAnswer: currentQue.correct_answer,
      isCorrect: selectOpt === currentQue.correct_answer,
    };

    setUserAnswers((prev) => [...prev, answerData]);

    if (currInd < que.length - 1) {
      setCurrInd((prev) => prev + 1);
      setSelectOpt("");
    } else {
      setShowResults(true);
    }
  }

  function decodeHTML(para) {
    const txt = document.createElement("textarea");
    txt.innerHTML = para;
    return txt.value;
  }

  const correctCount = userAnswers.filter((ans) => ans.isCorrect).length;
  const totalQuestions = que.length;

  
  // Modal

  if (showResults) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h1 className="modal-title"> Quiz Result</h1>
          <div className="score-summary">
            <h2>
              Your Score: {correctCount} / {totalQuestions}
            </h2>
          </div>

          <div className="results-list">
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className={`result-item ${
                  answer.isCorrect ? "correct" : "wrong"
                }`}
              >
                <h3>Question {index + 1}</h3>
                <p className="question-text">{decodeHTML(answer.question)}</p>
                <div className="answer-details">
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span
                      className={
                        answer.isCorrect ? "correct-text" : "wrong-text"
                      }
                    >
                      {decodeHTML(answer.userAnswer)}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      <span className="correct-text">
                        {decodeHTML(answer.correctAnswer)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="modal-buttons">
            <button onClick={() => navigate("/")} className="modalhome">
              Go Home
            </button>
            <button onClick={() => window.location.reload()} className="retry">
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
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
