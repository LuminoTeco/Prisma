import React from 'react';
import styles from './LoginEstudante.module.css';
import tecologin from "../imagens/teco_login.png";

const LoginEstudante = () => {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required className={styles.input} />

        <label htmlFor="password">Senha:</label>
        <input type="password" name="password" id="password" required className={styles.input} />

        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
      <img src={tecologin} alt="Tela de Login" className={styles.loginImage} />
    </div>
  );
};

export default LoginEstudante;
