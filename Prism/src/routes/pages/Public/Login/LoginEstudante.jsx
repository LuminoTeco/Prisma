import React, { useState } from 'react';
import styles from './LoginEstudante.module.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginEstudante = () => {
    const [values, setValues] = useState({ email: "", senha: "" });
    const navigate = useNavigate(); // Use useNavigate ao invés de Navigate

    // Atualiza o estado dos campos de entrada
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
    
            console.log(response.data);
    
            if (response.data && response.data.student) { 
                const userInfo = {
                    nome: response.data.student.nome, 
                    aluno_id: response.data.student.aluno_id,
                    email: values.email,
                    foto_perfil: response.data.student.foto_perfil
                };

                localStorage.setItem('user_info', JSON.stringify(userInfo));
    
                toast.success(`Bem-vindo, ${userInfo.nome}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    pauseOnHover: false,
                    onClose: () => {
                        navigate("/inicio");
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
        navigate("/choice")
      }
    
    return (
        <div className={styles.loginContainer}>
            <ToastContainer /> 
            <button onClick={handleBack}>Voltar</button>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    required 
                    className={styles.input} 
                />

                <label htmlFor="senha">Senha:</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    value={values.senha} 
                    onChange={handleChange} 
                    required 
                    className={styles.input} 
                />

                <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
        </div>
    );
};

export default LoginEstudante;
