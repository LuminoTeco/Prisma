import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../CSS/ClassDetails.module.css"; // CSS Modules
import { useSpring, animated } from "@react-spring/web";
import { ToastContainer, toast } from "react-toastify"; // Para notificações
import "react-toastify/dist/ReactToastify.css";

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    ano_serie: "",
    nivel: "",
  });
  const [editMode, setEditMode] = useState(false); // Controle para edição
  const [currentStudentId, setCurrentStudentId] = useState(null); // ID do aluno atual sendo editado
  const [loading, setLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await axios.get(`http://localhost:8081/prisma/students/${id}`);
        setStudentsData(response.data.students);
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
        toast.error("Erro ao buscar dados dos alunos.");
      } finally {
        setLoading(false); // Termina o carregamento
      }
    };

    fetchStudents();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento
    try {
      let response;
      if (editMode) {
        // Atualiza o aluno
        response = await toast.promise(
          axios.put(`http://localhost:8081/prisma/students/${currentStudentId}`, formData),
          {
            pending: "Atualizando aluno...",
            success: "Aluno atualizado com sucesso!",
            error: "Erro ao atualizar aluno.",
          }
        );
        setStudentsData((prevStudents) =>
          prevStudents.map((student) => (student.id === currentStudentId ? response.data : student))
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
      }
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      toast.error("Erro ao salvar aluno.");
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      ano_serie: "",
      nivel: "",
    });
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentStudentId(null);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setCurrentStudentId(student.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (studentId) => {
    setLoading(true); // Inicia o carregamento
    try {
      await toast.promise(
        axios.delete(`http://localhost:8081/prisma/students/${studentId}`),
        {
          pending: "Excluindo aluno...",
          success: "Aluno excluído com sucesso!",
          error: "Erro ao excluir aluno.",
        }, 
      );
      setStudentsData((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      toast.error("Erro ao excluir aluno.");
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? "translateY(0)" : "translateY(-100%)",
  });

  return (
    <div>
      <ToastContainer />
      <h1>Detalhes da Turma</h1>
      <button onClick={() => setIsModalOpen(true)} className={styles.buttonCreate}>
        Adicionar Aluno
      </button>
      <button onClick={() => navigate(-1)} className={styles.buttonBack}>
        Voltar
      </button>
      {loading ? ( // Condicional de carregamento
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
              <tr key={student.id}>
                <td>{student.nome}</td>
                <td>{student.email}</td>
                <td>{student.ano_serie}</td>
                <td>{student.nivel}</td>
                <td>
                  <button onClick={() => handleEdit(student)} className={styles.buttonEdit}>
                    Alterar
                  </button>
                  <button onClick={() => handleDelete(student.id)} className={styles.buttonDelete}>
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
              <button type="submit">{editMode ? "Atualizar" : "Adicionar"}</button>
            </form>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default ClassDetails;
