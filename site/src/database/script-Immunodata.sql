CREATE DATABASE immunoData;
USE immunoData;

CREATE TABLE cidades (
    codigoIbge INT PRIMARY KEY,
    nome VARCHAR(90) NOT NULL,
    qtdPopulacional FLOAT(6,1)
);

CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(90) NOT NULL,
    dataNascimento DATE NOT NULL,
    cargoExercido VARCHAR(45),
    numConselho CHAR(5) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkCidadeResidente INT,
    CONSTRAINT fk_usuarios_cidades FOREIGN KEY (fkCidadeResidente) REFERENCES cidades(codigoIbge)
);

CREATE TABLE doencas (
    idDoenca INT PRIMARY KEY AUTO_INCREMENT,
    nomeDoenca VARCHAR(45) NOT NULL,
    nomeVacina VARCHAR(45) NOT NULL
);

CREATE TABLE ocorrencias (
    fkDoenca INT,
    fkCidade INT,
    anoReferencia YEAR NOT NULL,
    quantidadeCasos INT NOT NULL,
    coberturaVacinal DOUBLE,
    PRIMARY KEY (fkDoenca, fkCidade, anoReferencia),
    CONSTRAINT fk_ocorrencia_doenca FOREIGN KEY (fkDoenca) REFERENCES doencas(idDoenca),
    CONSTRAINT fk_ocorrencia_cidade FOREIGN KEY (fkCidade) REFERENCES cidades(codigoIbge)
);

CREATE TABLE logsEtl (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(100) NOT NULL,
    dataHora DATETIME NOT NULL,
    detalhes VARCHAR(200),
    classeQueOcorreu VARCHAR(100)
);