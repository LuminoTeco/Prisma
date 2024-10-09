import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de importar axios

const Initial = () => {
  const navigate = useNavigate();
  
  // Estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [userInfo, setUserInfo] = useState(null); // Estado para armazenar as informações do usuário

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8081/prisma/protected-route", { withCredentials: true });
        if (res.data.valid) {
          setIsAuthenticated(true); // Marca como autenticado se a resposta for válida
          const storedUserInfo = JSON.parse(localStorage.getItem('user_info'));
          setUserInfo(storedUserInfo); // Armazena as informações do usuário
        } else {
          navigate("/login_estudante"); // Redireciona para login se não for válido
        }
      } catch (err) {
        console.error("Erro na autenticação:", err);
        navigate("/login_estudante"); // Redireciona para login em caso de erro
      } finally {
        setIsLoading(false); // Remove o estado de carregamento
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <p>Carregando...</p>; // Exibe um indicador de carregamento enquanto aguarda
  }

  return (
    <div>
      {isAuthenticated && userInfo ? (
        <>
          <h1>Bem-vindo, {userInfo.nome}!</h1>
          <p>ID do Aluno: {userInfo.aluno_id}</p>
          <p>Email: {userInfo.email}</p>
          {userInfo.foto && <img src={userInfo.foto} alt="Foto do usuário" />} {/* Exibe a foto do usuário se existir */}
        </>
      ) : (
        <div>
          <h1>Usuário não autenticado.</h1>
          <p>Faça o login para conseguir acessar! <Link to="/login_estudante">Clique aqui!</Link></p>
        </div>
      )}
    </div>
  );
};

export default Initial;
