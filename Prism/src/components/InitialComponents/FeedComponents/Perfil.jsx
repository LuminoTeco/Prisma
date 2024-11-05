import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./ModalInvite.jsx"; 
import styles from "./Perfil.module.css";

const Perfil = () => {
  const [values, setValues] = useState({
    nome: "",
    nivel: "",
    foto_perfil: "",
    nome_conquista: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  const userValues = JSON.parse(localStorage.getItem("user_info"));
  const { aluno_id } = userValues || {};

  useEffect(() => {
    if (aluno_id) {
      axios
        .get(`http://localhost:8081/prisma/allinformation/${aluno_id}`)
        .then((response) => {
          const { nome, nivel, foto_perfil, nome_conquista } =
            response.data.result[0];

          setValues({
            nome,
            nivel,
            foto_perfil,
            nome_conquista,
          });
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
      const response = await axios.patch(
        `http://localhost:8081/prisma/uploadImage/${aluno_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload realizado com sucesso:", response.data);
      setValues((prevValues) => ({
        ...prevValues,
        foto_perfil: `${baseURL}${response.data.newPhotoPath}`,
      }));
      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div className={styles.container}>
      <div className={styles.ContainerImageUser}>
        <img
          src={`${baseURL}${values.foto_perfil}`}
          alt={`${values.nome} perfil`}
          className={styles.imgPhotoPerfil}
        />
        <h1>{values.nome}</h1>
      </div>
      <p>Clique para procurar amigos: </p>
      <button onClick={openModal}>Procurar</button>

      {/* Modal com conteúdo */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Procurar Amigos</h2>
        <p>Aqui você pode buscar amigos!</p>
      </Modal>
    </div>
  );
};

export default Perfil;
