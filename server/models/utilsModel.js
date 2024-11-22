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
    f.data_criacao DESC;
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
    ta.amigo2_id_fk = ?
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

exports.acceptFriendRequest = async ({ id_aluno }) => {
  const query = `
    UPDATE tb_amizade
    SET request = 'aceito'
    WHERE amigo2_id_fk = ? AND request = 'pendente';
  `;

  try {
    const [results] = await db.query(query, [id_aluno]);
    return results;
  } catch (err) {
    console.error("Erro ao aceitar a solicitação de amizade:", err);
    throw err;
  }
};

exports.rejectFriendRequest = async ({ id_aluno }) => {
  const query = `
    DELETE FROM tb_amizade
    WHERE amigo2_id_fk = ? AND request = 'pendente';
  `;

  try {
    const [results] = await db.query(query, [id_aluno]);
    return results;
  } catch (err) {
    console.error("Erro ao rejeitar a solicitação de amizade:", err);
    throw err;
  }
};

exports.ranking = async ({ Cod_Escolar }) => {
  const query = `
    SELECT 
    a.aluno_id,
    a.nome AS nome_aluno,
    a.foto_perfil,
    COALESCE(tx.total_xp, 0) AS total_xp
  FROM 
    tb_alunos a
  LEFT JOIN 
    tb_total_xp tx ON a.aluno_id = tx.aluno_id
  JOIN 
    registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar 
  WHERE 
    ru.Cod_Escolar = ?
  ORDER BY 
    total_xp DESC;
  `;

  try {
    const [results] = await db.query(query, [Cod_Escolar]);
    return results;
  } catch (err) {
    console.error("Erro ao buscar o ranking:", err);
    throw err;
  }
};

exports.rankingMyFriends = async ({ Cod_Escolar, id_aluno }) => {
  const query = `
  SELECT 
    a.aluno_id,
    a.nome AS nome_aluno,
    a.foto_perfil,
    COALESCE(tx.total_xp, 0) AS total_xp
  FROM 
    tb_alunos a
  LEFT JOIN 
    tb_total_xp tx ON a.aluno_id = tx.aluno_id
  JOIN 
    registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar
  JOIN 
    tb_amizade ta ON (a.aluno_id = ta.amigo1_id_fk OR a.aluno_id = ta.amigo2_id_fk)
  WHERE 
    ru.Cod_Escolar = ?  
    AND (
      (ta.amigo1_id_fk = a.aluno_id AND ta.amigo2_id_fk = ?)
      OR
      (ta.amigo2_id_fk = a.aluno_id AND ta.amigo1_id_fk = ?)
    )
    AND a.aluno_id != ?
    AND ta.request = 'aceito'
  ORDER BY 
    total_xp DESC;
`;

  try {
    const [results] = await db.query(query, [
      Cod_Escolar,
      id_aluno,
      id_aluno,
      id_aluno,
    ]);
    return results;
  } catch (err) {
    console.error("Erro ao buscar o ranking dos amigos:", err);
    throw err;
  }
};

exports.AddAchivementUser = async (aluno_id, conquista_id) => {
  const query =
    "INSERT INTO tb_alunos_conquistas (aluno_id_fk, conquista_id_fk, data_conquista) VALUES (?, ?, NOW())";

  try {
    const [results] = await db.query(query, [aluno_id, conquista_id]);
    return results;
  } catch (err) {
    console.error("Erro ao adicionar a conquista:", err);
    throw err;
  }
};

exports.NotAchivement = async (aluno_id) => {
  const query = `
   WITH Recentes AS (
    SELECT 
        a.nome AS nome_aluno,
        c.descricao AS nome_conquista,
        ac.data_conquista,
        ROW_NUMBER() OVER (PARTITION BY a.aluno_id ORDER BY ac.data_conquista DESC) AS rn
    FROM 
        tb_alunos_conquistas ac
    JOIN 
        tb_alunos a ON ac.aluno_id_fk = a.aluno_id  
    JOIN 
        tb_conquistas c ON ac.conquista_id_fk = c.conquista_id
    WHERE 
        ac.aluno_id_fk != ?
    ORDER BY 
        ac.data_conquista DESC
)
SELECT 
    nome_aluno,
    nome_conquista,
    data_conquista
FROM 
    Recentes
WHERE 
    rn = 1;
  `;

  try {
    const [results] = await db.query(query, [aluno_id]);
    return results;
  } catch (err) {
    console.error("Erro ao buscar as conquistas:", err);
    throw err;
  }
};

exports.getContentForum = async (aluno_id) => {
  const query = `
    SELECT 
    a.nome, 
    a.foto_perfil,
    f.conteudo
FROM 
    tb_forum f
JOIN 
    tb_alunos a ON f.aluno_id_fk = a.aluno_id
WHERE 
    a.aluno_id = ? 
ORDER BY 
    f.data_criacao ASC;

  `;

  try {
    const [results] = await db.query(query, [aluno_id]);
    return results;
  } catch (err) {
    console.error("Erro ao buscar as mensagens:", err);
    throw err;
  }
};

exports.InsertStudentColaborator = async (email) => {
  const query = `
    INSERT INTO tb_aluno_colaborador (aluno_id_fk, xp_colaborador)
    SELECT aluno_id, 0
    FROM tb_alunos
    WHERE email = ?;
  `;

  try {
    const [results] = await db.query(query, [email]);
    return results;
  } catch (err) {
    console.error("Erro ao buscar as mensagens:", err);
    throw err;
  }
};

exports.verifyColaborator = async (aluno_id_fk) => {
  const query = `
    SELECT 1 as Id_AlunoColaborador
    FROM tb_aluno_colaborador
    WHERE aluno_id_fk = ?
    LIMIT 1;
  `;

  try {
    const [result] = await db.query(query, [aluno_id_fk]);
    return result;
  } catch (err) {
    console.error("Erro ao buscar as usuário:", err);
    throw err;
  }
};

exports.getXpColaborador = async (aluno_id_fk) => {
  const query = `
    SELECT xp_colaborador
    FROM tb_aluno_colaborador
    WHERE aluno_id_fk = ?;
  `;

  try {
    const [result] = await db.query(query, [aluno_id_fk]);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.updateXpColaborador = async (aluno_id_fk, xp) => {
  const query = `
    UPDATE tb_aluno_colaborador 
    SET xp_colaborador = xp_colaborador + ? 
    WHERE aluno_id_fk = ?;
  `

  try {
    const [result] = await db.query(query, [xp, aluno_id_fk]);
    return result;
  } catch (err) {
    throw err;
  }
}
