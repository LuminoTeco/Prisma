import React, { useState } from "react";
import ImgTeco from '../../../../assets/imgs/IMG_LOGIN.png';
import styles from './Login.module.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importando Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo

const Login = () => {
  const [values, setValues] = useState({ emailInstitute: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Manipula as alterações nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia a requisição de login para o servidor
      const response = await axios.post('http://localhost:8081/prisma/login', {
        emailInstitute: values.emailInstitute,
        password: values.password,
      }, { withCredentials: true });

      // Verifica se a resposta contém os dados do usuário
      if (response.data && response.data.user) {
        const userName = response.data.user.name;

        // Usando Toastify para mostrar o sucesso
        toast.success(`Bem-vindo, ${userName}`, {
          position: "bottom-center",
          autoClose: 1000,
          onClose: () => {
            navigate('/dashboard'); // Redireciona para o dashboard após o login
          }
        });

        console.log(response.data);
      } else {
        // Caso a resposta não contenha os dados esperados
        toast.error("Erro inesperado no login.", {
          position: "bottom-center",
          autoClose: 2000
        });
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("E-mail ou senha incorretos");

      // Usando Toastify para mostrar o erro
      toast.error("E-mail ou senha incorretos.", {
        position: "bottom-center",
        autoClose: 2000
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.containerImgTecoLogin}>
        <img src={ImgTeco} alt="imagem do login" />
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
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default Login;
