import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import styles from "../CSS/Class.module.css";

const Class = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome_turma: "",
    ano_letivo: "",
    instituicao_id_fk: "",
  });

  const {
    data: turmas = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["turmas"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8081/prisma/classList?insituicao_id_fk=");
      if (!response.ok) {
        throw new Error("Erro ao buscar turmas");
      }
      return response.json();
    },
    refetchInterval: 5000, // Atualiza a cada 5 segundos
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      nome_turma: "",
      ano_letivo: "",
      instituicao_id_fk: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se todos os campos estão preenchidos antes de enviar
    if (
      !formData.nome_turma ||
      !formData.ano_letivo ||
      !formData.instituicao_id_fk
    ) {
      console.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/prisma/class",
        formData
      );
      console.log(response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        validationErrors.forEach((err) => {
          console.error(`Erro no campo ${err.param}: ${err.msg}`);
        });
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Turma</th>
            <th>Ano Letivo</th>
            <th>Código da Instituição</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr
              key={turma.turma_id}
              className={styles.tableRow}
              onClick={() => {
                window.location.href = `/turma/${turma.turma_id}`;
              }}
            >
              <td>{turma.turma_id}</td>
              <td>{turma.nome_turma}</td>
              <td>{turma.ano_letivo}</td>
              <td>{turma.instituicao_id_fk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.createButton} onClick={handleOpenModal}>
        Criar Nova Turma
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Criar Nova Turma</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nome_turma">Nome da Turma:</label>
                <input
                  type="text"
                  id="nome_turma"
                  name="nome_turma"
                  value={formData.nome_turma}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ano_letivo">Ano Letivo:</label>
                <input
                  type="text"
                  id="ano_letivo"
                  name="ano_letivo"
                  value={formData.ano_letivo}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="instituicao_id_fk">
                  Código da Instituição:
                </label>
                <input
                  type="text"
                  id="instituicao_id_fk"
                  name="instituicao_id_fk"
                  value={formData.instituicao_id_fk}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  Salvar
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Class;
