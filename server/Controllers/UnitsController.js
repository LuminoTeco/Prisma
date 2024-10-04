const { body, validationResult } = require("express-validator");
const InstituteModel = require("../models/InstituteModel");
const db = require("../models/mysql/db");
const bcrypt = require("bcrypt");

const secret = "ECKSWG";

const createInstituteValidator = [
  body("Cod_Escolar").notEmpty().withMessage("O código escolar é obrigatório"),
  body("NameInstitute")
    .notEmpty()
    .withMessage("O nome do instituto é obrigatório"),
  body("emailInstitute").isEmail().withMessage("Email inválido"),
  body("city").notEmpty().withMessage("A cidade é obrigatória"),
  body("qtdStudents")
    .isInt({ min: 0 })
    .withMessage(
      "A quantidade de estudantes deve ser um número inteiro não negativo"
    ),
  body("password").notEmpty().withMessage("A senha é obrigatória"),
];

exports.createInstitute = [
  createInstituteValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Hash da senha
      const hash = await bcrypt.hash(req.body.password.toString(), 10);

      const newInstitute = {
        Cod_Escolar: req.body.Cod_Escolar,
        NameInst: req.body.NameInstitute,
        emailInstitute: req.body.emailInstitute,
        city: req.body.city,
        qtdStudents: req.body.qtdStudents,
        pwd: hash,
      };

      const result = await InstituteModel.createInstitute(newInstitute);
      res.status(201).json(result);
    } catch (err) {
      console.error("Erro ao criar o instituto:", err);
      res.status(500).json({ Error: "Erro ao criar o instituto" });
    }
  },
];

exports.login = async (req, res) => {
  const {emailInstitute, password} = req.body;

  try {
    const user = await InstituteModel.getInstituteUser(emailInstitute);
    if(!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const paswMathc = await bcrypt.compare(password, user.pwd);
    if(!paswMathc) {
      return res.status(401).json({ message: "Email ou senha inválido" });
    }

    req.session.user = {
      name: user.NameInstitute, 
      email: user.emailInstitute,
      city: user.city,
      id: user.Cod_Escolar
    } 

    return res.json({ message: "Login bem-sucedido!", user: req.session.user});
  } catch (err) {
    console.error("erro", err)
    return res.status(500).json9({ message: "Erro interno" })
  }
}

exports.logout = (req, res) => {
  // Verifica se existe uma sessão ativa
  if (req.session) {
    // Destrói a sessão
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Erro ao realizar logout');
      } else {
        res.clearCookie('connect.sid'); 
        return res.status(200).send({ message: 'Logout realizado com sucesso' });
      }
    });
  } else {
    return res.status(400).send({ message: 'Nenhuma sessão ativa encontrada' });
  }
};


//Class

const createClassValidator = [
  body("nome_turma").notEmpty().withMessage("O nome da turma é obrigatório"),
  body("ano_letivo").notEmpty().withMessage("O ano letivo é obrigatório"),
  body("instituicao_id_fk")
    .notEmpty()
    .withMessage("A instituição é obrigatória"),
];

exports.createClass = [
  createClassValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome_turma, ano_letivo, instituicao_id_fk } = req.body;

      const [instituicao] = await db.query(
        "SELECT COUNT(*) AS count FROM registerUnits WHERE Cod_Escolar = ?",
        [instituicao_id_fk]
      );

      if (
        !instituicao ||
        !Array.isArray(instituicao) ||
        instituicao.length === 0
      ) {
        return res.status(400).json({ error: "Instituição não existe." });
      }

      if (instituicao[0].count === 0) {
        return res.status(400).json({ error: "Instituição não existe." });
      }

      const newClass = {
        nome_turma: nome_turma,
        ano_letivo: ano_letivo,
        instituicao_id_fk: instituicao_id_fk,
      };

      const result = await InstituteModel.createClass(newClass);
      res.status(201).json(result);
    } catch (err) {
      console.error("Erro ao criar a turma:", err);
      res.status(500).json({ Error: "Erro ao criar a turma" });
    }
  },
];

