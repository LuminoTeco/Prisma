const db = require("./mysql/db");

exports.CreateMessagesForum = async (messagesData) => {
  const query = "INSERT INTO tb_forum (conteudo, aluno_id_fk) VALUES (?, ?)";
  const values = [messagesData.conteudo, messagesData.aluno_id_fk];

  try {
    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (err) {
    console.error("Erro ao criar a mensagem:", err);
    throw err;
  }
};

exports.getMessagesForum = async () => {
  const query = `
        SELECT 
    a.nome, 
    a.foto_perfil,
    f.conteudo
FROM 
    tb_forum f
JOIN 
    tb_alunos a ON f.aluno_id_fk = a.aluno_id
ORDER BY 
    f.data_criacao ASC;
    `;

  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    console.error("Erro ao buscar as mensagens:", err);
    throw err;
  }
};
