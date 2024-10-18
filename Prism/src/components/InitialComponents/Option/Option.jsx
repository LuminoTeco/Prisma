import React from 'react';
import styles from './Option.module.css';
import MathImg from "@assets/imgs/Math.png";
import BioImg from "@assets/imgs/Bio.png";
import GeoImg from "@assets/imgs/Geo.png";
import PortImg from "@assets/imgs/Port.png";
import Cookies from "js-cookie";

const Option = () => {

  const handleClick = (subject) => {
    // Setar o cookie
    Cookies.set('escolhaMateria', subject, { expires: 364, path: '/' });
    
    // Recarregar a página após o clique
    window.location.reload();
  };

  return (
    <div className={styles.InitialChoicePrismContainer}>
      <div className={styles.ContainerText}>
        <h1>Escolha sua matéria!</h1>
      </div>
      <div className={styles.ContainerColumns}>
        <img
          src={MathImg}
          alt="Matemática"
          onClick={() => handleClick('matematica')}
        />
        <img
          src={PortImg}
          alt="Português"
          onClick={() => handleClick('portugues')}
        />
        <img src={BioImg} alt="Biologia" />
        <img src={GeoImg} alt="Geografia" />
      </div>
    </div>
  );
};

export default Option;
