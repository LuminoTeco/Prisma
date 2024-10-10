import React from "react";
import styles from "./SideBar.module.css";
import rainbowInitial from "../../assets/imgs/rainbowInitial.png";
import chat from "../../assets/imgs/chat.png";
import materia from "../../assets/imgs/materia.png";
import usuario from "../../assets/imgs/usuario.png";

const SideBar = ({ onComponentChange }) => {
  return (
    <div className={styles.containerSideBar}>
      <div className={styles.containerButtonLi}>
        <div className={styles.iconContainer} onClick={() => onComponentChange('feed')}>
          <img src={usuario} alt="Usuário" />
          <span className={styles.iconLabel}>Usuário</span>
        </div>
        <div className={styles.iconContainer} onClick={() => onComponentChange('outraComponente')}>
          <img src={chat} alt="Chat" />
          <span className={styles.iconLabel}>Chat</span>
        </div>
        <div className={styles.iconContainer} onClick={() => onComponentChange('task')}>
          <img src={materia} alt="Matéria" />
          <span className={styles.iconLabel}>Matéria</span>
        </div>
      </div>
      <div className={styles.img}>
        <img src={rainbowInitial} alt="Arco-íris" />
      </div>
    </div>
  );
};

export default SideBar;
