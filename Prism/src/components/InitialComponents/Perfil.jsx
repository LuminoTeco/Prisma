import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./FeedComponents/ModalInvite";
import styles from "./Perfil.module.css";
import addUser from "@assets/imgs/adicionar-usuario.png";
import stars from "@assets/imgs/stars-colaborador.png";

import conquista_1 from "@assets/imgs/conquista_1.png";
import conquista_2 from "@assets/imgs/conquista_2.png";
import conquista_3 from "@assets/imgs/conquista_3.png";

// Mapeamento de conquistas para imagens
const conquistaData = {
  "Ao amanhecer": {
    img: conquista_3,
    description:
      "Conquista obtida ao completar uma tarefa antes das 8h da manhã.",
  },
  "Primeira tarefa": {
    img: conquista_1,
    description: "Conquista dada ao completar a primeira tarefa no site.",
  },
  "Noite produtiva": {
    img: conquista_2,
    description: "Conquista obtida ao completar uma tarefa após as 22h.",
  },
};

const Perfil = () => {
  const [values, setValues] = useState({
    nome: "",
    nivel: "",
    foto_perfil: "",
    meta_xp: 0,
    xp: 0,
  });
  const [achievements, setAchievements] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isColaborador, setIsColaborador] = useState(false);
  const [XpColaborador, setXpColaborador] = useState(0);

  const userValues = JSON.parse(localStorage.getItem("user_info"));
  const { aluno_id } = userValues || {};

  useEffect(() => {
    if (!aluno_id) return;
  
    const fetchData = async () => {
      try {
        // Verificar status de colaborador
        const colaboradorRes = await axios.get(
          "http://localhost:8081/prisma/verifyColaborator",
          { params: { aluno_id_fk: aluno_id } }
        );
  
        setIsColaborador(colaboradorRes.data.id.length > 0);
  
        if (colaboradorRes.data.id.length > 0) {
          const xpColabRes = await axios.get(
            "http://localhost:8081/prisma/getXpColaborador",
            { params: { aluno_id_fk: aluno_id } }
          );
          setXpColaborador(xpColabRes.data.id[0]?.xp_colaborador || 0);
        }
  
        // Buscar informações do usuário
        const userRes = await axios.get(
          `http://localhost:8081/prisma/allinformation/${aluno_id}`
        );
  
        const { nome_aluno, nivel, foto_perfil, meta_xp, xp } =
          userRes.data.result[0] || {};
        setValues({ nome: nome_aluno, nivel, foto_perfil, meta_xp, xp });
  
        // Atualizar conquistas
        const uniqueAchievements = userRes.data.result
          ? [...new Set(userRes.data.result.map((item) => item.nome_conquista))]
          : [];
        setAchievements(uniqueAchievements);
  
        localStorage.setItem(
          "user_info",
          JSON.stringify({ ...userValues, foto_perfil })
        );
  
        // Carregar mensagens do fórum
        const forumRes = await axios.get(
          "http://localhost:8081/prisma/getContentForum",
          { params: { aluno_id } }
        );
        setMessages(forumRes.data.id || []);
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      }
    };
  
    fetchData();
  }, [aluno_id]);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }

    const formData = new FormData();
    formData.append("foto_perfil", selectedFile);

    try {
      await axios.patch(
        `http://localhost:8081/prisma/uploadImage/${aluno_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  const porcentagem =
    values.meta_xp > 0
      ? Math.min(100, ((values.xp / values.meta_xp) * 100).toFixed(1))
      : 0;

  const porcentagemColaborador =
    XpColaborador > 0
      ? Math.min(100, ((XpColaborador / 10000) * 100).toFixed(1)) 
      : 0;

  const renderMessages = () =>
    messages.map((message, index) => (
      <div key={index} className={styles.messageItem}>
        <div className={styles.messageHeader}>
          <img
            src={`http://localhost:8081${message.foto_perfil}`}
            alt={`Foto de perfil de ${message.nome}`}
            className={styles.messageUserImage}
          />
          <span className={styles.messageUserName}>
            • {message.nome} {message.nivel}
          </span>
        </div>
        <p className={styles.messageContent}>{message.conteudo}</p>
      </div>
    ));

    const renderAchievements = () => {
      if (achievements.length === 0) {
        return (
          <div className={styles.noAchievements}>
            <p>Você ainda não possui conquistas.</p>
          </div>
        );
      }
    
      return achievements.map((achievement, index) => {
        const data = conquistaData[achievement] || {};
        return (
          <div key={index} className={styles.achievementItem}>
            <img
              src={data.img || conquista_1}
              alt={`Conquista: ${achievement}`}
              className={styles.achievementImage}
            />
            <div>
              <span>{achievement}</span>
              <p>{data.description || "Descrição não disponível."}</p>
            </div>
          </div>
        );
      });
    };
    
    return (
      <div className={styles.container}>
        <div className={styles.ContainerImageUser}>
          <div className={styles.ContainerUtils}>
            <img src={addUser} onClick={() => setIsModalOpen(true)} alt="Adicionar Usuário" />
            <Link to="/colaborador">
              <img src={stars} alt="Colaborador" />
            </Link>
          </div>
          <img
            src={`http://localhost:8081${values.foto_perfil}`}
            alt={`${values.nome} perfil`}
            className={styles.imgPhotoPerfil}
            onClick={() => setIsEditPhotoModalOpen(true)}
          />
          <div className={styles.titleNameandNivel}>
            <h1>{values.nome}</h1>
            <sub>Nv. {values.nivel}</sub>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarSlide}>
              <div
                className={styles.Bar}
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
            <span className={styles.metaXp}>{porcentagem}%</span>
          </div>
        </div>
    
        {isColaborador && (
          <div className={styles.ContainerProgressBarColaborador}>
            <h1>Colaborador</h1>
            <div className={styles.progressBarContainerColaborador}>
              <div
                className={styles.progressBarSlideColaborador}
              >
                <div
                  className={styles.BarColaborador}
                  style={{ width: `${porcentagemColaborador}%` }}
                ></div>
              </div>
              <span className={styles.metaXpColaborador}>{porcentagemColaborador}%</span>
            </div>
          </div>
        )}
    
        <div className={styles.containerInfoUsers}>
          <div className={styles.ContainerAchivements}>
            <h2>Conquistas</h2>
            <div className={styles.achievementsGrid}>
              {renderAchievements()}
            </div>
          </div>
    
          <div className={styles.containerMessages}>
            <div className={styles.Posts}>
              <h1>Postagens</h1>
              {renderMessages()}
            </div>
          </div>
        </div>
    
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Procurar Amigos</h2>
          <p>Aqui você pode buscar amigos!</p>
        </Modal>
    
        {isEditPhotoModalOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
              <h2>Editar Foto de Perfil</h2>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Carregar Imagem</button>
              <button onClick={() => setIsEditPhotoModalOpen(false)}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }    

export default Perfil;
