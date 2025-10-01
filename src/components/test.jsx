import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function test() {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=18&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      console.log(data.results);
      setQuestions(data.results);
    }
    fetchData();
  }, [difficulty]);

  if (questions.length === 0) return <h2 className="loading">Loading...</h2>;

  const currentQuestion = questions[currentIndex];

  // Shuffle options (combine incorrect + correct answers)
  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  function handleNext() {
    // Check if user selected an answer
    if (!selectedAnswer) {
      alert("⚠️ Please select an answer!");
      return;
    }

    // Check if answer is correct
    if (selectedAnswer === currentQuestion.correct_answer) {
      alert("✅ Correct!");
    } else {
      alert(`❌ Wrong! Correct answer was: ${currentQuestion.correct_answer}`);
    }

    // Move to next question or finish quiz
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(""); // Reset selection for next question
    } else {
      alert("🎉 Quiz Completed!");
      navigate("/");
    }
  }

  // Decode HTML entities (like &#039; to ')
  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <div className="quiz-container">
      <div className="question-container">
        <div className="question">
          <p>
            Question {currentIndex + 1} of {questions.length}:{" "}
            {decodeHTML(currentQuestion.question)}
          </p>
        </div>
        <div className="choices">
          {options.map((option, index) => (
            <h3 key={index}>
              <input
                type="radio"
                name="answer"
                id={`option-${index}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              <label className="lable" htmlFor={`option-${index}`}>
                {decodeHTML(option)}
              </label>
            </h3>
          ))}
        </div>
      </div>
      <div className="footer-btn">
        <button
          className="button home"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Go Home
        </button>
        <button className="next button" onClick={handleNext}>
          {currentIndex < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </button>
      </div>
    </div>
  );
}

export default test;
