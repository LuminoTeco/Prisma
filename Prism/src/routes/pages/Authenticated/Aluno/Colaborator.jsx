import React, { useEffect, useState } from "react";
import styles from "./Colaborator.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Colaborator = () => {
  const [values, setValues] = useState({
    nome: "",
    nivel: 0,
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCollaborator, setIsCollaborator] = useState(false); 

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

      // Verifica se o aluno é colaborador
      axios
        .get("http://localhost:8081/prisma/verifyColaborator", {
          params: { aluno_id_fk: aluno_id },
        })
        .then((response) => {
          if (response.data.id.length > 0) {
            setIsCollaborator(true); 
          }
        })
        .catch((error) => {
          console.error("Erro ao verificar colaborador:", error);
        });
    }
  }, [aluno_id]);

  useEffect(() => {
    // Redireciona se já for colaborador
    if (isCollaborator) {
      setTimeout(() => {
        navigate("/inicio/perfil");
      }, 2000);
    }
  }, [isCollaborator, navigate]);

  const handleEmailSubmit = () => {
    if (email) {
      axios
        .post("http://localhost:8081/prisma/InsertStudentColaborator", { email })
        .then(() => {
          setMessage("Parabéns! Você agora faz parte da nossa equipe.");
          setTimeout(() => {
            navigate("/inicio/perfil");
          }, 2000);
        })
        .catch((error) => {
          setMessage("Ocorreu um erro ao registrar seu e-mail. Tente novamente.");
          console.error(error);
        });
    } else {
      setMessage("Por favor, insira um e-mail válido.");
    }
  };

  const { nivel } = values;

  return (
    <div className={styles.Background}>
      <div className={styles.ContainerColaborator}>
        {isCollaborator ? (
          // Caso já seja colaborador
          <h1 className={styles.Title}>Você já é um colaborador!</h1>
        ) : nivel < 10 ? (
          // Caso o nível seja insuficiente
          <h1 className={styles.Title}>
            Ainda não é possível se tornar um colaborador
          </h1>
        ) : (
          // Caso o nível permita
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
              <button
                onClick={handleEmailSubmit}
                className={styles.submitButton}
              >
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
