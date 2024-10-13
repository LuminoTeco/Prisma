import React, { useEffect, useState } from "react";
import styles from "./Initial.module.css";
import SideBar from "../../../../components/InitialComponents/SideBar";
import useAuth from "../../../../Hooks/useAuth";

const Initial = () => {

  const { isAuthenticated, userInfo } = useAuth()

  return (
    <div className={styles.containerInitialBody}>
      <SideBar />
      <main className={styles.containerMainContent}>
        {isAuthenticated && userInfo ? (
          <div>
            <h1>Bem-vindo, {userInfo.name}!</h1>

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
    </div>
  );
};

export default Initial;
