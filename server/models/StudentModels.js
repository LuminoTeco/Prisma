const db = require("./mysql/db");

exports.createStudent = async (studentData) => {
  const query =
    "INSERT INTO tb_alunos (nome, email, senha, ano_serie, nivel, instituicao_id_fk, turma_id_fk) VALUES (?, ?, ?, ?, ?, ?, ?)"
  const values = [
    studentData.nome, 
    studentData.email, 
    studentData.senha,
    studentData.ano_serie,
    studentData.nivel,
    studentData.instituicao_id_fk,
    studentData.turma_id_fk,
  ]

  try {
    const [result] = await db.query(query, values);
    return { id_student: result.insertId };
  } catch (err) {
    console.error("Erro ao criar o estudante:", err);
    throw err;
  }
}

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




