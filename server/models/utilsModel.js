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

exports.sendFriendRequest = async (aluno_id, amigo_id) => {
  const query = `
    INSERT INTO tb_amizade (amigo1_id_fk, amigo2_id_fk, data_amizade) 
    VALUES (?, ?, NOW())
  `;
  const values = [aluno_id, amigo_id]; 

  try {
    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (err) {
    console.error("Erro ao enviar a solicitação de amizade:", err);
    throw err;
  }
};

exports.getFriendRequestPendent = async ({ id_aluno }) => {
  const query = `
    SELECT 
    a1.nome AS nome_enviado,
    a2.nome AS nome_recebido,
    ta.*  -- Isso inclui todos os campos da tabela tb_amizade
FROM 
    tb_amizade ta
JOIN 
    tb_alunos a1 ON ta.amigo1_id_fk = a1.aluno_id 
JOIN 
    tb_alunos a2 ON ta.amigo2_id_fk = a2.aluno_id 
WHERE 
    ta.amigo2_id_fk = 1
    AND ta.request = 'pendente';
  `;

  try {
    const [results] = await db.query(query, [id_aluno]); 
    return results;
  } catch (err) {
    console.error("Erro ao buscar as solicitações pendentes:", err);
    throw err;
  }
};
