import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./FeedComponents/ModalInvite";
import styles from "./Perfil.module.css";

const Perfil = () => {
  const [values, setValues] = useState({
    nome: "",
    nivel: "",
    foto_perfil: "",
    nome_conquista: "",
    meta_xp: 0,
    xp: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  const userValues = JSON.parse(localStorage.getItem("user_info"));
  const { aluno_id } = userValues || {};

  useEffect(() => {
    if (aluno_id) {
      axios
        .get(`http://localhost:8081/prisma/allinformation/${aluno_id}`)
        .then((response) => {
          const {
            nome,
            nivel,
            foto_perfil,
            nome_conquista,
            meta_xp,
            xp,
          } = response.data.result[0];

          const updatedValues = {
            nome,
            nivel,
            foto_perfil,
            nome_conquista,
            meta_xp,
            xp,
          };

          setValues(updatedValues);

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

      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  const porcentagem =
    values.meta_xp > 0
      ? Math.min(100, ((values.xp / values.meta_xp) * 100).toFixed(1))
      : 0;

  const openModal = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.ContainerImageUser}>
        <img
          src={`${baseURL}${values.foto_perfil}`}
          alt={`${values.nome} perfil`}
          className={styles.imgPhotoPerfil}
          onClick={openEditPhotoModal}
        />
        <h1>{userValues.nome}</h1>
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
      {/* <p>Clique para procurar amigos: </p>
      <button onClick={openModal}>Procurar</button> */}

      <div className={styles.containerInfoUsers}>
        <div className={styles.ContainerAchivements}>

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
