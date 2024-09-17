/* 
Esse dashboard, deve ser feito depois OK? 
Vamos primeiro fazer o login e cadastro para ter um banco de dados bom!

:Caique
*/


import React, { useState } from "react"
import Dash from "../../../components/Dash"
import User from "../../../components/User"
import Utils from "../../../components/Utils"

const Dashboard = () => {

const [page, setPage] = useState('dash')
const changePage = (newPage) => {
    setPage(newPage)
}

const renderAtual = () => {
    switch (page) {
        case "dashboard":
            return <Dash/>
        case "usuario":
            return<User/>
        case "util":
            return<Utils/>
            
        default: return <Dash/>

    }
}
    return (
        <div>
            <button onClick={() => changePage('dashboard')}>dashboad</button> 
            <button onClick={() => changePage('usuario')}>usuário</button>
            <button onClick={() => changePage('util')}>qualquer prr</button>

            <div>
                {renderAtual()}
            </div>

        </div>
    )
} 

export default Dashboard
