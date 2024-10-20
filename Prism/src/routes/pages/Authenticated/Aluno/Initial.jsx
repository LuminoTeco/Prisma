import React, { useEffect, useState } from "react";
import styles from "./Initial.module.css";
import Cookies from "js-cookie";
import axios from "axios"
import SideBar from "@components/InitialComponents/SideBar";
import useAuth from "@hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subjects from "./Subjects/Subjects";

const Initial = () => {
  const { isAuthenticated, userInfo } = useAuth();

  const cookieName = "escolhaMateria";

  const [isCookieSet, setIsCookieSet] = useState(false);

  useEffect(() => {
    const value = Cookies.get(cookieName);
    if (value) {
      setIsCookieSet(true); 
    } else {
      toast.info("Por favor, selecione uma matéria.", {
        autoClose: 5000,
        pauseOnHover: false,
      });
    }
  }, []);


  return (
    <div className={styles.containerInitialBody}>
      <ToastContainer/>
      {!isCookieSet && <Subjects />}

      {isCookieSet && (
        <>
          <SideBar />
          <main className={styles.containerMainContent}>
            {isAuthenticated && userInfo ? (
              <div>
               <h1>Página inicial</h1>
              </div>
            ) : (
              <p>Usuário não autenticado.</p>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Initial;
