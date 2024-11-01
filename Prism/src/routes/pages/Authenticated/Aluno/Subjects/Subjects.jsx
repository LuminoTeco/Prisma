import React, { useState, useEffect } from "react";
import styles from "./Subjects.module.css";
import axios from "axios";
import Bio from "@assets/imgs/Bio.png";
import Math from "@assets/imgs/Math.png";
import Port from "@assets/imgs/Port.png";
import Geo from "@assets/imgs/Geo.png";

const Subjects = () => {
  const [dataUser, setDataUser] = useState({
    aluno_id: null,
    materia_id: null,
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("user_info");
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setDataUser(parsedInfo); 
    }
  }, []);

  const HandleClick = async (materiaId) => {
    try {
      const updatedData = {
        ...dataUser,
        materia_id: materiaId, 
      };

      setDataUser(updatedData);
      localStorage.setItem("user_info", JSON.stringify(updatedData));

      const response = await axios.patch(`http://localhost:8081/prisma/SubjectUpdate`, {
        aluno_id: Number(updatedData.aluno_id),
        disciplina_id_fk: Number(materiaId),
      });

      window.location.reload()
      console.log(response.data)
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className={styles.SubjectsContainer}>
      <h1>Escolha uma matéria</h1>
      <div className={styles.WrapperSubjects}>
        <img src={Math} alt="Matemática" onClick={() => HandleClick(1)} />
        <img src={Port} alt="Português" onClick={() => HandleClick(2)} />
        <img src={Bio} alt="Biologia" />
        <img src={Geo} alt="Geografia" />
      </div>
    </div>
  );
};

export default Subjects;
