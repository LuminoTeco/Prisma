const InstituteModel = require("../models/InstituteModel");
const bcrypt = require("bcrypt");

exports.createInstitute = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ Error: "Password is required" });
    }

    const hash = await bcrypt.hash(req.body.password.toString(), 10);

    const newInstitute = {
      NameInst: req.body.NameInstitute,
      emailInstitute: req.body.emailInstitute,
      city: req.body.city,
      CE: req.body.CE,
      qtdStudents: req.body.qtdStudents,
      pwd: hash,
    };

    const result = await InstituteModel.createInstitute(newInstitute);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao criar o instituto:", err);
    res.status(500).json({ Error: "Erro ao criar o instituto" });
  }
};

exports.login = async (req, res) => {
  const { emailInstitute, password } = req.body;

  // Validação básica
  if (!emailInstitute || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const user = await InstituteModel.getInstituteUser(emailInstitute);

    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await bcrypt.compare(password, user.pwd))) {
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }

    res.json({ message: "Login bem-sucedido", user: user.NameInstitute });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};