import React, { useEffect, useState } from "react";
import styles from "./Initial.module.css";
import Cookies from "js-cookie";
import Option from "../../../../components/InitialComponents/Option/Option";
import SideBar from "../../../../components/InitialComponents/SideBar";
import useAuth from "../../../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Initial = () => {
  const { isAuthenticated, userInfo } = useAuth();

  // Defina o nome do cookie que deseja verificar
  const cookieName = "escolhaMateria";

  // Verifica se o cookie existe
  const [isCookieSet, setIsCookieSet] = useState(false);
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    const value = Cookies.get(cookieName);
    if (value) {
      setIsCookieSet(true); 
      setCookieValue(value);
    } else {
      toast.info("Por favor, selecione uma matéria.", {
        autoClose: 2500,
        pauseOnHover: false,
      });
    }
  }, []);

  return (
    <div className={styles.containerInitialBody}>
      <ToastContainer/>
      {!isCookieSet && <Option />}

      {isCookieSet && (
        <>
          <SideBar />
          <main className={styles.containerMainContent}>
            {isAuthenticated && userInfo ? (
              <div>
                <h1>Bem-vindo, {userInfo.nome}!</h1>
                <img
                  src={`http://localhost:8081/images/${userInfo.foto_perfil}`}
                  alt="Foto de Perfil"
                />
                <p>{userInfo.foto_perfil}</p>
                <p>Email: {userInfo.email}</p>
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
