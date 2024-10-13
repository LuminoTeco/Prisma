const db = require("./mysql/db");

exports.createStudent = async (studentData) => {
  const query = `
    INSERT INTO tb_alunos (nome, email, senha, ano_serie, nivel, foto_perfil, instituicao_id_fk, turma_id_fk)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    studentData.nome, 
    studentData.email, 
    studentData.senha,
    studentData.ano_serie,
    studentData.nivel,
    studentData.foto_perfil || 'default_user.jpeg',
    studentData.instituicao_id_fk,
    studentData.turma_id_fk,  // Adicionando turma_id_fk
  ];

  try {
    const [result] = await db.query(query, values);
    return { id_student: result.insertId };
  } catch (err) {
    console.error("Erro ao criar o estudante:", err);
    throw err;
  }
}

exports.LoginStudent = async (email) => {
  const query = "SELECT * FROM tb_alunos WHERE email = ?";
  
  try {
      const [results] = await db.query(query, [email]); 
      return results.length > 0 ? results[0] : null; // Retorna o primeiro aluno ou null se não encontrado
  } catch (err) {
      console.error("Erro ao buscar o email do aluno", err);
      throw err;
  }
};

exports.getStudents = async (turma_id_fk) => {
  const query = "SELECT * FROM tb_alunos WHERE turma_id_fk = ?"

  try {
    const [results] = await db.query(query, [turma_id_fk]);
    return { students: results };
  } catch (err) {
    console.error("Erro ao buscar os estudantes:", err);
    throw err;
  }
}

exports.UpdateStudent = async (studentData) => {
  const query =
    "UPDATE tb_alunos SET nome = ?, email = ?, ano_serie = ?, nivel = ?, instituicao_id_fk = ?, turma_id_fk = ? WHERE aluno_id = ?"
  const values = [
    studentData.nome,
    studentData.email,
    studentData.ano_serie,
    studentData.nivel,
    studentData.instituicao_id_fk,
    studentData.turma_id_fk,
    studentData.aluno_id,
  ]

  try {
    const [result] = await db.query(query, values);
    return { id_student: result.insertId };
  } catch (err) {
    console.error("Erro ao atualizar o estudante:", err);
    throw err;
  }
}




