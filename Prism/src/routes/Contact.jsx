import React from "react";
import styles from "./pages/CSS/Contact.module.css";
import Clock from "@assets/imgs/Clock.png";
import Instagram from "@assets/imgs/Instagram.png";
import Mail from "@assets/imgs/Mail.png";
import Phone from "@assets/imgs/Phone.png";
import Teco from "@assets/imgs/Teco.png";

const Contact = () => {
  return (
    <div className={styles.containerContact}>
      <div className={styles.containerLeft}>
        <div className={styles.containerTextH1}>
          <h1>Fale com a gente</h1>
        </div>
        <div className={styles.containerImg}>
          <img src={Teco} alt="Imagem do teco" />
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.sectionContainerInformations}>
          <div className={styles.containerText}>
            <h1>Contatos</h1>
          </div>
          <div className={styles.containerContactsLinks}>
            <ul>
              <li>
                <a href="#">
                  <img src={Mail} alt="" /> <span>bolt.teco@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Instagram} alt="" /> <span>@Lumino.dev</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Phone} alt="" /> <span>+55 11 91234-5678</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Clock} alt="" /> <span>Seg à Sex 09:00 - 18:00</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
