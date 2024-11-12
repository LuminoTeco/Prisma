import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import styles from "./Initial.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "../../../../components/InitialComponents/SideBar";
import Subject from "./Subjects/Subjects"; 

const Initial = () => {
  const { isAuthenticated, userInfo } = useAuth();
  const navigate = useNavigate();
  const [materiaId, setMateriaId] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setMateriaId(parsedInfo.materia_id); 
    } else {
      toast.info("Por favor, selecione uma matéria.", {
        autoClose: 5000,
        pauseOnHover: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      const timer = setTimeout(() => {
        navigate("/login_estudante");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, userInfo, navigate]);

  return (
    <div className={styles.containerInitialBody}>
      <ToastContainer />
      <SideBar />

      <main className={styles.containerMainContent}>
        {isAuthenticated && userInfo ? (
          materiaId === 3 ? (
            <Subject /> 
          ) : (
            <Outlet /> 
          )
        ) : (
          <p>
            Usuário não autenticado. Redirecionando para o login{" "}
            <span className={styles.dots}></span>
          </p>
        )}
      </main>
    </div>
  );
};

export default Initial;
