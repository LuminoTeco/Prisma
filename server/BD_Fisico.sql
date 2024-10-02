CREATE DATABASE IF NOT EXISTS prisma;
USE prisma;

CREATE TABLE registerUnits(
    Cod_Escolar INT PRIMARY KEY UNIQUE, 
    NameInstitute VARCHAR(150) NOT NULL,
    emailInstitute VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    qtdStudents INT NOT NULL, 
    pwd VARCHAR(50) NOT NULL 
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

CREATE TABLE tb_adm (
    adm_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    cargo VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(8) NOT NULL,
    instituicao_id_fk INT NOT NULL,
    CONSTRAINT FK_instituicao_adm FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar)
);

CREATE TABLE tb_alunos (
    aluno_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(8) NOT NULL,
    ano_serie INT NOT NULL,
    nivel VARCHAR(3) NOT NULL,
    data_cadastro DATETIME NOT NULL,
    foto_perfil VARCHAR(100) NOT NULL, 
    turma_id_fk INT NOT NULL,
    instituicao_id_fk INT NOT NULL,
    conquistas_id_fk INT,
    CONSTRAINT FK_turma_aluno FOREIGN KEY (turma_id_fk) REFERENCES tb_turmas(turma_id),
    CONSTRAINT FK_instituicao_aluno FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar),
    CONSTRAINT FK_conquista_aluno FOREIGN KEY (conquistas_id_fk) REFERENCES tb_conquistas(conquista_id)
);

CREATE TABLE tb_disciplina (
    disciplina_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE tb_chat (
    chat_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    aluno1_id_fk INT NOT NULL,
    aluno2_id_fk INT NOT NULL,
    CONSTRAINT FK_aluno_chat1 FOREIGN KEY (aluno1_id_fk) REFERENCES tb_alunos(aluno_id),
    CONSTRAINT FK_aluno_chat2 FOREIGN KEY (aluno2_id_fk) REFERENCES tb_alunos(aluno_id)
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
    senha VARCHAR(8) NOT NULL,
    pontuacao_max INT NOT NULL,
    disciplina_id_fk INT NOT NULL,
    progresso_id_fk INT,
    CONSTRAINT FK_disciplina_tarefas FOREIGN KEY (disciplina_id_fk) REFERENCES tb_disciplina(disciplina_id),
    CONSTRAINT FK_progresso_tarefas FOREIGN KEY (progresso_id_fk) REFERENCES tb_progresso(progresso_id)
);

CREATE TABLE tb_mensagem (
    mensagem_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    conteudo VARCHAR(30) NOT NULL,
    data_envio DATETIME NOT NULL,
    remetente_id_fk INT NOT NULL,
    chat_id_fk INT NOT NULL,
    CONSTRAINT FK_chat_mensagem FOREIGN KEY (chat_id_fk) REFERENCES tb_chat(chat_id),
    CONSTRAINT FK_aluno_mensagem FOREIGN KEY (remetente_id_fk) REFERENCES tb_alunos(aluno_id)
);

CREATE TABLE tb_forum (
    post_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    titulo VARCHAR(30) NOT NULL,
    conteudo VARCHAR(50) NOT NULL,
    data_criacao DATETIME NOT NULL,
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
    CONSTRAINT FK_aluno1_amizade FOREIGN KEY (amigo1_id_fk) REFERENCES tb_alunos(aluno_id),
    CONSTRAINT FK_aluno2_amizade FOREIGN KEY (amigo2_id_fk) REFERENCES tb_alunos(aluno_id)
);

SHOW TABLES;
