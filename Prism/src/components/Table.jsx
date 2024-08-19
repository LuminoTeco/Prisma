import React from 'react';
import { useQuery } from 'react-query'
import "./CSS/Table.css"

const Table = () => {

  // Não esquecer de colocar o useMutation dps

  const {data, isLoading, error} = useQuery("usersList", () => {
      return axios.get("http://localhost:8081/api/usersList")
        .then((response) => response.data)
  }, {
    retry: 5,
    refetchOnWindowFocus: true,
    refetchInterval: 10000
  })

  if(isLoading) {
    return <p>Carregando...</p>
  }

  if(error) {
    return <p>Algo deu errado! :(</p>
  }

  return (
    <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Código Escolar</th>
        <th>Ações</th> 
      </tr>
    </thead>
    <tbody>
      {data && data.length > 0 ? (
        data.map((units) => (
          <tr key={units.IdU}>
            <td>{units.IdU}</td>
            <td>{units.NameInstitute}</td>
            <td>{units.CE}</td>
            <td className='buttonColumn'>
              <button onClick={() => handleEdit(units.IdU)}>Alterar</button>
              <button onClick={() => handleDelete(units.IdU)}>Excluir</button>
            </td>
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
