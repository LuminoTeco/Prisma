import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import styles from "./Initial.module.css";
import SideBar from '../../../../components/InitialComponents/SideBar';
import Feed from '../../../../components/InitialComponents/Feed';
import Tasks from '../../../../components/InitialComponents/Tasks'; // Importar outros componentes que você deseja renderizar

const Initial = () => {
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [userInfo, setUserInfo] = useState(null); 
  const [currentComponent, setCurrentComponent] = useState('feed'); // Estado para controlar o componente atual

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8081/prisma/protected-route", { withCredentials: true });
        if (res.data.valid) {
          setIsAuthenticated(true); 
          const storedUserInfo = JSON.parse(localStorage.getItem('user_info'));
          setUserInfo(storedUserInfo); 
        } else {
          navigate("/login_estudante"); 
        }
      } catch (err) {
        console.error("Erro na autenticação:", err);
        navigate("/login_estudante"); 
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <p>Carregando...</p>; 
  }

  // Função para atualizar o componente atual
  const handleComponentChange = (componentName) => {
    setCurrentComponent(componentName);
  };

  // Renderiza o componente correspondente baseado no estado
  const renderComponent = () => {
    switch (currentComponent) {
      case 'feed':
        return <Feed />;
      case 'task':
        return <Tasks />; 
      default:
        return <Feed />;
    }
  };

  return (
    <div className={styles.containerInitialBody}>
      <SideBar onComponentChange={handleComponentChange} />
      <main className={styles.containerMainContent}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default Initial;
