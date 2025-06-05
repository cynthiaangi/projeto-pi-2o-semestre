CREATE DATABASE IF NOT EXISTS immunodata;
USE immunodata;

CREATE TABLE cidades (
    codigoIbge BIGINT PRIMARY KEY,
    nome VARCHAR(90) NOT NULL,
    qtdPopulacional FLOAT
);

CREATE TABLE campanha (
	idCampanha INT PRIMARY KEY AUTO_INCREMENT,
	nomeCampanha VARCHAR(90) NOT NULL,
	dtCriacao DATE NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE cidadeCampanha (
        idCidadeCampanha INT PRIMARY KEY AUTO_INCREMENT,
        dtAdicionada DATE NOT NULL DEFAULT (CURRENT_DATE),
        fkCidadeCampanha_Cidade BIGINT,
        fkCidadeCampanha_Campanha INT,
        CONSTRAINT constraint_fkCidadeCampanha_Cidade FOREIGN KEY (fkCidadeCampanha_Cidade) REFERENCES cidades(codigoIbge),
        CONSTRAINT constraint_fkCidadeCampanha_Campanha FOREIGN KEY (fkCidadeCampanha_Campanha) REFERENCES campanha(idCampanha)
);

CREATE TABLE perfil (
	idPerfil INT PRIMARY KEY AUTO_INCREMENT,
	nomePerfil VARCHAR(30) NOT NULL,
	podeCadastrarPerfil BOOLEAN NOT NULL,
	podeCadastrarFuncionario BOOLEAN NOT NULL,
	podeCriarCampanha BOOLEAN NOT NULL
);

INSERT INTO perfil (nomePerfil, podeCadastrarPerfil, podeCadastrarFuncionario, podeCriarCampanha) VALUES
	("Administrador", TRUE, TRUE, TRUE),
	("Comum", FALSE, FALSE, FALSE);

CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(90) NOT NULL,
    dataNascimento DATE NOT NULL,
    cargoExercido VARCHAR(45),
    numConselho VARCHAR(5) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkCidadeResidente BIGINT,
    fkUsuarios_Perfil INT DEFAULT 2,
    CONSTRAINT fk_usuarios_cidades FOREIGN KEY (fkCidadeResidente) REFERENCES cidades(codigoIbge),
    CONSTRAINT constraint_fkUsuarios_Perfil FOREIGN KEY (fkUsuarios_Perfil) REFERENCES perfil(idPerfil)
);

CREATE TABLE doencas (
    idDoenca INT PRIMARY KEY AUTO_INCREMENT,
    nomeDoenca VARCHAR(45) NOT NULL,
    nomeVacina VARCHAR(45) NOT NULL
);

INSERT INTO doencas (nomeDoenca, nomeVacina) VALUES
("Coqueluche", "Pentavalente"),
("Meningite", "Meningocócica"),
("Poliomielite", "Vacina Oral Poliomielite - VOP");


CREATE TABLE ocorrencias (
	idOcorrencia INT primary key auto_increment,
	fkDoenca INT,
	fkCidade BIGINT,
	mesReferencia VARCHAR(40),
	anoReferencia YEAR NOT NULL,
	coberturaVacinal DOUBLE,
	CONSTRAINT fk_ocorrencia_doenca FOREIGN KEY (fkDoenca) REFERENCES doencas(idDoenca),
	CONSTRAINT fk_ocorrencia_cidade FOREIGN KEY (fkCidade) REFERENCES cidades(codigoIbge)
);

CREATE TABLE casos (
	idCaso INT PRIMARY KEY auto_increment,
	fkCasos_Doenca INT,
	fkCasos_Cidade BIGINT,
	anoReferencia YEAR NOT NULL,
	quantidadeCasos INT,
	CONSTRAINT constraint_fkCasos_Doenca FOREIGN KEY (fkCasos_Doenca) REFERENCES doencas(idDoenca),
	CONSTRAINT constraint_fkCasos_Cidade FOREIGN KEY (fkCasos_Cidade) REFERENCES cidades(codigoIbge)
);

CREATE TABLE logetl (
	idLog INT PRIMARY KEY AUTO_INCREMENT,
	status VARCHAR(3) NOT NULL,
	dataHora DATETIME NOT NULL,
	detalhes TEXT,
	metodoQueOcorreu VARCHAR(100),
	classeQueOcorreu VARCHAR(100),
	idDaExecucaoEtl VARCHAR(30)
);
