import React, { useState, useEffect } from "react";
import axios from "axios";
import TableClass from "../../../../components/DashComponents/TableClass";
import styles from "../../CSS/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth"; 

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/prisma/logout", {}, { withCredentials: true });

      localStorage.removeItem("userEmail");

      toast.success("Logout realizado com sucesso!", {
        position: "bottom-center",
        autoClose: 2000,
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      toast.error("Erro ao realizar logout!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>; 
  }

  return (
    <div className={styles.container}>
      <button className={styles.LogoutButton} onClick={() => handleLogout()}>
        Sair  
      </button>
      <TableClass />
    </div>
  );
};

export default Dashboard;
