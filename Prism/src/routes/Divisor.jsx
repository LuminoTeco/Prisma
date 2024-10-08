import React from 'react';
import styles from "../routes/pages/CSS/Divisor.module.css";
import alunos from "../routes/pages/Public/imagens/aluna.png";
import diplomado from "../routes/pages/Public/imagens/diplomado.png";
import rainbow from "../routes/pages/Public/imagens/rainbow.png";
import { useNavigate } from 'react-router-dom'; 

const Divisor = () => {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate("/");
  };

  const handleToLoginSchool = () => {
    navigate("/login")
  }

  const handleToLoginStudent = () => [
    navigate("/login_estudante")
  ]

  return (
    <div className={styles.container}>
      <img src={rainbow} alt="Rainbow" className={styles.backgroundImage} />
      <button className={styles.backButton} onClick={handleBack}>Voltar</button>
      <div className={styles.divisorContainer}>
        <div className={styles.box} onClick={handleToLoginStudent}>
          <img src={alunos} alt="Aluno" className={styles.image} />
          <p>Aluno</p>
        </div>
        <div className={styles.box} onClick={handleToLoginSchool}>
          <img src={diplomado} alt="Escola" className={styles.image} />
          <p>Escola</p>
        </div>
      </div>
    </div>
  );
};

export default Divisor;
