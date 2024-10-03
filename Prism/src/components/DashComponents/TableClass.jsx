import React, { useEffect, useState } from "react";
import styles from "../CSS/Class.module.css";
const jwt = require("jsonwebtoken")

const Class = () => {


  return (
    <div className={styles.container}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {codEscolar && <h2>Código Escolar: {codEscolar}</h2>} {/* Exibe o Cod_Escolar aqui */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Turma</th>
            <th>Ano Letivo</th>
            <th>Código da Instituição</th>
          </tr>
        </thead>
        <tbody>
          {/* Adicione lógica para mapear e renderizar as turmas aqui */}
        </tbody>
      </table>
    </div>
  );
};

export default Class;
