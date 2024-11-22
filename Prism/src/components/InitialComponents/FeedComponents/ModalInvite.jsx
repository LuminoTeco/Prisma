import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styles from "./ModalInvite.module.css";

const socket = io("http://localhost:8081");

const ModalInvite = ({ isOpen, onClose, children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alunoid, setAlunoid] = useState(null); // ID do aluno logado
  const [toAluno, setToAluno] = useState(null); // Alvo do convite, inicialmente null

  // Função para buscar alunos
  const fetchStudents = async (aluno_id) => {
    if (aluno_id) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8081/prisma/searchStudents/${aluno_id}`
        );
        const studentData = response.data.result;
        setStudents(Array.isArray(studentData) ? studentData : []);
      } catch (err) {
        setError("Erro ao buscar alunos.");
        console.error("Erro ao buscar alunos:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      if (parsedUserInfo && parsedUserInfo.aluno_id) {
        setAlunoid(parsedUserInfo.aluno_id);
      }
    }
  }, []);

  // Função de pesquisa
  const handleSearch = () => {
    if (searchTerm.length > 2) {
      if (alunoid) {
        fetchStudents(alunoid);
      }
    } else {
      setStudents([]); // Limpa a lista de alunos quando o campo de pesquisa estiver vazio ou com menos de 3 caracteres
    }
  };

  // Filtra os alunos com base no nome e no ID
  const filteredStudents = Array.isArray(students)
    ? students.filter((student) => {
        return (
          student.aluno_id !== alunoid &&
          student.nome_aluno.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  // Enviar convite
  const sendInvite = async () => {
    if (toAluno) {
      try {
        const response = await axios.post("http://localhost:8081/prisma/sendInvite", {
          id_aluno: alunoid,
          id_amigo: toAluno,
        });

        if (response.data.success) {
          console.log(`Convite enviado de ${alunoid} para ${toAluno}`);

          socket.emit("sendInvite", {
            from: alunoid,
            to: toAluno,
          });

          console.log("Convite enviado com sucesso!");
        } else {
          console.error("Erro ao enviar o convite:", response.data.message);
        }

        onClose();

      } catch (error) {
        console.error("Erro ao enviar convite:", error);
      }
    } else {
      console.error("Nenhum destinatário selecionado.");
    }
  };

  // Selecionar aluno
  const handleSelectStudent = (alunoId) => {
    setToAluno(alunoId);
    console.log(`Aluno selecionado: ${alunoId}`);
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setStudents([]); 
    }
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do seu amigo..."
        />
        <button
          onClick={handleSearch}
          className={styles.searchButton}
          disabled={searchTerm.length < 3}
        >
          Pesquisar
        </button>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <ul className={styles.studentList}>
          {filteredStudents.map((student) => (
            <li key={`${student.aluno_id}-${student.nome_aluno}`} className={styles.studentItem}>
              <button
                onClick={() => handleSelectStudent(student.aluno_id)}
                className={styles.studentButton}
              >
                {student.nome_aluno}
              </button>
              {toAluno === student.aluno_id && (
                <button onClick={sendInvite} className={styles.buttonInvite}>
                  Enviar Convite
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalInvite;
