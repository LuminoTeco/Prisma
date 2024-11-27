import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../CSS/ClassDetails.module.css";
import { useSpring, animated } from "@react-spring/web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassDetails = () => {
  const { id: turma_id_fk } = useParams();
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    ano_serie: "",
    nivel: "",
    turma_id_fk,
    instituicao_id_fk: localStorage.getItem("instituicao_id_fk") || "",
    senha: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8081/prisma/students/${turma_id_fk}`
        );
        setStudentsData(response.data.students);
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
        toast.error("Erro ao buscar dados dos alunos.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [turma_id_fk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      senha: name === "nome" ? generatePassword(value) : prevData.senha,
    }));
  };

  const generatePassword = (nome) => {
    const firstTwoLetters = nome.slice(0, 6).toUpperCase();
    return `${turma_id_fk}${firstTwoLetters}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Dados enviados:", formData);

    try {
      let response;
      if (editMode) {
        response = await toast.promise(
          axios.put(
            `http://localhost:8081/prisma/students/${currentStudentId}`,
            formData
          ),
          {
            pending: "Atualizando aluno...",
            success: "Aluno atualizado com sucesso!",
            error: "Erro ao atualizar aluno.",
          }
        );
        setStudentsData((prevStudents) =>
          prevStudents.map((student) =>
            student.id === currentStudentId ? response.data : student
          )
        );
      } else {
        // Adiciona novo aluno
        response = await toast.promise(
          axios.post(`http://localhost:8081/prisma/students`, formData),
          {
            pending: "Adicionando aluno...",
            success: "Aluno adicionado com sucesso!",
            error: "Erro ao adicionar aluno.",
          }
        );
        setStudentsData((prevStudents) => [...prevStudents, response.data]);
        window.location.reload();
      }
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      toast.error("Erro ao salvar aluno.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      ano_serie: "",
      nivel: "",
      turma_id_fk, // Mantém o valor fixo
      instituicao_id_fk: localStorage.getItem("instituicao_id_fk") || "", // Atualiza o valor
      senha: "",
    });
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentStudentId(null);
  };

  const handleDelete = async (studentId) => {
    console.log(studentId);
  
    try {
      await toast.promise(
        axios.delete(`http://localhost:8081/prisma/students/${studentId}`),
        {
          pending: "Excluindo aluno...",
          success: "Aluno excluído com sucesso!",
          error: "Erro ao excluir aluno.",
        }
      );
  
      // Atualiza a lista de alunos removendo o aluno deletado
      setStudentsData((prevStudents) =>
        prevStudents.filter((student) => student.aluno_id !== studentId)
      );
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      toast.error("Erro ao excluir aluno.");
    } finally {
      setLoading(false);
    }
  };
  
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? "translateY(0)" : "translateY(-100%)",
    config: { tension: 220, friction: 20 },
  });
  
  return (
    <div>
      <ToastContainer />
      <h1>Detalhes da Turma</h1>
      <div className={styles.actions}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.buttonCreate}
        >
          Adicionar Aluno
        </button>
        <button onClick={() => navigate(-1)} className={styles.buttonBack}>
          Voltar
        </button>
      </div>
      {loading ? (
        <p>Carregando alunos...</p>
      ) : studentsData && studentsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Série</th>
              <th>Nível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.aluno_id}>
                <td>{student.nome}</td>
                <td>{student.email}</td>
                <td>{student.ano_serie}</td>
                <td>{student.nivel}</td>
                <td>
                  <button
                    onClick={() => handleEdit(student)}
                    className={styles.buttonEdit}
                  >
                    Alterar
                  </button>
                  <button
                    onClick={() => handleDelete(student.aluno_id)} 
                    className={styles.buttonDelete}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum aluno encontrado.</p>
      )}

      {isModalOpen && (
        <animated.div style={modalAnimation} className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={resetForm} className={styles.closeButton}>
              X
            </button>
            <h2>{editMode ? "Alterar Aluno" : "Adicionar Aluno"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ano_serie">Série:</label>
                <input
                  type="text"
                  id="ano_serie"
                  name="ano_serie"
                  value={formData.ano_serie}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="nivel">Nível:</label>
                <input
                  type="text"
                  id="nivel"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="senha">Senha:</label>
                <input
                  type="text"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  readOnly
                />
              </div>
              <button type="submit" className={styles.buttonSubmit}>
                {editMode ? "Salvar Alterações" : "Adicionar Aluno"}
              </button>
            </form>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default ClassDetails;
