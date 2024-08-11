import React, { useState } from 'react';
import axios from 'axios';
import Table from '../../../components/Table';

const Units = () => {
  const [values, setValues] = useState({
    NameInstitute: '',
    emailInstitute: '',
    city: '',
    CE: '',
    qtdStudents: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Faz a requisição POST para o servidor Node.js
    axios.post('http://localhost:8081/api/users', values) // URL atualizada
      .then(response => {
        console.log(response.data); // Exibe a resposta no console
        alert("Cadastro realizado com sucesso!");
      })
      .catch(error => {
        console.error('Houve um erro ao cadastrar a unidade:', error);
        alert("Erro ao cadastrar a unidade");
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome da Unidade: </label>
            <input
              type="text"
              onChange={(e) => setValues({ ...values, NameInstitute: e.target.value })}
            />
          </div>
          <div>
            <label>E-mail: </label>
            <input
              type="email"
              onChange={(e) => setValues({ ...values, emailInstitute: e.target.value })}
            />
          </div>
          <div>
            <label>Cidade: </label>
            <input
              type="text"
              onChange={(e) => setValues({ ...values, city: e.target.value })}
            />
            {/* Trocar por um options cidades de SP */}
          </div>
          <div>
            <label>Código Escolar: </label>
            <input
              type="number"
              onChange={(e) => setValues({ ...values, CE: e.target.value })}
            />
          </div>
          <div>
            <label>Número de alunos: </label>
            <input
              type="number"
              onChange={(e) => setValues({ ...values, qtdStudents: e.target.value })}
            />
          </div>
          <div>
            <label>Senha: </label>
            <input
              type="password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <Table />
    </div>
  );
};

export default Units;
