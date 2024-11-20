import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import styles from "./Questions.module.css";
import Level from "../../datas/LevelObject";
import solteco from "@assets/imgs/sol.png";
import mathQuestions from "../../datas/Math.json";
import portugueseQuestions from "../../datas/Port.json";

const Questions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [xp, setXp] = useState(0);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    if (!isQuizFinished || !userInfo?.aluno_id) return;
  
    const sendRequest = async (url, data, successMessage, errorMessage) => {
      try {
        const response = await axios.post(url, data);
        console.log(successMessage, response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    };
  
    const sendPatchRequest = async (url, data, successMessage, errorMessage) => {
      try {
        const response = await axios.patch(url, data);
        console.log(successMessage, response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    };
  
    // Enviar XP
    sendPatchRequest(
      "http://localhost:8081/prisma/insertXp",
      { aluno_id: userInfo.aluno_id, xpGanho: xp },
      "XP enviado com sucesso:",
      "Erro ao enviar XP:"
    );
  
    // Verificar horários e enviar Achievements
    const hours = new Date().getHours();
  
    const achievements = [
      { condition: hours < 8, id_achivement: 1 },
      { condition: true, id_achivement: 2 }, 
      { condition: hours > 22 && hours < 24, id_achivement: 3 },
    ];
  
    achievements.forEach(({ condition, id_achivement }) => {
      if (condition) {
        sendRequest(
          "http://localhost:8081/prisma/addAchivement",
          { id_aluno: userInfo.aluno_id, id_achivement },
          `Achievement ${id_achivement} enviado com sucesso:`,
          `Erro ao enviar Achievement ${id_achivement}:`
        );
      }
    });
  }, [isQuizFinished, xp, userInfo]);
  

  const handleVerifyAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    const correctAnswer = currentQuestion.resposta_correta;

    if (selectedAnswer === correctAnswer) {
      setIsAnswerCorrect(true);
      setXp(xp + 10);
      handleNext()
      toast.success("🎉 Resposta correta! +10 XP", {
        position: "bottom-center", 
        autoClose: 1000,
        theme: "colored"
      });
    } else {
      setIsAnswerCorrect(false);
      setXp(xp - xp * 0.12);
      toast.error("❌ Resposta errada!", {
        position: "bottom-center", 
        autoClose: 1000,
        theme: "colored"
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerCorrect(null);
    } else {
      setIsQuizFinished(true);
    }
  };

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

  if (isQuizFinished) {
    return (
      <div className={styles.finalScreen}>
       <div className={styles.components}>
       <h1>Parabéns! Você concluiu a fase!</h1>
        <p>
          Sua pontuação final: <strong>{xp.toFixed(2)}</strong>
        </p>
        <button
          onClick={() => {
            navigate("/inicio/tarefas");
          }}
        >
          Voltar
        </button>
       </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.QuestionContainer}>
      <ToastContainer /> 
      <div className={styles.containerTextInfoPhase}>
        <div className={styles.SubjectName}>
          <h2>{subjectId === 1 ? "Matemática" : "Português"}</h2>
        </div>
        <div className={styles.questionContainer}>
          <div className={styles.containerImgTeco}>
            <img src={solteco} alt="" />
          </div>
          <div className={styles.ContainerTextQuestion}>
            {currentQuestion.pergunta}
          </div>
        </div>
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
          <button onClick={handleNext}>Próxima</button>
        )}
      </div>
    </div>
  );
};

export default Questions;
