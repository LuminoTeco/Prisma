import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Questions.module.css";
import Level from "../../datas/LevelObject";
import mathQuestions from "../../datas/Math.json";
import portugueseQuestions from "../../datas/Port.json";

const Questions = () => {
  const { id } = useParams();
  const phase = Level.find((phase) => phase.id === parseInt(id));

  if (!phase) {
    return <div>Fase não encontrada!</div>;
  }

  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const subjectId = userInfo?.materia_id;

  const questionsData =
    subjectId === 1
      ? mathQuestions
      : subjectId === 2
      ? portugueseQuestions
      : null;

  if (!questionsData) {
    return <div>Matéria não encontrada!</div>;
  }

  const filteredQuestions = questionsData.filter(
    (question) => question.dificuldade === phase.dificuldade
  );

  if (filteredQuestions.length === 0) {
    return <div>Não há questões para este nível de dificuldade!</div>;
  }

  const shuffledQuestions = filteredQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const [questions] = useState(shuffledQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleVerifyAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    const correctAnswer = currentQuestion.resposta_correta;

    // Verifica se a resposta está correta
    if (selectedAnswer === correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerCorrect(null); // Resetar o estado de resposta para a próxima pergunta
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        event.preventDefault();
        alert(
          "Recarregar a página foi desativado durante a execução da atividade."
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.QuestionContainer}>
      <div className={styles.containerFase}>
        <h1>
          Fase {phase.id} — {subjectId === 1 ? "Matemática" : "Português"}
        </h1>
      </div>

      <h2 className={styles.questionTitle}>
        Questão {currentQuestionIndex + 1} de {questions.length}
      </h2>

      <div className={styles.questionTextContainer}>
        <p className={styles.questionText}>{currentQuestion.pergunta}</p>
      </div>

      <div className={styles.alternativas}>
        {currentQuestion.alternativas.map((alternative, index) => (
          <label key={index} className={styles.alternativa}>
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              value={alternative}
              checked={selectedAnswers[currentQuestion.id] === alternative}
              onChange={() =>
                handleAnswerChange(currentQuestion.id, alternative)
              }
              className={styles.checkboxInput}
            />
            <span className={styles.textoAlternativa}>{alternative}</span>
          </label>
        ))}
      </div>

      <div className={styles.navigation}>
        {isAnswerCorrect === null ? (
          <button onClick={handleVerifyAnswer}>Verificar</button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Próxima
          </button>
        )}
      </div>

      {isAnswerCorrect !== null && (
        <div className={styles.feedback}>
          {isAnswerCorrect ? (
            <p className={styles.correct}>Resposta correta!</p>
          ) : (
            <p className={styles.incorrect}>Resposta incorreta!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
