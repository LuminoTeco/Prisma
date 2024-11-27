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

exports.deleteStudent = async (studentId) => {
  const query = "DELETE FROM tb_alunos WHERE aluno_id = ?";

  try {
    const [results] = await db.query(query, [studentId]);
    return results;
  } catch (err) {
    console.error("Erro ao deletar o estudante:", err);
    throw err;
  }
};


exports.LoginStudent = async (email) => {
  const query = "SELECT * FROM tb_alunos WHERE email = ?";

  try {
    const [results] = await db.query(query, [email]);
    return results.length > 0 ? results[0] : null;
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

exports.UpdateStudentPhoto = async (foto_perfil, aluno_id) => {
  const query = "UPDATE tb_alunos SET foto_perfil = ? WHERE aluno_id = ?";
  const values = [foto_perfil, aluno_id];

  try {
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar a imagem do estudante:", error);
    throw error;
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
    console.error("Erro ao selecionar a disciplina do aluno:", err);
    throw err;
  }
};

exports.allInfomationUser = async (aluno_id) => {
  const query = `
      SELECT 
    a.nome AS nome_aluno,
    a.email,
    a.ano_serie,
    a.nivel,
    a.meta_xp,
    a.xp,
    a.data_cadastro,
    a.foto_perfil,
    ru.NameInstitute AS nome_instituicao,
    ru.Cod_Escolar AS cod_escolar, 
    c.descricao AS nome_conquista,
    d.nome AS nome_disciplina
FROM 
    tb_alunos a
LEFT JOIN 
    registerUnits ru 
    ON a.instituicao_id_fk = ru.Cod_Escolar
LEFT JOIN 
    tb_alunos_conquistas ac 
    ON a.aluno_id = ac.aluno_id_fk
LEFT JOIN 
    tb_conquistas c 
    ON ac.conquista_id_fk = c.conquista_id
LEFT JOIN 
    tb_disciplina d 
    ON a.disciplina_id_fk = d.disciplina_id
WHERE 
    a.aluno_id = ?;
`;

  try {
    const [rows] = await db.query(query, [aluno_id]);
    return rows;
  } catch (err) {
    console.error("Erro ao selecionar a disciplina do aluno:", err);
    throw err;
  }
};

exports.allStudentsByNameInvite = async (aluno_id) => {
  const query = `
    SELECT 
      a.aluno_id,        
      a.nome AS nome_aluno
    FROM 
      tb_alunos a
    JOIN 
      registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar
    WHERE 
      a.instituicao_id_fk = (SELECT instituicao_id_fk FROM tb_alunos WHERE aluno_id = ?)
      AND a.aluno_id <> ?;
  `;

  try {
    const [results] = await db.query(query, [aluno_id, aluno_id]);
    return results;
  } catch (err) {
    throw new Error("Erro ao buscar alunos");
  }
};

exports.insertXpUser = async (aluno_id, xpGanho) => {
  const query = "UPDATE tb_alunos SET xp = xp + ? WHERE aluno_id = ?";

  try {
    const [results] = await db.query(query, [xpGanho, aluno_id]);
    return results;
  } catch (err) {
    throw new Error("Erro ao atualizar XP do aluno");
  }
};
