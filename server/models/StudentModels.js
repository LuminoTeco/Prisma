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
    studentData.foto_perfil || "default_user.jpeg",
    studentData.instituicao_id_fk,
    studentData.turma_id_fk,
  ];

  try {
    const [result] = await db.query(query, values);
    return { id_student: result.insertId };
  } catch (err) {
    console.error("Erro ao criar o estudante:", err);
    throw err;
  }
};

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
  const query = "SELECT * FROM tb_alunos WHERE turma_id_fk = ?";

  try {
    const [results] = await db.query(query, [turma_id_fk]);
    return { students: results };
  } catch (err) {
    console.error("Erro ao buscar os estudantes:", err);
    throw err;
  }
};

exports.UpdateStudent = async (studentData) => {
  const query =
    "UPDATE tb_alunos SET nome = ?, email = ?, ano_serie = ?, nivel = ?, instituicao_id_fk = ?, turma_id_fk = ? WHERE aluno_id = ?";
  const values = [
    studentData.nome,
    studentData.email,
    studentData.ano_serie,
    studentData.nivel,
    studentData.instituicao_id_fk,
    studentData.turma_id_fk,
    studentData.aluno_id,
  ];

  try {
    const [result] = await db.query(query, values);
    return { id_student: result.insertId };
  } catch (err) {
    console.error("Erro ao atualizar o estudante:", err);
    throw err;
  }
};

exports.UpdateStudentSubject = async (aluno_id, disciplina_id) => {
  const query = "UPDATE tb_alunos SET disciplina_id_fk = ? WHERE aluno_id = ?";
  const values = [disciplina_id, aluno_id];

  try {
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar a disciplina do aluno:", error);
    throw error;
  }
};

exports.selectSubjects = async (aluno_id) => {
  const query = `
    SELECT d.nome
    FROM tb_alunos a
    JOIN tb_disciplina d ON a.disciplina_id_fk = d.disciplina_id
    WHERE a.aluno_id = ?
  `;

  const values = [aluno_id];

  try {
    const [rows] = await db.query(query, values);
    return rows;
  } catch (err) {
    console.error('Erro ao selecionar a disciplina do aluno:', err);
    throw err;
  }
}

