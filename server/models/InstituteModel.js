const db = require("./mysql/db.js");

exports.createInstitute = async (userData) => {
  const query =
    "INSERT INTO registerUnits (`Cod_Escolar`, `NameInstitute`, `emailInstitute`, `city`, `qtdStudents`, `pwd`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    userData.Cod_Escolar,  
    userData.NameInst,
    userData.emailInstitute,
    userData.city,
    userData.qtdStudents,
    userData.pwd,
  ];

  try {
    const [result] = await db.query(query, values);
    return { Cod_Escolar: result.insertId };
  } catch (err) {
    console.error("Erro ao criar o instituto:", err);
    throw err; // Propaga o erro para o controlador
  }
}

exports.getInstituteUser = async (emailInstitute) => {
  const query = "SELECT NameInstitute, emailInstitute, pwd, city, Cod_Escolar FROM registerUnits WHERE emailInstitute = ?";


  try {
    const [results] = await db.query(query, [emailInstitute]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Erro ao procurar o usuário:", err);
    throw err;
  }
};


//Class 

exports.createClass = async (userData) => {
  const query = "INSERT INTO tb_turmas (nome_turma, ano_letivo, instituicao_id_fk) VALUES (?, ?, ?)";
  
  const values = [
    userData.nome_turma,
    userData.ano_letivo,
    userData.instituicao_id_fk,
  ];

  try {
    const [result] = await db.query(query, values);
    return { turma_id: result.insertId };
  } catch (err) {
    console.error("Erro ao criar a turma:", err);
    throw err;
  }
};

exports.getClass = async (instituicao_id_fk) => {
  const query = "SELECT * FROM tb_turmas WHERE instituicao_id_fk = ?";

  try {
    const [results] = await db.query(query, [instituicao_id_fk]);
    return results.length > 0 ? results : [];
  } catch (err) {
    console.error("Erro ao procurar as turmas:", err);
    throw err;
  }
};



exports.getClassById = async(id) => {
  const query = "SELECT * FROM tb_turmas WHERE turma_id = ?";

  try {
    const [results] = await db.query(query, [id]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Erro ao procurar a turma:", err);
    throw err;
  }
}

