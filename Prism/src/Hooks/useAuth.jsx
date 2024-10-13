import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8081/prisma/protected-route',
          { withCredentials: true }
        );

        console.log(res.data)

        if (res.data.valid) {
          setIsAuthenticated(true);
          const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));
          console.log("Dados do usuário:", storedUserInfo);

          setUserInfo(storedUserInfo);
        } else {
          navigate("/login_estudante");
        }
      } catch (err) {
        console.error("Erro na autenticação", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated, isLoading, userInfo };
};

export default useAuth;
