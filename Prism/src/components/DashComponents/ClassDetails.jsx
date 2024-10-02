// src/components/ClassDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../CSS/ClassDetails.module.css";
import axios from "axios";

const ClassDetails = () => {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/prisma/classList/${id}`);
        setTurma(response.data);
      } catch (err) {
        setError("Erro ao buscar detalhes da turma.");
      }
    };

  /*   const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/prisma/students/${id}`); // Adjust endpoint as needed
        setStudents(response.data);
      } catch (err) {
        setError("Erro ao buscar alunos.");
      }
    }; */

    fetchTurma();
/*     fetchStudents(); */
    setLoading(false);
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

 /*  const handleEdit = (studentId) => {

    console.log(`Edit student with ID: ${studentId}`);
  }; */

  /* onst handleDelete = (studentId) => {

    console.log(`Delete student with ID: ${studentId}`);
  };

  const handleCreate = () => {

    console.log("Create new student");
  };

  const handleSearch = () => {

    console.log("Search students");
  };
 */
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Detalhes da Turma</h1>
        {turma && (
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Dados da Turma</button>
            <div className={styles.dropdownContent}>
              <p>ID: {turma.turma_id}</p>
              <p>Nome da Turma: {turma.nome_turma}</p>
              <p>Ano Letivo: {turma.ano_letivo}</p>
              <p>Código da Instituição: {turma.instituicao_id_fk}</p>
            </div>
          </div>
        )}
      </nav>

      <div className={styles.actions}>
        <button /* onClick={handleCreate} */ className={styles.actionButton}>Criar Aluno</button>
        <button /* onClick={handleSearch} */ className={styles.actionButton}>Buscar Aluno</button>
      </div>

      <h2>Alunos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ano Série</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.aluno_id}>
              <td>{student.aluno_id}</td>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{student.ano_serie}</td>
              <td>{student.nivel}</td>
              <td>
                <button 
                  className={styles.editButton} 
                  onClick={() => handleEdit(student.aluno_id)}>
                  Editar
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={() => handleDelete(student.aluno_id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDetails;
