import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import styles from "./Initial.module.css";
import Subjects from "./Subjects/Subjects";
import "react-toastify/dist/ReactToastify.css";
import Feed from "@components/InitialComponents/Feed";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "../../../../components/InitialComponents/SideBar";

const Initial = () => {
  const { isAuthenticated, userInfo } = useAuth();
  const navigate = useNavigate();

  const localStorageKey = "user_info"; 
  const [materiaId, setMateriaId] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem(localStorageKey);
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
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

      {materiaId === 3 ? (
        <Subjects />
      ) : (
        <>
          <SideBar />
          <main className={styles.containerMainContent}>
            {isAuthenticated && userInfo ? (
              <div>
                <Feed />
              </div>
            ) : (
              <p>Usuário não autenticado. Redirecionando para o login <span className={styles.dots}></span></p> 
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Initial;
