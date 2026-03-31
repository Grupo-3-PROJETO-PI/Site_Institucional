CREATE TABLE empresa_parceira(
	id_empresa_parceira INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(45) NOT NULL,
	cnpj VARCHAR(45) NOT NULL,
	endereco_sede VARCHAR(300) NOT NULL
);

CREATE TABLE franquia(
	id_franquia INT, 
	nome VARCHAR(45) NOT NULL,
	endereco VARCHAR(45) NOT NULL,
	fk_empresa INT,
	CONSTRAINT chave_composta PRIMARY KEY (id_franquia, fk_empresa),
	CONSTRAINT ctFkFranquiaEmpresa FOREIGN KEY (fk_empresa) REFERENCES empresa_parceira(id_empresa_parceira)
);

CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL,
	nivel_acesso VARCHAR(45) NOT NULL,
	fk_empresa_parceira INT NOT NULL,
	CONSTRAINT ctFkUsuarioEmpresa FOREIGN KEY(fk_empresa_parceira) REFERENCES empresa_parceira(id_empresa_parceira),
	CONSTRAINT ctNivelAcesso CHECK (nivel_acesso IN ('ADMIN','OPERADOR'))
);

CREATE TABLE ponto_monitoramento (
	id_ponto_monitoramento INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	fk_franquia INT NOT NULL,
	CONSTRAINT ctFkPontoFranquia FOREIGN KEY(fk_franquia) REFERENCES franquia(id_franquia)
);

CREATE TABLE sensor(
	id_sensor INT PRIMARY KEY AUTO_INCREMENT,
	fk_ponto INT NOT NULL,
	status VARCHAR(45),
	CONSTRAINT ctFkSensorPonto FOREIGN KEY (fk_ponto) REFERENCES ponto_monitoramento(id_ponto_monitoramento),
	CONSTRAINT ctStatus CHECK (status IN ('ATIVO','DESATIVADO'))
);

CREATE TABLE dado_captado(
	id_dado_captado INT PRIMARY KEY AUTO_INCREMENT,
	fk_sensor INT NOT NULL,
	data_hora DATETIME,
	quantidade_pessoas INT,
	CONSTRAINT ctFkDadoSensor FOREIGN KEY(fk_sensor) REFERENCES sensor(id_sensor)
);

INSERT INTO empresa_parceira (razao_social, cnpj, endereco_sede) VALUES
('Tech Solutions LTDA', '12345678000101', 'São Paulo - SP'),
('Inova Sistemas SA', '22345678000102', 'Campinas - SP'),
('Global Tech LTDA', '32345678000103', 'Rio de Janeiro - RJ'),
('NextGen Tecnologia', '42345678000104', 'Belo Horizonte - MG'),
('Alpha Sistemas', '52345678000105', 'Curitiba - PR');

INSERT INTO franquia (nome, endereco, fk_empresa) VALUES
('Franquia Centro', 'Centro SP', 1),
('Franquia Norte', 'Zona Norte SP', 2),
('Franquia Sul', 'Zona Sul SP', 3),
('Franquia Leste', 'Zona Leste SP', 4),
('Franquia Oeste', 'Zona Oeste SP', 5);

INSERT INTO usuario (email, senha, nivel_acesso, fk_empresa_parceira) VALUES
('admin1@empresa.com', '123456', 'ADMIN', 1),
('operador1@empresa.com', '123456', 'OPERADOR', 1),
('admin2@empresa.com', '123456', 'ADMIN', 2),
('operador2@empresa.com', '123456', 'OPERADOR', 3),
('admin3@empresa.com', '123456', 'ADMIN', 4);

INSERT INTO ponto_monitoramento (nome, fk_franquia) VALUES
('Entrada Principal', 1),
('Saída Principal', 2),
('Corredor A', 3),
('Corredor B', 4),
('Caixa 1', 5);

INSERT INTO sensor (fk_ponto, status) VALUES
(1, 'ATIVO'),
(2, 'ATIVO'),
(3, 'DESATIVADO'),
(4, 'ATIVO'),
(5, 'DESATIVADO');

INSERT INTO dado_captado (fk_sensor, data_hora, quantidade_pessoas) VALUES
(1, '2026-03-29 10:00:00', 15),
(2, '2026-03-29 10:05:00', 20),
(3, '2026-03-29 10:10:00', 5),
(4, '2026-03-29 10:15:00', 30),
(5, '2026-03-29 10:20:00', 12);

SELECT * FROM sensor;
SELECT * FROM ponto_monitoramento;
SELECT * FROM usuario;
SELECT * FROM dado_captado;
SELECT * FROM empresa_parceira;
SELECT * FROM franquia;

