import React, { useState } from 'react';
import styles from './LoginEstudante.module.css'; 
import { ToastContainer, toast } from 'react-toastify';
import ImgTeco from "@assets/imgs/IMG_LOGIN.png"
import InputTop from "@assets/imgs/input_top.png"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginEstudante = () => {
    const [values, setValues] = useState({ email: "", senha: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:8081/prisma/loginAlunos", {
                email: values.email,
                senha: values.senha
            }, { withCredentials: true });
    
            if (response.data && response.data.student) {
                const userInfo = {
                    nome: response.data.student.nome,
                    aluno_id: response.data.student.aluno_id,
                    email: values.email,
                    foto_perfil: response.data.student.foto_perfil,
                    materia_id: response.data.student.disciplina_id_fk
                };

                localStorage.setItem('user_info', JSON.stringify(userInfo));
    
                toast.success(`Bem-vindo(a), ${userInfo.nome}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    pauseOnHover: false,
                    onClose: () => {
                        navigate("/inicio/feed");
                    }
                });
            } else {
                toast.error("E-mail ou senha incorretos.", {
                    position: "bottom-center",
                    autoClose: 2000,
                    pauseOnHover: false,
                });
            }
        } catch (err) {
            console.error("Erro no login:", err);
            toast.error("E-mail ou senha incorretos.", {
                position: "bottom-center",
                autoClose: 2000
            });
        }
    };

    const handleBack = () => {
        navigate("/choice");
    };

    return (
        <div className={styles.pageWrapper}>
            <ToastContainer />
            <div className={styles.imgWrapper}>
                <button onClick={handleBack} className={styles.backButton}>Voltar</button>
                <img src={ImgTeco} alt="Imagem de login" className={styles.loginImage} />
            </div>
            <div className={styles.formWrapper}>
                <img src={InputTop} alt="Logo" className={styles.formHeaderImg} />
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder='example@xxx.com'
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            id="senha"
                            value={values.senha}
                            onChange={handleChange}
                            placeholder='*********'
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.dividerSection}>
                        <div className={styles.dividerLine}>
                            <hr />
                            <p>ou</p>
                            <hr />
                        </div>
                        <a href="#" className={styles.forgotLink}>Não consegue iniciar a sessão?</a>
                    </div>
                    <button type="submit" className={styles.submitButton}>Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginEstudante;
