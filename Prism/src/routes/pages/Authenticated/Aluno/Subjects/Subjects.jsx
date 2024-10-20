import React from "react";
import styles from "./Subjects.module.css";
import cookie from "js-cookie";
import Bio from "@assets/imgs/Bio.png";
import Math from "@assets/imgs/Math.png";
import Port from "@assets/imgs/Port.png";
import Geo from "@assets/imgs/Geo.png";

const Subjects = () => {
  const HandleClick = (subject) => {
    cookie.set("escolhaMateria", subject, { expires: 10 })

    window.location.reload()
  }

  return (
    <div className={styles.SubjectsContainer}>
      <h1>Escolha uma matéria</h1>
      <div className={styles.WrapperSubjects}>
        <img src={Math} alt="" onClick={() => HandleClick("matematica")}/>
        <img src={Port} alt="" onClick={() => HandleClick("portugues")}/>
        <img src={Bio} alt="" />
        <img src={Geo} alt="" />
      </div>
    </div>
  );
};

export default Subjects;
