import React, { useState } from 'react';
import styles from './CSS/Units.module.css'
import axios from 'axios';

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

    axios.post('http://localhost:8081/api/users', values) 
      .then(response => {
        console.log(response.data); 
        alert("Cadastro realizado com sucesso!");
      })
      .catch(error => {
        console.error('Houve um erro ao cadastrar a unidade:', error);
        alert("Erro ao cadastrar a unidade");
      });
  };

  

  return (
     <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Cadastro de unidades</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Nome da Unidade:</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setValues({ ...values, NameInstitute: e.target.value })}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>E-mail:</label>
              <input
                className={styles.input}
                type="email"
                onChange={(e) => setValues({ ...values, emailInstitute: e.target.value })}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Cidade:</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setValues({ ...values, city: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.mediumInput}`}>
              <label className={styles.label}>Código Escolar:</label>
              <input
                className={styles.input}
                type="number"
                onChange={(e) => setValues({ ...values, CE: e.target.value })}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.mediumInput}`}>
              <label className={styles.label}>Número de alunos:</label>
              <input
                className={styles.input}
                type="number"
                onChange={(e) => setValues({ ...values, qtdStudents: e.target.value })}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.largeInput}`}>
              <label className={styles.label}>Senha:</label>
              <input
                className={styles.input}
                type="password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
          </div>
          <button className={styles.button} type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Units;
