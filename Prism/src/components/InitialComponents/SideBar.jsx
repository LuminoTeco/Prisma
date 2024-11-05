import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import Setinha from "@assets/imgs/divisa-direita.png";
import Expandir from "@assets/imgs/Expandir.png";
import stars from "@assets/imgs/stars.png";
import bubbleChat from "@assets/imgs/chat_bubble.png";
import settings from "@assets/imgs/settings.png";
import rainbowInitial from "@assets/imgs/rainbowInitial.png"
import SetinhaEsquerda from "@assets/imgs/seta-esquerda.png";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));
  const storedUserPhoto = storedUserInfo?.foto_perfil;

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const toggleExpand = () => setIsExpanded((prev) => !prev);
  const closeSidebar = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

 
  const getMateriaName = (id) => {
    switch (id) {
      case 1:
        return "Matemática";
      case 2:
        return "Português";
      default:
        return "";
    }
  };

  const getMateriaAbbreviation = (id) => {
    switch (id) {
      case 1:
        return "Mat";
      case 2:
        return "Port";
      default:
        return "";
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={toggleOpen} className={styles.openButton}>
          <img src={Setinha} alt="" />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`${styles.containerSideBar} ${isOpen ? styles.open : ""} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {isOpen && (
          <>
            <div className={styles.buttonsContainer}>
              <button onClick={closeSidebar} className={styles.closeButton}>
                <img src={SetinhaEsquerda} alt="" />
              </button>
              <button onClick={toggleExpand} className={styles.expandButton}>
                <img src={Expandir} alt="Expandir" />
              </button>
            </div>
            <div className={styles.content}>
              <Link to="/inicio/perfil" onClick={closeSidebar}>
                <img
                  src={`http://localhost:8081${storedUserPhoto}`}
                  alt="foto de perfil"
                />
              </Link>
              <ul className={styles.contentList}>
                <li>
                  <strong>{storedUserInfo.nome}</strong>
                </li>
                <li>
                  <div className={styles.iconContainer}>
                    <img src={stars} alt="Estrelas" />
                    {isExpanded && <p>Tarefas</p>}
                  </div>
                  <div className={styles.iconContainer}>
                    <img src={bubbleChat} alt="Chat" />
                    {isExpanded && <p>Chat</p>} 
                  </div>
                  <div className={styles.iconContainer}>
                    <NavLink to="/inicio/feed" onClick={closeSidebar}>
                    <div>
                      {!isExpanded ? ( 
                        <p>{getMateriaAbbreviation(storedUserInfo.materia_id)}</p>
                      ) : ( 
                        <p className={styles.fullName}>
                          {getMateriaName(storedUserInfo.materia_id)}
                        </p>
                      )}
                    </div>
                    </NavLink>
                  </div>
                  <div className={styles.iconContainer}>
                    <img src={settings} alt="Configurações" />
                    {isExpanded && <p>Configurações</p>} 
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
