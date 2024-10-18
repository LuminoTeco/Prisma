import React, { useState, useEffect } from "react";
import axios from "axios";
import Dash from "../../../../components/DashComponents/Dash";
import TableClass from "../../../../components/DashComponents/TableClass";
import Utils from "../../../../components/DashComponents/Utils";
import styles from "../../CSS/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth"; 

const Dashboard = () => {
  const [page, setPage] = useState("");
  const { isAuthenticated, isLoading } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const changePage = (newPage) => {
    setPage(newPage);
  };

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

  const renderAtual = () => {
    switch (page) {
      case "dash":
        return <Dash />;
      case "usuario":
        return <TableClass />;
      case "util":
        return <Utils />;
      default:
        return <Dash />;
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.buttons}>
          <button onClick={() => changePage("dash")}>Quadros</button>
          <button onClick={() => changePage("util")}>Utilidades</button>
          <button onClick={() => changePage("usuario")}>Usuários</button>
        </div>
        <button onClick={handleLogout} className={styles.buttonLogout}>Sair</button>
      </div>
      <div className={styles.content}>{renderAtual()}</div>
    </div>
  );
};

export default Dashboard;
