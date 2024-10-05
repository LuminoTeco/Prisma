import React, { useEffect, useState } from "react";
import styles from "../CSS/Class.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Class = () => {
  const [formData, setFormData] = useState({
    nome_turma: "",
    ano_letivo: "",
    instituicao_id_fk: localStorage.getItem("instituicao_id_fk"),
  });
  const [errors, setErrors] = useState({});
  const [turmas, setTurmas] = useState([]);

  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/prisma/classes/${formData.instituicao_id_fk}`,
        { withCredentials: true }
      );
      setTurmas(response.data); // Certifique-se de que `response.data` contém o `turma_id`
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    axios
      .post("http://localhost:8081/prisma/class", formData)
      .then((res) => {
        console.log(res.data); // Verifique o que está sendo retornado
        setTurmas((prevTurmas) => [...prevTurmas, res.data]); // Adicione o que foi retornado
        setFormData({
          nome_turma: "",
          ano_letivo: "",
          instituicao_id_fk: localStorage.getItem("instituicao_id_fk"),
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrors(err.response.data.errors);
        } else {
          console.log("Erro ao criar a turma:", err);
        }
      });
  };

  const handleRowClick = (id) => {
    navigate(`/turma/${id}`);
  };

  return (
    <div className={styles.container}>
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
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Class;
