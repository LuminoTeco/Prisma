import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImgTeco from '../../../../assets/imgs/IMG_LOGIN.png';
import styles from './Login.module.css'; // Importando como CSS Modules
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    emailInstitute: '',
    password: ''
  });

  const [error, setError] = useState(''); // Para exibir erros de login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/usersList', values); 
      if (response.data.message === "Login bem-sucedido") {
        alert("Entrou");
        navigate("/initial");
      } else {
        setError(response.data.message || "Deu erro");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro no servidor");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  /* O login ainda n está funcionando. */

  return (
    <div className={styles.loginContainer}>
      <div className={styles.containerImgTecoLogin}>
        <img src={ImgTeco} alt="imagem do teco login" />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="emailInstitute">E-mail</label>
            <input
              type="email"
              id="emailInstitute"
              name="emailInstitute"
              placeholder="example@xxx.com"
              value={values.emailInstitute}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
