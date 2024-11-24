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
  const { Cod_Escolar, id_aluno } = req.query;

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
};

exports.addAchivementUser = async (req, res) => {
  const { id_aluno, id_achivement } = req.body;

  if (!id_aluno || !id_achivement) {
    return res
      .status(400)
      .json({ error: "Faltando id_aluno ou id_achivement" });
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
};

exports.NotAchivement = async (req, res) => {
  const { aluno_id } = req.query;

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
};
exports.getContentForum = async (req, res) => {
  const { aluno_id } = req.query;

  if (!aluno_id) {
    return res.status(400).json({ error: "Faltando id_aluno" });
  }

  try {
    const result = await utilsModel.getContentForum(aluno_id);
    res.status(201).json({ message: "Posts buscadas com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao procurar Posts:", err);
    res.status(500).json({ error: "Erro ao procurar Posts" });
  }
};

exports.InsertStudentColaborator = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Precisa-se do email" });
  }

  try {
    const result = await utilsModel.InsertStudentColaborator(email);
    res
      .status(201)
      .json({ message: "Colaborador inserido com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao procurar Posts:", err);
    res.status(500).json({ error: "Erro ao procurar Posts" });
  }
};

exports.verifyColaborator = async (req, res) => {
  const { aluno_id_fk } = req.query;

  if (!aluno_id_fk) {
    return res.status(400).json({ error: "Necessita-se id_aluno" });
  }

  try {
    const result = await utilsModel.verifyColaborator(aluno_id_fk);
    res.status(201).json({
      message: "Colaborador verificado com sucesso",
      id: result,
      isColaborator: result.isColaborator,
    });
  } catch (err) {
    console.error("Erro ao procurar Posts:", err);
    res.status(500).json({ error: "Erro ao procurar Posts" });
  }
};

exports.getXpColaborador = async (req, res) => {
  const { aluno_id_fk } = req.query;

  if (!aluno_id_fk) {
    return res.status(400).json({ error: "Necessita-se id_aluno" });
  }

  try {
    const result = await utilsModel.getXpColaborador(aluno_id_fk);
    res.status(201).json({ message: "Xp verificado com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao procurar Usuario:", err);
    res.status(500).json({ error: "Erro ao procurar Usuario" });
  }
};

exports.updateXpColaborador = async (req, res) => {
  const { aluno_id_fk, xp } = req.body;

  if (!aluno_id_fk || !xp) {
    return res.status(400).json({ error: "Necessita-se id_aluno e xp" });
  }

  try {
    const result = await utilsModel.updateXpColaborador(aluno_id_fk, xp);
    res.status(201).json({ message: "Xp verificado com sucesso", id: result });
  } catch (err) {
    console.error("Erro ao procurar Usuario:", err);
    res.status(500).json({ error: "Erro ao procurar Usuario" });
  }
};

exports.getAllColaborators = async (req, res) => {


  try {
    const result = await utilsModel.getAllColaborators();
    res
      .status(201)
      .json({ message: "Colaborador encontrado com sucesso", result });
  } catch (err) {
    console.error("Erro ao procurar Usuario:", err);
    res.status(500).json({ error: "Erro ao procurar Usuario" });
  }
};


exports.getMyFriends = async (req, res) => {
  const { aluno_id_fk } = req.query
  
  try {
    const friends = await utilsModel.getMyFriends(aluno_id_fk);
    res.status(200).json(friends);
  } catch (err) {
    console.error("Erro ao buscar os amigos:", err);
    res.status(500).json({ error: "Erro ao buscar os amigos" });
  }
}

exports.SendMessageFriends = async (req, res) => {
  const { conteudo, from_user, to_user } = req.body;

  // Verifique se os campos estão sendo enviados
  if (!conteudo || !from_user || !to_user) {
    console.error('Campos ausentes:', { conteudo, from_user, to_user });
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await utilsModel.SendMessageFriends(conteudo, from_user, to_user);

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Mensagem enviada com sucesso' });
    } else {
      console.error('Nenhuma linha foi afetada pelo INSERT.');
      return res.status(400).json({ message: 'Não foi possível enviar a mensagem' });
    }
  } catch (err) {
    console.error('Erro ao inserir as mensagens entre os amigos:', err);
    return res.status(500).json({ error: 'Erro ao inserir as mensagens' });
  }
};

exports.getMessageFriends = async (req, res) => {
  const { from_user, to_user } = req.query;

  if (!from_user || !to_user) {      
    console.error('Campos ausentes:', { from_user, to_user });
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  } 

  try {
    const result = await utilsModel.getMessageFriends(from_user, to_user);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao buscar as mensagens entre os amigos:', err);
    res.status(500).json({ error: 'Erro ao buscar as mensagens' });
  }
};
