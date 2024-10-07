import React, { useEffect, useState } from "react";
import styles from "../CSS/Class.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Class = () => {
  const [formData, setFormData] = useState({
    nome_turma: "",
    ano_letivo: "",
    instituicao_id_fk: localStorage.getItem("instituicao_id_fk"),
  });
  const [errors, setErrors] = useState({});
  const [turmas, setTurmas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/prisma/classes/${formData.instituicao_id_fk}`,
        { withCredentials: true }
      );
      setTurmas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  };

  useEffect(() => {
    fetchClasses();

    const intervalId = setInterval(() => {
      fetchClasses();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [formData.instituicao_id_fk]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true); // Inicia o carregamento

    const toastId = toast.loading("Criando turma..."); // Cria o toast de carregamento

    try {
      const response = await axios.post("http://localhost:8081/prisma/class", formData);
      console.log(response.data);
      setTurmas((prevTurmas) => [...prevTurmas, response.data]);
      setFormData({
        nome_turma: "",
        ano_letivo: "",
        instituicao_id_fk: localStorage.getItem("instituicao_id_fk"),
      });
      setIsModalOpen(false); // Fecha o modal após o envio

      // Atualiza o toast de carregamento para sucesso
      toast.update(toastId, {
        render: "Turma criada com sucesso!",
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data.errors);
      } else {
        console.log("Erro ao criar a turma:", err);
      }

      // Atualiza o toast de carregamento para erro
      toast.update(toastId, {
        render: "Erro ao criar a turma. Tente novamente.",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleRowClick = (id) => {
    navigate(`/turma/${id}`);
  };

  // Configuração da animação do modal
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? "translateY(0)" : "translateY(-100%)",
  });

  return (
    <div className={styles.container}>
      <ToastContainer />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome da Turma</th>
            <th>Ano Letivo</th>
            <th>Código da Instituição</th>
          </tr>
        </thead>
        <tbody>
          {turmas.length > 0 ? (
            turmas.map((turma) => (
              <tr key={turma.turma_id} onClick={() => handleRowClick(turma.turma_id)}>
                <td>{turma.nome_turma}</td>
                <td>{turma.ano_letivo}</td>
                <td>{turma.instituicao_id_fk}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhuma turma encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Botão para abrir o modal */}
      <button onClick={() => setIsModalOpen(true)} className={styles.buttonCreate}>Criar Nova Turma</button>

      {/* Modal animado */}
      {isModalOpen && (
        <animated.div style={modalAnimation} className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>
              <h4>X</h4>
            </button>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nome_turma">Nome da Turma:</label>
                <input
                  type="text"
                  id="nome_turma"
                  name="nome_turma"
                  value={formData.nome_turma}
                  onChange={handleChange}
                />
                {errors.nome_turma && <p>{errors.nome_turma}</p>}
              </div>
              <div>
                <label htmlFor="ano_letivo">Ano Letivo:</label>
                <input
                  type="text"
                  id="ano_letivo"
                  name="ano_letivo"
                  value={formData.ano_letivo}
                  onChange={handleChange}
                />
                {errors.ano_letivo && <p>{errors.ano_letivo}</p>}
              </div>
              <div>
                <label htmlFor="instituicao_id_fk">Código da Instituição:</label>
                <input
                  type="text"
                  id="instituicao_id_fk"
                  name="instituicao_id_fk"
                  value={formData.instituicao_id_fk}
                  onChange={handleChange}
                  readOnly
                />
                {errors.instituicao_id_fk && <p>{errors.instituicao_id_fk}</p>}
              </div>
              <button type="submit" disabled={loading}>Enviar</button>
            </form>

          </div>
        </animated.div>
      )}
    </div>
  );
};

export default Class;
