import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ModalInvite.module.css";

const ModalInvite = ({ isOpen, onClose, children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alunoid, setAlunoid] = useState(null); // Armazenar o alunoid no estado

  // Função para buscar alunos
  const fetchStudents = async (aluno_id) => {
    if (aluno_id) {
      setLoading(true);
      setError(null); // Reseta o erro antes de fazer a nova busca
      try {
        const response = await axios.get(`http://localhost:8081/prisma/searchStudents/${aluno_id}`);
        console.log("Resposta da API:", response.data); // Verifica o que está sendo retornado
        
        // Ajuste aqui para acessar 'result' corretamente
        const studentData = response.data.result; // Acesse o array 'result'
        setStudents(Array.isArray(studentData) ? studentData : []); // Garante que students seja um array
      } catch (err) {
        setError("Erro ao buscar alunos.");
        console.error("Erro ao buscar alunos:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Recupera o aluno_id do localStorage uma única vez
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      if (parsedUserInfo && parsedUserInfo.aluno_id) {
        setAlunoid(parsedUserInfo.aluno_id); // Armazena o aluno_id no estado
      }
    }
  }, []);

  const handleSearch = () => {
    if (alunoid && searchTerm.length > 2) {
      fetchStudents(alunoid); // Realiza a pesquisa ao clicar no botão
    } else {
      setStudents([]); // Limpa a lista se o termo de pesquisa tiver 2 ou menos caracteres
    }
  };

  const filteredStudents = Array.isArray(students) ? students.filter(student => {
    return student.aluno_id !== alunoid && student.nome_aluno.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  if (!isOpen) return null;

  const sendInvite = () => {
    
  }

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
          disabled={searchTerm.length < 3} // Desabilita o botão se o termo for menor que 3 caracteres
        >
          Pesquisar
        </button>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <ul className={styles.studentList}>
          {filteredStudents.map(student => (
            <li  key={`${student.aluno_id}-${student.nome_aluno}`} className={styles.studentItem}>
              <a href="#" onClick={sendInvite}>{student.nome_aluno} </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalInvite;
