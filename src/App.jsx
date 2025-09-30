import "./App.css";

function App() {
  const API_URLS = {
    easy:"https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple",
    medium:"https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple",
    hard:"https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple",
  };
  return (
    <div>
      <h1>QUIZ APP USING REACT</h1>
    </div>
  );
}

export default App;
