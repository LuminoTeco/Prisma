import React, { useEffect, useState } from "react";
import styles from "../CSS/Class.module.css";
import axios from "axios"

const Class = () => {
  const [formData, setFormData] = useState({
    nomeDaTurma: "",
    anoLetivo: "",
    codigoInstituicao: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    
    console.log(formData);
  };

  return (
    <div className={styles.container}>
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeDaTurma">Nome da Turma:</label>
          <input
            type="text"
            id="nomeDaTurma"
            name="nomeDaTurma"
            value={formData.nomeDaTurma}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="anoLetivo">Ano Letivo:</label>
          <input
            type="text"
            id="anoLetivo"
            name="anoLetivo"
            value={formData.anoLetivo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="codigoInstituicao">Código da Instituição:</label>
          <input
            type="text"
            id="codigoInstituicao"
            name="codigoInstituicao"
            value={formData.codigoInstituicao}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Class;
