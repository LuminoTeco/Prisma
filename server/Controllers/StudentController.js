const { body, validationResult } = require("express-validator");
const StudentModel = require("../models/StudentModels");
const bcrypt = require("bcrypt");

const secret = "ECKSWG";

const createStudentValidator = [
    body("nome").notEmpty().withMessage("O nome do estudante é obrigatorio"),
    body("email").isEmail().withMessage("Email inválido"),
    body("senha").notEmpty().withMessage("A senha é obrigatória"),
    body("ano_serie").notEmpty().withMessage("O ano de seção é obrigatorio"),
    body("nivel").notEmpty().withMessage("O nivel é obrigatorio"),
    body("instituicao_id_fk").notEmpty().withMessage("A instituição é obrigatoria"),
    body("turma_id_fk").notEmpty().withMessage("A turma é obrigatoria"),   
]

exports.createStudent = [
    createStudentValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Hash da senha
            const hash = await bcrypt.hash(req.body.senha.toString(), 10);
            const newStudent = {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash,
                ano_serie: req.body.ano_serie,
                nivel: req.body.nivel,
                instituicao_id_fk: req.body.instituicao_id_fk,
                turma_id_fk: req.body.turma_id_fk
            };

            const result = await StudentModel.createStudent(newStudent);
            res.status(201).json({ message: "Estudante criado com sucesso", id: result.aluno_id });
        } catch (err) {
            console.error("Erro ao criar o estudante:", err);
            res.status(500).json({ error: "Erro ao criar o estudante" });
        }
    }
]; 

exports.LoginStudents = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontre o estudante pelo email
        const student = await StudentModel.LoginStudent(email);
        
        // Verifique se o estudante existe
        if (!student) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }

        // Verifique a senha
        const isPasswordValid = await bcrypt.compare(senha, student.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Armazene os dados do estudante na sessão
        req.session.user = {
            name: student.nome, 
            email: student.email, 
            nivel: student.nivel, 
            foto_perfil: student.foto_perfil, 
            conquistas: student.conquistas_id_fk 
        };

        return res.status(200).json({ message: 'Login realizado com sucesso', student });
    } catch (err) {
        console.error('Erro no login do estudante:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


exports.getStudents = async (req, res) =>  {
    try {
        const results = await StudentModel.getStudents(req.params.turma_id_fk)
        res.status(200).json(results)
    } catch (err) {
        console.error("Erro ao buscar os estudantes:", err)
        res.status(500).json({ Error: "Erro ao buscar os estudantes" })
    }
}

exports.UpdateStudent = async (req, res) => {
    const { aluno_id, nome, email, senha, ano_serie, nivel, turma_id_fk, instituicao_id_fk } = req.body;

    // Verifica se o ID do aluno está presente
    if (!aluno_id) {
        return res.status(400).json({ Error: "ID do aluno é necessário" });
    }

    try {
        // Verifica se uma nova senha foi fornecida e realiza o hash
        let hashedPassword;
        if (senha) {
            const saltRounds = 10; // Número de rounds de sal para o hash
            hashedPassword = await bcrypt.hash(senha, saltRounds);
        }

        // Atualiza o aluno no banco de dados
        const result = await StudentModel.UpdateStudent({
            aluno_id,
            nome,
            email,
            senha: hashedPassword, // Passa a senha hash, se fornecida
            ano_serie,
            nivel,
            turma_id_fk,
            instituicao_id_fk
        });

        // Verifica se o resultado da atualização é válido
        if (result.affectedRows === 0) {
            return res.status(404).json({ Error: "Estudante não encontrado ou não atualizado" });
        }

        res.status(200).json({ message: "Estudante atualizado com sucesso", result });
    } catch (err) {
        console.error("Erro ao atualizar o estudante:", err);
        res.status(500).json({ Error: "Erro ao atualizar o estudante" });
    }
};
  