import React, { useState, useEffect } from "react";
import styles from "../CSS/Units.module.css";
import axios from "axios";

const Units = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    Cod_Escolar: "",
    NameInstitute: "",
    emailInstitute: "",
    city: "",
    qtdStudents: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Não permite retroceder além do passo 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    setSuccess(false); 

    axios
      .post("http://localhost:8081/prisma/users", values)
      .then((response) => {
        console.log(response.data);
        setSuccess(true); // Define sucesso como verdadeiro
        setErrors([]); // Limpa os erros
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Houve um erro ao cadastrar a unidade:", error);
          alert("Erro ao cadastrar a unidade");
        }
      })
      .finally(() => {
        setLoading(false); // Termina o loading
      });
  };

  // Efeito para limpar os erros após 10 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]); // Limpa os erros após 10 segundos
      }, 10000); // 10 segundos

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado ou se errors mudar
    }
  }, [errors]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
          setTimeout(() => {
            setStep(0);
          }, 200)
      }, 2000)
    }
  }, [success])

  // Renderização condicional
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <h1 className={styles.successMessage}>Cadastro realizado com sucesso!</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Cadastro de unidades</h1>

        {errors.length > 0 && (
          <div className={styles.errorContainer}>
            <ul>
              {errors.map((error, index) => (
                <li key={index} className={styles.errorMessage}>
                  {error.msg}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Seta para voltar */}
        {step > 0 && (
          <button onClick={handleBack} className={styles.backButton}>
            ← Voltar
          </button>
        )}

        <form
          className={styles.form}
          onSubmit={step === 2 ? handleSubmit : handleNext}
        >
          <div className={styles.progressContainer}>
            <progress className={styles.progress} value={step} max={2} />
          </div>
          <div className={`${styles.step} ${step === 0 ? styles.active : ""}`}>
            <h2>Etapa 1: Defina seu Código Escolar</h2>
            <div className={`${styles.formGroup} ${styles.mediumInput}`}>
              <label className={styles.label}>Código Escolar:</label>
              <input
                className={styles.input}
                type="number"
                onChange={(e) =>
                  setValues({ ...values, Cod_Escolar: e.target.value })
                }
              />
            </div>
            <button className={styles.button} type="submit">
              Próximo
            </button>
          </div>

          <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>
            <h2>Etapa 2: Dados da Instituição</h2>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Nome da Unidade:</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) =>
                  setValues({ ...values, NameInstitute: e.target.value })
                }
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>E-mail:</label>
              <input
                className={styles.input}
                type="email"
                onChange={(e) =>
                  setValues({ ...values, emailInstitute: e.target.value })
                }
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Cidade:</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setValues({ ...values, city: e.target.value })}
              />
            </div>
            <button className={styles.button} type="submit">
              Próximo
            </button>
          </div>

          <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
            <h2>Etapa 3: Dados Adicionais</h2>
            <div className={`${styles.formGroup} ${styles.mediumInput}`}>
              <label className={styles.label}>Número de alunos:</label>
              <input
                className={styles.input}
                type="number"
                onChange={(e) =>
                  setValues({ ...values, qtdStudents: e.target.value })
                }
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Senha:</label>
              <input
                className={styles.input}
                type="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Units;
