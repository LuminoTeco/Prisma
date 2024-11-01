const  utilsModel = require("../models/utilsModel");

exports.CreateMessagesForum = async (req, res) => {
    const { conteudo, aluno_id_fk } = req.body;

    try {
        const result = await utilsModel.CreateMessagesForum({ conteudo, aluno_id_fk });
        res.status(201).json({ message: "Mensagem criada com sucesso", id: result });
    } catch (err) {
        console.error("Erro ao criar a mensagem:", err);
        res.status(500).json({ Error: "Erro ao criar a mensagem" });
    }
}

exports.getMessagesForum = async (req, res) => {
    try {
        const messagesForum = await utilsModel.getMessagesForum()
        res.status(200).json(messagesForum);
    } catch (err) {
        console.error("Erro ao buscar as mensagens:", err);
        res.status(500).json({ Error: "Erro ao buscar as mensagens" });
    }
}