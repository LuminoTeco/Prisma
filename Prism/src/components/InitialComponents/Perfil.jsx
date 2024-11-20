import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Modal from "./FeedComponents/ModalInvite";
import styles from "./Perfil.module.css";
import addUser from "@assets/imgs/adicionar-usuario.png"
import stars from "@assets/imgs/stars-colaborador.png"

import conquista_1 from "@assets/imgs/conquista_1.png";
import conquista_2 from "@assets/imgs/conquista_2.png";
import conquista_3 from "@assets/imgs/conquista_3.png";

// Mapeamento de conquistas para imagens
const conquistaData = {
  "Ao amanhecer": {
    img: conquista_1,
    description:
      "Conquista obtida ao completar uma tarefa antes das 8h da manhã.",
  },
  "Primeira tarefa": {
    img: conquista_2,
    description: "Conquista dada ao completar a primeira tarefa no site.",
  },
  "Noite produtiva": {
    img: conquista_3,
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
  const [messages, setMessages] = useState([]); // Agora messages é um array

  const userValues = JSON.parse(localStorage.getItem("user_info"));
  const { aluno_id } = userValues || {};

  useEffect(() => {
    if (aluno_id) {
      // Carregar informações do usuário
      axios
        .get(`http://localhost:8081/prisma/allinformation/${aluno_id}`)
        .then((response) => {
          const { nome_aluno, nivel, foto_perfil, meta_xp, xp } =
            response.data.result[0];

          const updatedValues = {
            nome: nome_aluno,
            nivel,
            foto_perfil,
            meta_xp,
            xp,
          };

          setValues(updatedValues);

          // Extrair conquistas da resposta
          const uniqueAchievements = [
            ...new Set(response.data.result.map((item) => item.nome_conquista)),
          ];
          setAchievements(uniqueAchievements);

          localStorage.setItem(
            "user_info",
            JSON.stringify({
              ...userValues,
              foto_perfil,
            })
          );
        })
        .catch((error) => {
          console.error("Erro ao buscar informações do usuário:", error);
        });

      // Carregar mensagens do fórum
      axios
        .get("http://localhost:8081/prisma/getContentForum", {
          params: { aluno_id: aluno_id },
        })
        .then((response) => {
          const forumMessages = response.data.id || []; // Acessando o array de mensagens
          setMessages(forumMessages); // Atualizando o estado com o array de mensagens
        })
        .catch((error) => {
          console.error("Erro ao buscar mensagens do fórum:", error);
          setMessages([]); // Garantir que seja um array vazio em caso de erro
        });
    }
  }, [aluno_id]);

  const baseURL = "http://localhost:8081";

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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload(); // Recarregar a página após o upload da imagem
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  const porcentagem =
    values.meta_xp > 0
      ? Math.min(100, ((values.xp / values.meta_xp) * 100).toFixed(1))
      : 0;

      const openModal = () => {
        console.log("Abrindo modal");
        setIsModalOpen(true);
      };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditPhotoModal = () => {
    setIsEditPhotoModalOpen(true);
  };

  const closeEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false);
  };

  // Renderizar mensagens
  const renderedMessages = messages.map((message, index) => {
    return (
      <div key={index} className={styles.messageItem}>
        <div className={styles.messageHeader}>
          <img
            src={`${baseURL}${message.foto_perfil}`}
            alt={`Foto de perfil de ${message.nome}`}
            className={styles.messageUserImage}
          />
          <span className={styles.messageUserName}>• {message.nome}</span>
        </div>
        <p className={styles.messageContent}>{message.conteudo}</p>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.ContainerImageUser}>
        <div className={styles.ContainerUtils}>
          <img src={addUser} onClick={openModal}/>
          <Link to="/colaborador">
          <img src={stars} alt="" />
          </Link>
        </div>
        <img
          src={`${baseURL}${values.foto_perfil}`}
          alt={`${values.nome} perfil`}
          className={styles.imgPhotoPerfil}
          onClick={openEditPhotoModal}
        />
        <h1>{values.nome}</h1>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarSlide}>
            <div
              className={styles.Bar}
              style={{
                width: `${porcentagem}%`,
              }}
            ></div>
          </div>
          <span className={styles.metaXp}>{porcentagem}%</span>
        </div>
      </div>

      <div className={styles.containerInfoUsers}>
        <div className={styles.ContainerAchivements}>
          <h2>Conquistas</h2>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => {
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
            })}
          </div>
        </div>

        <div className={styles.containerMessages}>
          <div className={styles.Posts}>
          <h1>Postagens</h1>
            {renderedMessages}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Procurar Amigos</h2>
        <p>Aqui você pode buscar amigos!</p>
      </Modal>

      {isEditPhotoModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Editar Foto de Perfil</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Atualizar Foto</button>
            <button onClick={closeEditPhotoModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
