CREATE DATABASE IF NOT EXISTS prisma;
USE prisma;

CREATE TABLE registerUnits (
    Cod_Escolar INT PRIMARY KEY UNIQUE,
    NameInstitute VARCHAR(150) NOT NULL UNIQUE,
    emailInstitute VARCHAR(150) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL,
    qtdStudents INT NOT NULL,
    pwd VARCHAR(100) NOT NULL
);

CREATE TABLE tb_turmas (
    turma_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome_turma VARCHAR(30) NOT NULL,
    ano_letivo INT,
    instituicao_id_fk INT NOT NULL,
    CONSTRAINT FK_instituicao_turma FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar)
);

CREATE TABLE tb_conquistas (
    conquista_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    descricao VARCHAR(70) NOT NULL,
    requisito VARCHAR(70) NOT NULL
);

INSERT INTO tb_conquistas (descricao, requisito) VALUES
('Ao amanhecer', 'Realizar uma atividade antes das 8:00 da manhã'),
('Primeira tarefa', 'Fez sua primeira atividade dentro da plataforma'),
('Noite produtiva', 'Realizar uma atividade após as 22:00 da noite');

CREATE TABLE tb_adm (
    adm_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    cargo VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    instituicao_id_fk INT NOT NULL,
    CONSTRAINT FK_instituicao_adm FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar)
);

CREATE TABLE tb_disciplina (
    disciplina_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO tb_disciplina (nome, descricao)
VALUES 
('matematica', 'Disciplina de Matemática básica e avançada'),
('portugues', 'Disciplina de Língua Portuguesa e Literatura'),
('Indefinido', 'É indefinido a matéria do usuário');

CREATE TABLE tb_alunos (
    aluno_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    ano_serie INT NOT NULL,
    nivel VARCHAR(3) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    foto_perfil VARCHAR(100) DEFAULT '/images/user/default_user.jpeg',
    turma_id_fk INT NOT NULL,
    instituicao_id_fk INT NOT NULL,
    disciplina_id_fk INT default 3,  
    xp INT DEFAULT 0,
    meta_xp INT DEFAULT 100,
    total_xp INT DEFAULT 0,
    total_atividades INT DEFAULT 0,
    CONSTRAINT FK_turma_aluno FOREIGN KEY (turma_id_fk) REFERENCES tb_turmas(turma_id),
    CONSTRAINT FK_instituicao_aluno FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar),
    CONSTRAINT FK_disciplina_aluno FOREIGN KEY (disciplina_id_fk) REFERENCES tb_disciplina(disciplina_id)
);

CREATE TABLE tb_alunos_conquistas (
    aluno_id_fk INT NOT NULL,
    conquista_id_fk INT NOT NULL,
    PRIMARY KEY (aluno_id_fk, conquista_id_fk),
    data_conquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_aluno_conquista FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id),
    CONSTRAINT FK_conquista_aluno FOREIGN KEY (conquista_id_fk) REFERENCES tb_conquistas(conquista_id)
);

CREATE TABLE tb_aluno_colaborador (
    colaborador_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,   
    aluno_id_fk INT NOT NULL,                                                              
    xp_colaborador INT DEFAULT 0,                                    
    CONSTRAINT FK_aluno_colaborador FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_progresso (
    progresso_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    conclusao DATETIME NOT NULL,
    tentativas INT NOT NULL,
    pontos INT NOT NULL,
    aluno_id_fk INT NOT NULL,
    disciplina_id_fk INT NOT NULL,
    CONSTRAINT FK_disciplina_progresso FOREIGN KEY (disciplina_id_fk) REFERENCES tb_disciplina(disciplina_id),
    CONSTRAINT FK_aluno_progresso FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_tarefas (
    tarefa_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    titulo VARCHAR(30) NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    nivel_dificuldade VARCHAR(10) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    pontuacao_max INT NOT NULL,
    disciplina_id_fk INT NOT NULL,
    progresso_id_fk INT,
    CONSTRAINT FK_disciplina_tarefas FOREIGN KEY (disciplina_id_fk) REFERENCES tb_disciplina(disciplina_id),
    CONSTRAINT FK_progresso_tarefas FOREIGN KEY (progresso_id_fk) REFERENCES tb_progresso(progresso_id)
);

CREATE TABLE tb_mensagem (
    mensagem_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    sender VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_envio DATETIME NOT NULL
);

CREATE TABLE tb_forum (
    post_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    conteudo VARCHAR(50) NOT NULL,
    data_criacao TIMESTAMP NOT NULL,
    aluno_id_fk INT NOT NULL,
    CONSTRAINT FK_aluno_forum FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_forum_resposta (
    resposta_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    conteudo VARCHAR(50) NOT NULL,
    data_criacao DATETIME NOT NULL,
    aluno_id_fk INT NOT NULL,
    post_id_fk INT NOT NULL,
    CONSTRAINT FK_post_forum_resposta FOREIGN KEY (post_id_fk) REFERENCES tb_forum(post_id),
    CONSTRAINT FK_aluno_forum_resposta FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_curtida (
    curtida_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    data_curtida DATETIME NOT NULL,
    aluno_id_fk INT NOT NULL,
    post_id_fk INT NOT NULL,
    CONSTRAINT FK_post_curtida FOREIGN KEY (post_id_fk) REFERENCES tb_forum(post_id),
    CONSTRAINT FK_aluno_curtida FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_amizade (
    amizade_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    data_amizade DATETIME NOT NULL,
    amigo1_id_fk INT NOT NULL,
    amigo2_id_fk INT NOT NULL,
    request ENUM('rejeitado', 'aceito', 'pendente') DEFAULT 'pendente',
    CONSTRAINT FK_aluno1_amizade FOREIGN KEY (amigo1_id_fk) REFERENCES tb_alunos(aluno_id),
    CONSTRAINT FK_aluno2_amizade FOREIGN KEY (amigo2_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_total_xp (
    aluno_id INT PRIMARY KEY,
    total_xp INT DEFAULT 0,
    FOREIGN KEY (aluno_id) REFERENCES tb_alunos(aluno_id)
);

-- Trigger para a metas de niveis do usuario
DELIMITER $$

CREATE TRIGGER atualizar_nivel
BEFORE UPDATE ON tb_alunos
FOR EACH ROW
BEGIN
   IF NEW.xp >= NEW.meta_xp THEN
      SET NEW.nivel = CAST(NEW.nivel AS UNSIGNED) + 1;
      SET NEW.xp = NEW.xp - NEW.meta_xp;
   END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER atualizar_total_xp
AFTER UPDATE ON tb_alunos
FOR EACH ROW
BEGIN

   IF NEW.xp <> OLD.xp THEN
   
      INSERT INTO tb_total_xp (aluno_id, total_xp)
      VALUES (NEW.aluno_id, NEW.xp)
      ON DUPLICATE KEY UPDATE total_xp = total_xp + (NEW.xp - OLD.xp);
   END IF;
END$$

DELIMITER ;

