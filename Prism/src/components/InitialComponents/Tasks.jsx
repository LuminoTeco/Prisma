import React, { useState } from "react";
import styles from "./Tasks.module.css";
import perguntasMatematica from "../datas/Math.json"; // Importa o JSON de perguntas de Matemática
import perguntasPortugues from "../datas/Port.json"; // Importa o JSON de perguntas de Português

const Tasks = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaEscolhida, setRespostaEscolhida] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null); // Armazena se a resposta foi correta ou não

  const handleChoice = (subject) => {
    setSelectedSubject(subject);

    if (subject === "Matemática") {
      const perguntasAleatorias = [];
      const perguntas = perguntasMatematica;

      while (perguntasAleatorias.length < 5) {
        const indexAleatorio = Math.floor(Math.random() * perguntas.length);
        const perguntaSelecionada = perguntas[indexAleatorio];

        if (!perguntasAleatorias.includes(perguntaSelecionada)) {
          perguntasAleatorias.push(perguntaSelecionada);
        }
      }

      setPerguntasSelecionadas(perguntasAleatorias);
    } else if (subject === "Português") {
      const perguntasAleatorias = [];
      const perguntas = perguntasPortugues;

      while (perguntasAleatorias.length < 5) {
        const indexAleatorio = Math.floor(Math.random() * perguntas.length);
        const perguntaSelecionada = perguntas[indexAleatorio];

        if (!perguntasAleatorias.includes(perguntaSelecionada)) {
          perguntasAleatorias.push(perguntaSelecionada);
        }
      }

      setPerguntasSelecionadas(perguntasAleatorias);
    }

    setPerguntaAtual(0);
    setFeedback(null);
    setRespostaEscolhida(null);
    setRespostaCorreta(null); // Reseta a variável de resposta correta
  };

  const handleAnswer = (resposta) => {
    setRespostaEscolhida(resposta);

    const perguntaAtualObj = perguntasSelecionadas[perguntaAtual];
    if (resposta === perguntaAtualObj.resposta_correta) {
      setFeedback("Correto!");
      setRespostaCorreta(true); // Marca como correta
    } else {
      setFeedback("Incorreto.");
      setRespostaCorreta(false); // Marca como incorreta
    }
  };

  const handleNextQuestion = () => {
    if (perguntaAtual < perguntasSelecionadas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setFeedback(null);
      setRespostaEscolhida(null);
      setRespostaCorreta(null); // Reseta a variável de resposta correta
    } else {
      alert("Você completou o quiz!");
      setSelectedSubject(null);
      setPerguntasSelecionadas([]);
      setPerguntaAtual(0);
      setFeedback(null);
      setRespostaEscolhida(null);
      setRespostaCorreta(null); // Reseta a variável de resposta correta
    }
  };

  return (
    <div className={styles.container}>
      {!selectedSubject ? (
        <div>
          <h1 className={styles.title}>Escolha um assunto:</h1>
          <button
            onClick={() => handleChoice("Matemática")}
            className={styles.subjectButton}
          >
            Matemática
          </button>
          <button
            onClick={() => handleChoice("Português")}
            className={styles.subjectButton}
          >
            Português
          </button>
        </div>
      ) : (
        <div>
          <h1 className={styles.title}>{selectedSubject}</h1>
          <h2 className={styles.question}>
            {perguntasSelecionadas[perguntaAtual].pergunta}
          </h2>
          <div>
            {perguntasSelecionadas[perguntaAtual].alternativas.map(
              (alternativa, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(alternativa)}
                  className={`${styles.answerButton} ${
                    respostaEscolhida
                      ? alternativa === perguntasSelecionadas[perguntaAtual].resposta_correta
                        ? styles.correctAnswer
                        : styles.incorrectAnswer
                      : ""
                  }`}
                  disabled={respostaEscolhida}
                >
                  {alternativa}
                </button>
              )
            )}
          </div>
          {feedback && (
            <p
              className={
                respostaCorreta ? styles.feedbackCorrect : styles.feedbackIncorrect
              }
            >
              {feedback}
            </p>
          )}
          {respostaEscolhida && (
            <button onClick={handleNextQuestion} className={styles.nextButton}>
              {perguntaAtual < perguntasSelecionadas.length - 1
                ? "Próxima pergunta"
                : "Finalizar"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
