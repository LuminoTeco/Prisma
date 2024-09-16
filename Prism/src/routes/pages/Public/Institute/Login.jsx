import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          {error && <div className="error">{error}</div>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
