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
    CONSTRAINT FK_turma_aluno FOREIGN KEY (turma_id_fk) REFERENCES tb_turmas(turma_id),
    CONSTRAINT FK_instituicao_aluno FOREIGN KEY (instituicao_id_fk) REFERENCES registerUnits(Cod_Escolar),
    CONSTRAINT FK_disciplina_aluno FOREIGN KEY (disciplina_id_fk) REFERENCES tb_disciplina(disciplina_id)
);

ALTER TABLE tb_alunos ADD COLUMN xp INT DEFAULT 0 AFTER nivel;

DESC tb_alunos;

-- Tabela de junção para associar alunos a conquistas
CREATE TABLE tb_alunos_conquistas (
    aluno_id_fk INT NOT NULL,
    conquista_id_fk INT NOT NULL,
    PRIMARY KEY (aluno_id_fk, conquista_id_fk),
    CONSTRAINT FK_aluno_conquista FOREIGN KEY (aluno_id_fk) REFERENCES tb_alunos(aluno_id),
    CONSTRAINT FK_conquista_aluno FOREIGN KEY (conquista_id_fk) REFERENCES tb_conquistas(conquista_id)
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

ALTER TABLE tb_forum
CHANGE COLUMN datastamp data_criacao TIMESTAMP;

desc tb_forum;

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

/*Request para determinar o status do pedido da amizade*/

 INSERT INTO tb_amizade (amigo1_id_fk, amigo2_id_fk, data_amizade) VALUES (?, ?, NOW());	

 
 SELECT * FROM tb_amizade WHERE amigo1_id_fk = 2 AND request = 'pendente';

ALTER TABLE tb_amizade MODIFY COLUMN data_amizade TIMESTAMP;

ALTER TABLE tb_amizade MODIFY COLUMN request ENUM('rejeitado', 'aceito', 'pendente') DEFAULT 'pendente';

ALTER TABLE tb_amizade ADD COLUMN request ENUM('rejeitado', 'aceito', 'pendente');
DESC tb_amizade;

DELETE FROM tb_amizade WHERE amizade_id = 4;

SHOW TABLES;

SELECT * FROM registerUnits;
SELECT * FROM tb_turmas;
SELECT * FROM tb_alunos;
SELECT * FROM tb_disciplina;
SELECT * FROM tb_conquistas;

SELECT * FROM tb_alunos WHERE aluno_id IN (1, 4);

SELECT * FROM tb_forum WHERE aluno_id_fk = 1;

SELECT 
    ru.Cod_Escolar AS instituicao_id_fk, 
    t.turma_id AS turma_id_fk,
    t.nome_turma,
    t.ano_letivo
FROM 
    registerUnits ru
JOIN 
    tb_turmas t ON ru.Cod_Escolar = t.instituicao_id_fk;

SELECT * FROM tb_turmas WHERE instituicao_id_fk = 215;

SELECT * FROM tb_alunos;

SELECT 
    a.aluno_id,
    a.nome AS nome_aluno,
    ru.Cod_Escolar AS instituicao_id_fk, 
    ru.NameInstitute AS nome_instituicao,
    t.turma_id AS turma_id_fk,
    t.nome_turma
FROM 
    tb_alunos a
JOIN 
    tb_turmas t ON a.turma_id_fk = t.turma_id
JOIN 
    registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar;
    
SELECT d.nome
FROM tb_alunos a
JOIN tb_disciplina d ON a.disciplina_id_fk = d.disciplina_id
WHERE a.aluno_id = 1;

/*Sem foto de perfil*/

SELECT 
    a.nome, 
    f.conteudo
FROM 
    tb_forum f
JOIN 
    tb_alunos a ON f.aluno_id_fk = a.aluno_id
ORDER BY 
    f.data_criacao ASC;

/*Com foto de perfil incluida*/

SELECT 
    a.nome, 
    a.foto_perfil,
    f.conteudo
FROM 
    tb_forum f
JOIN 
    tb_alunos a ON f.aluno_id_fk = a.aluno_id
ORDER BY 
    f.data_criacao ASC;


SELECT 
    a.nome, 
    a.email, 
    a.ano_serie, 
    a.nivel, 
    a.data_cadastro, 
    a.foto_perfil, 
    ru.NameInstitute AS nome_instituicao, 
    c.descricao AS nome_conquista,
    d.nome AS nome_disciplina
FROM 
    tb_alunos a
LEFT JOIN 
    registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar
LEFT JOIN 
    tb_alunos_conquistas ac ON a.aluno_id = ac.aluno_id_fk
LEFT JOIN 
    tb_conquistas c ON ac.conquista_id_fk = c.conquista_id
LEFT JOIN 
    tb_disciplina d ON a.disciplina_id_fk = d.disciplina_id
WHERE 
    a.aluno_id = 1;
    
/*Faz a consulta nas pessoas que estão cadastradas na mesma instuição, mas retira o id da pessoa que pesquisa ex: 1*/
SELECT 
    a.nome AS nome_aluno
FROM 
    tb_alunos a
JOIN 
    registerUnits ru ON a.instituicao_id_fk = ru.Cod_Escolar
WHERE 
    a.instituicao_id_fk = (SELECT instituicao_id_fk FROM tb_alunos WHERE aluno_id = 1)
    AND a.aluno_id <> 1;

SELECT 
    a1.nome AS nome_enviado,
    a2.nome AS nome_recebido,
    ta.*  -- Isso inclui todos os campos da tabela tb_amizade
FROM 
    tb_amizade ta
JOIN 
    tb_alunos a1 ON ta.amigo1_id_fk = a1.aluno_id  -- Corrigido para aluno_id
JOIN 
    tb_alunos a2 ON ta.amigo2_id_fk = a2.aluno_id  -- Corrigido para aluno_id
WHERE 
    ta.amigo2_id_fk = 1
    AND ta.request = 'pendente';

