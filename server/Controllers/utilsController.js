const utilsModel = require("../models/utilsModel");

exports.CreateMessagesForum = async (req, res) => {
  const { conteudo, aluno_id_fk } = req.body;

  try {
    const result = await utilsModel.CreateMessagesForum({
      conteudo,
      aluno_id_fk,
    });
    res
      .status(201)
      .json({ message: "Mensagem criada com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao criar a mensagem:", err);
    res.status(500).json({ Error: "Erro ao criar a mensagem" });
  }
};

exports.getMessagesForum = async (req, res) => {
  try {
    const messagesForum = await utilsModel.getMessagesForum();
    res.status(200).json(messagesForum);
  } catch (err) {
    console.error("Erro ao buscar as mensagens:", err);
    res.status(500).json({ Error: "Erro ao buscar as mensagens" });
  }
};

//Requests para adicionar, rejeitar e enviar pedidos de amizades

exports.sendFriendRequest = async (req, res) => {
  const { id_aluno, id_amigo } = req.body;

  if (!id_aluno || !id_amigo) {
    return res.status(400).json({ error: "Faltando id_aluno ou id_amigo" });
  }

  try {
    const result = await utilsModel.sendFriendRequest(id_aluno, id_amigo);
    res
      .status(201)
      .json({ message: "Solicitação enviada com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao enviar a solicitação de amizade:", err);
    res.status(500).json({ error: "Erro ao enviar a solicitação de amizade" });
  }
};
exports.getFriendRequestPendent = async (req, res) => {
  const { id_aluno } = req.query;

  if (!id_aluno) {
    return res.status(400).json({ error: "ID do aluno é necessário." });
  }

  try {
    const result = await utilsModel.getFriendRequestPendent({ id_aluno });
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao buscar as solicitações pendentes:", err);
    res.status(500).json({ error: "Erro ao buscar as solicitações pendentes" });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { id_aluno } = req.query;

  if (!id_aluno) {
    return res.status(400).json({ error: "ID do aluno é necessário." });
  }

  try {
    const result = await utilsModel.acceptFriendRequest({ id_aluno });
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao aceitar a solicitação de amizade:", err);
    res.status(500).json({ error: "Erro ao aceitar a solicitação de amizade" });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  const { id_aluno } = req.query;

  if (!id_aluno) {
    return res.status(400).json({ error: "ID do aluno é indispensável." });
  }

  try {
    const result = await utilsModel.rejectFriendRequest({ id_aluno });
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao rejeitar a solicitação de amizade:", err);
    res
      .status(500)
      .json({ error: "Erro ao rejeitar a solicitação de amizade" });
  }
};

exports.ranking = async (req, res) => { 
    const { Cod_Escolar } = req.query;
  
    if (!Cod_Escolar) {
      return res
        .status(400)
        .json({ error: "ID da Instituição é indispensável." });
    }
  
    try {
      const result = await utilsModel.ranking({ Cod_Escolar });
      res.status(200).json(result);
      console.table(result);
    } catch (err) {
      console.error("Erro ao buscar o ranking:", err);
      res.status(500).json({ error: "Erro ao buscar o ranking" });
    }
  };
  

exports.rankingMyFriends = async (req, res) => {
  const { Cod_Escolar, id_aluno} = req.query;

  if (!Cod_Escolar || !id_aluno) {
    return res
      .status(400)
      .json({ error: "ID da Instituição ou ID do aluno é indispensável." });
  }

  try {
    const result = await utilsModel.rankingMyFriends({ Cod_Escolar, id_aluno });
    res.status(200).json(result);
    console.table(result);
  } catch (err) {
    console.error("Erro ao buscar o ranking:", err);
    res.status(500).json({ error: "Erro ao buscar o ranking" });
  }
}

exports.addAchivementUser = async (req, res) => {
  const { id_aluno, id_achivement } = req.body;

  if (!id_aluno || !id_achivement) {
    return res.status(400).json({ error: "Faltando id_aluno ou id_achivement" });
  }

  try {
    const result = await utilsModel.AddAchivementUser(id_aluno, id_achivement);
    res
      .status(201)
      .json({ message: "Achivement adicionado com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao adicionar o Achivement:", err);
    res.status(500).json({ error: "Erro ao adicionar o Achivement" });
  }
}

exports.NotAchivement = async (req, res) => {
  const { aluno_id } = req.query

  if (!aluno_id) {
    return res.status(400).json({ error: "Faltando id_aluno" });
  }

  try {
    const result = await utilsModel.NotAchivement(aluno_id);
    res
      .status(201)
      .json({ message: "Achivement adicionado com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao adicionar o Achivement:", err);
    res.status(500).json({ error: "Erro ao adicionar o Achivement" });
  }

}
exports.getContentForum = async (req, res) => {
  const { aluno_id } = req.query
  
  if (!aluno_id) {
    return res.status(400).json({ error: "Faltando id_aluno" });
  }

  try {
    const result = await utilsModel.getContentForum(aluno_id);
    res
      .status(201)
      .json({ message: "Posts buscadas com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao procurar Posts:", err);
    res.status(500).json({ error: "Erro ao procurar Posts" });
  }

}

