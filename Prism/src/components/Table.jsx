import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/usersList');
        if (Array.isArray(response.data)) {
          setUnits(response.data);
        } else {
          throw new Error('Dados recebidos não são um array');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Erro ao carregar dados: {error.message}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Código Escolar</th>
        </tr>
      </thead>
      <tbody>
        {units && units.length > 0 ? (
          units.map(unit => (
            <tr key={unit.IuD}>
              <td>{unit.IuD}</td>
              <td>{unit.NameInstitute}</td>
              <td>{unit.CE}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Nenhum dado encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
