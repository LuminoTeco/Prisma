import React, { useState, useEffect } from "react";
import axios from "axios";
import Dash from "../../../../components/DashComponents/Dash";
import TableClass from "../../../../components/DashComponents/TableClass";
import Utils from "../../../../components/DashComponents/Utils";
import styles from "../../CSS/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [page, setPage] = useState("dash");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8081/prisma/protected-route", { withCredentials: true });
        if (res.data.valid) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.buttons}>
          <button onClick={() => changePage("dash")}>Quadros</button>
          <button onClick={() => changePage("util")}>Utilidades</button>
          <button onClick={() => changePage("usuario")}>Usuários</button>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
      <div className={styles.content}>{renderAtual()}</div>
    </div>
  );
};

export default Dashboard;
