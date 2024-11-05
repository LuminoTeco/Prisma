const { body, validationResult } = require("express-validator");
const StudentModel = require("../models/StudentModels");
const bcrypt = require("bcrypt");
const uploadSingleImage = require("../middlewares/Upload");

// Validações para criar estudante
const createStudentValidator = [
  body("nome").notEmpty().withMessage("O nome do estudante é obrigatório"),
  body("email").isEmail().withMessage("Email inválido"),
  body("senha").notEmpty().withMessage("A senha é obrigatória"),
  body("ano_serie").notEmpty().withMessage("O ano de série é obrigatório"),
  body("nivel").notEmpty().withMessage("O nível é obrigatório"),
  body("instituicao_id_fk").notEmpty().withMessage("A instituição é obrigatória"),
  body("turma_id_fk").notEmpty().withMessage("A turma é obrigatória"),
];

exports.createStudent = [
  uploadSingleImage, 
  ...createStudentValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Hash da senha
      const hash = await bcrypt.hash(req.body.senha.toString(), 10);
      const foto_perfil = req.file ? req.file.filename : "default_user.jpg";
      const newStudent = {
        nome: req.body.nome,
        email: req.body.email,
        senha: hash,
        ano_serie: req.body.ano_serie,
        nivel: req.body.nivel,
        foto_perfil: foto_perfil,
        instituicao_id_fk: req.body.instituicao_id_fk,
        turma_id_fk: req.body.turma_id_fk,
      };

      const result = await StudentModel.createStudent(newStudent);
      res.status(201).json({
        message: "Estudante criado com sucesso",
        id: result.aluno_id,
        foto_perfil: `images/${foto_perfil}`,
      });
    } catch (err) {
      console.error("Erro ao criar o estudante:", err);
      res.status(500).json({ error: "Erro ao criar o estudante" });
    }
  },
];

exports.LoginStudents = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const student = await StudentModel.LoginStudent(email);

    if (!student) {
      return res.status(404).json({ message: "Estudante não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(senha, student.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    req.session.user = {
      name: student.nome,
      email: student.email,
      nivel: student.nivel,
      foto_perfil: student.foto_perfil,
      conquistas: student.conquistas_id_fk,
    };

    return res
      .status(200)
      .json({ message: "Login realizado com sucesso", student });
  } catch (err) {
    console.error("Erro no login do estudante:", err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const results = await StudentModel.getStudents(req.params.turma_id_fk);
    res.status(200).json(results);
  } catch (err) {
    console.error("Erro ao buscar os estudantes:", err);
    res.status(500).json({ Error: "Erro ao buscar os estudantes" });
  }
};

exports.UpdateStudent = async (req, res) => {
  const {
    aluno_id,
    nome,
    email,
    senha,
    ano_serie,
    nivel,
    turma_id_fk,
    instituicao_id_fk,
  } = req.body;

  if (!aluno_id) {
    return res.status(400).json({ Error: "ID do aluno é necessário" });
  }

  try {
    let hashedPassword;
    if (senha) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(senha, saltRounds);
    }

    const result = await StudentModel.UpdateStudent({
      aluno_id,
      nome,
      email,
      senha: hashedPassword,
      ano_serie,
      nivel,
      turma_id_fk,
      instituicao_id_fk,
    });
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Error: "Estudante não encontrado ou não atualizado" });
    }

    res
      .status(200)
      .json({ message: "Estudante atualizado com sucesso", result });
  } catch (err) {
    console.error("Erro ao atualizar o estudante:", err);
    res.status(500).json({ Error: "Erro ao atualizar o estudante" });
  }
};

exports.UpdateStudentPhoto = (req, res) => {
  const { aluno_id } = req.params;

  if (!aluno_id) {
    return res.status(400).json({ Error: "ID do estudante é obrigatório" });
  }

  if (!req.file) {
    return res.status(400).json({ Error: "Nenhuma imagem foi enviada" });
  }

  const foto_perfil = `/images/${req.file.filename}`; 

  StudentModel.UpdateStudentPhoto(foto_perfil, aluno_id)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Error: "Estudante não encontrado ou não atualizado" });
      }
      res.status(200).json({
        message: "Foto do estudante atualizada com sucesso",
        filePath: foto_perfil,
      });
    })
    .catch((err) => {
      console.error("Erro ao atualizar o estudante:", err);
      res.status(500).json({ Error: "Erro ao atualizar o estudante" });
    });
};


exports.UpdateStudentSubject = async (req, res) => {
  const { disciplina_id_fk, aluno_id } = req.body;

  if (!aluno_id || !disciplina_id_fk) {
    return res
      .status(400)
      .json({ Error: "ID do estudante e da disciplina são obrigatórios" });
  }

  try {
    const result = await StudentModel.UpdateStudentSubject(
      aluno_id,
      disciplina_id_fk
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Error: "Estudante não encontrado ou não atualizado" });
    }

    res
      .status(200)
      .json({ message: "Estudante atualizado com sucesso", result });
  } catch (err) {
    console.error("Erro ao atualizar o estudante:", err);
    res.status(500).json({ Error: "Erro ao atualizar o estudante" });
  }
};

exports.SelectSubject = async (req, res) => {
  const { aluno_id } = req.params;

  if (!aluno_id) {
    return res.status(400).json({ Error: "ID do estudante é obrigatório" });
  }
  try {
    const result = await StudentModel.selectSubjects(aluno_id);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ Error: "Estudante não possui disciplina associada" });
    }

    res
      .status(200)
      .json({ message: "Disciplinas selecionadas com sucesso", result });
  } catch (err) {
    console.error("Erro ao selecionar as disciplinas:", err);
    res.status(500).json({ Error: "Erro ao selecionar as disciplinas" });
  }
};

exports.allInformationUser = async (req, res) => {
  const { aluno_id } = req.params;

  if (!aluno_id) {
    return res.status(400).json({ Error: "ID do estudante é obrigatório" });
  }

  try {
    const result = await StudentModel.allInfomationUser(aluno_id);
    if (result.length === 0) {
      return res.status(404).json({ Error: "Estudantes não encontrado" });
    }

    res.status(200).json({ message: "Informações do estudante", result });
  } catch (err) {
    console.error("Erro ao buscar as informações do estudante:", err);
    res
      .status(500)
      .json({ Error: "Erro ao buscar as informações do estudante" });
  }
};

exports.allStudentsByNameInvite = async (req, res) => {
  const { aluno_id } = req.params
  
  if (!aluno_id) {
    return res.status(400).json({ Error: "ID do estudante é obrigatório" });
  }

  try {
    const result = await StudentModel.allStudentsByNameInvite(aluno_id)
    if(result.length === 0) {
      return res.status(404).json({ Error: "Estudantes não encontrado" });
    }

    res.status(200).json({ message: "Informações do estudante", result });
  } catch (err) {
    console.error("Erro ao buscar as informações do estudante:", err);
    res
      .status(500)
      .json({ Error: "Erro ao buscar as informações do estudante" });
  }
}

