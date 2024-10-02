/* 
Esse dashboard, deve ser feito depois OK? 
Vamos primeiro fazer o login e cadastro para ter um banco de dados bom!

:Caique
*/


import React, { useState } from "react"
import Dash from "../../../../components/DashComponents/Dash"
import TableClass from "../../../../components/DashComponents/TableClass"
import Utils from "../../../../components/DashComponents/Utils"
import styles from "../../CSS/Dashboard.module.css"
import { Navigate } from "react-router-dom"

const Dashboard = () => {

const [page, setPage] = useState('dash')
const changePage = (newPage) => {
    setPage(newPage)
}

const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post("http://localhost:8081/logout", { token });
      } catch (error) {
        console.error("Erro ao deslogar:", error);
      }
    }
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

const renderAtual = () => {
    switch (page) {
        case "dashboard":
            return <Dash/>
        case "usuario":
            return<TableClass/>
        case "util":
            return<Utils/>
            
        default: return <Dash/>

    }
}
    return (
        <div className={styles.container}>
        <div className={styles.sidebar}>
           <div className={styles.buttons}>
               <button onClick={() => changePage('dash')}>Quadros</button>
               <button onClick={() => changePage('util')}>Utilidades</button>
               <button onClick={() => changePage('usuario')}>Usuários</button>
               <button onClick={handleLogout}>Sair</button>
           </div>
        </div>
        <div className={styles.content}>
            {renderAtual()}
        </div>
    </div>
    )
} 

export default Dashboard
