import React, { useState } from "react";
import ImgTeco from '@assets/imgs/FORMAL_LOGIN.png';
import InputTop from "@assets/imgs/input_top.png"
import styles from './Login.module.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [values, setValues] = useState({ emailInstitute: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia a requisição de login para o servidor
      const response = await axios.post('http://localhost:8081/prisma/login', {
        emailInstitute: values.emailInstitute,
        password: values.password,
      }, { withCredentials: true });

      if (response.data && response.data.user) {
        const userName = response.data.user.name;
        const institutionId = response.data.user.id; 

        toast.success(`Bem-vindo, ${userName}`, {
          position: "top-right",
          autoClose: 1000,
          pauseOnHover: false, 
          onClose: () => {
            localStorage.setItem('instituicao_id_fk', institutionId);
            navigate('/dashboard'); 
          }
        });

        console.log(response.data);
      } else {
        toast.error("E-mail ou senha incorretos.", {
          position: "top-right",
          autoClose: 2000,
          pauseOnHover: false, 
        });
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("E-mail ou senha incorretos");

      toast.error("E-mail ou senha incorretos.", {
        position: "bottom-center",
        autoClose: 2000
      });
    }
  };

  const handleBack = () => {
    navigate("/choice")
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.containerImgTecoLogin}>
        <div className={styles.buttonBack}>
            <button onClick={handleBack} className={styles.buttonBackItem}>Voltar</button>
        </div>
        <img src={ImgTeco} alt="imagem do login" />
      </div>
      <div className={styles.formContainer}>
        <img src={InputTop} alt="Logo da prisma" className={styles.imgInputTop}/>
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
          <div className={styles.HrContainer}>
             <div className={styles.Divisor}>
             <hr />
              <p>ou</p>
              <hr />
             </div>
              <a href="#">Não consegue iniciar a sessão?</a>
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default Login;
