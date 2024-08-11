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

exports.getAllInstitute = async (req, res) => {
  try {
    const institutes = await InstituteModel.getInstitueUser();
    res.status(200).json(institutes);
  } catch (err) {
    console.error("Erro ao procurar institutos:", err);
    res.status(500).json({ Error: "Erro ao procurar institutos" });
  }
};
