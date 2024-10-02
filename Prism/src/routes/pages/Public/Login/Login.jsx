import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImgTeco from '../../../../assets/imgs/IMG_LOGIN.png';
import styles from './Login.module.css'; 
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    emailInstitute: '',  // Mudança: emailInstitute em vez de email
    password: ''  // Mudança: password em vez de senha
  });

  const [error, setError] = useState(''); // Para exibir erros de login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valores enviados:', values);

    try {
      const response = await axios.post('http://localhost:8081/prisma/usersList', values);

      console.log('Resposta da API:', response.data);

      if (response.data.message === "Login bem-sucedido") {
        // Salvar o token no localStorage
        localStorage.setItem('token', response.data.token); // Salva o token recebido
        
        alert("Entrou");
        navigate("/dashboard");
      } else {
        // Se não, mostra o erro
        setError(response.data.message || "Deu erro");
      }
    } catch (err) {
      // Se houver um erro no servidor, mostra o erro
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
          <button type="submit" className={styles.button}>Entrar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro se existir */}
        </form>
      </div>
    </div>
  );
};

export default Login;
