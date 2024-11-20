import React, { useEffect, useState } from "react";
import styles from "./Colaborator.module.css";
import axios from "axios";

const Colaborator = () => {
  const [values, setValues] = useState({
    nome: "",
    nivel: 0,
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const userValues = JSON.parse(localStorage.getItem("user_info"));
  const { aluno_id } = userValues || {};

  useEffect(() => {
    if (aluno_id) {
      axios
        .get(`http://localhost:8081/prisma/allinformation/${aluno_id}`)
        .then((response) => {
          const { nome_aluno, nivel } = response.data.result[0];
          setValues({
            nome: nome_aluno,
            nivel: nivel,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [aluno_id]);

  const handleEmailSubmit = () => {
    if (email) {
      // Aqui você faria a chamada para o backend para registrar o e-mail
      axios
        .post("http://localhost:8081/api/registrar-colaborador", { email })
        .then((response) => {
          setMessage("Parabéns! Você agora faz parte da nossa equipe.");
        })
        .catch((error) => {
          setMessage("Ocorreu um erro ao registrar seu e-mail. Tente novamente.");
        });
    } else {
      setMessage("Por favor, insira um e-mail válido.");
    }
  };

  const { nivel } = values;

  return (
    <div className={styles.Background}>
      <div className={styles.ContainerColaborator}>
        {nivel < 10 ? (
          <h1 className={styles.Title}>
            Ainda não é possível se tornar um colaborador
          </h1>
        ) : (
          <div className={styles.containerSendEmail}>
            <h1>
              Parabéns! Você agora tem a oportunidade de se tornar um{" "}
              <span className={styles.spotligth}>colaborador</span>.
            </h1>
            <p>
              Com esse novo título, você poderá desfrutar de diversos benefícios
              exclusivos. Além de deixar suas mensagens em destaque, suas
              respostas serão verificadas, o que traz mais confiabilidade e
              precisão para suas interações. E não é só isso! Você também
              ganhará um design inovador e uma nova barra de progresso para
              acompanhar seu desempenho de forma visual e prática. Não perca
              essa chance de fazer parte de um time especial. Basta adicionar
              seu e-mail abaixo e se tornar um de nós!
            </p>
            <div className={styles.emailInput}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className={styles.inputField}
              />
              <button onClick={handleEmailSubmit} className={styles.submitButton}>
                Confirmar e-mail
              </button>
            </div>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colaborator;
