import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import styles from "./Initial.module.css";
import SideBar from '../../../../components/InitialComponents/SideBar';

const Initial = () => {
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

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


  return (
    <div className={styles.containerInitialBody}>
      <SideBar onComponentChange={handleComponentChange} />
    </div>
  );
};

export default Initial;
