CREATE SCHEMA IF NOT EXISTS your_service;
USE your_service;

CREATE TABLE usuarios (
    id_usuarios INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL
);

CREATE TABLE oficios (
    id_oficios INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_oficio VARCHAR(100),
    sobre_mi VARCHAR(255)
);

CREATE TABLE perfiles (
    id_perfiles INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuarios INT NOT NULL,
    id_oficios INT NOT NULL,
    nombreyapellido VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    dni INT NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    estrabajador BOOLEAN NOT NULL,
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_usuarios),
    FOREIGN KEY (id_oficios) REFERENCES oficios(id_oficios)
);

INSERT INTO usuarios (usuario, contraseña) VALUES
("Ana123", "asdasd"),
("Juan123", "asdasd"),
("German123", "asdasd"),
("Cintia123", "asdasd");

INSERT INTO oficios (nombre_oficio, sobre_mi) VALUES
('Electricista', 'Soy Electricista hace 2 años'),
('Pintora', 'Soy Pintora');

INSERT INTO perfiles (id_usuarios, id_oficios, nombreyapellido, localidad, direccion, telefono, dni, email, estrabajador) VALUES
(1, 1, 'Ana Lopez', 'Olavarria', 'Necochea 123', '15546532', 35666123, 'analopez123@gmail.com', TRUE),
(2, 2, 'Juan Perez', 'Azul', 'Dorrego 123', '15546531', 35666111, 'JuanPerez123@gmail.com', FALSE),
(3, 1, 'German Gonzalez', 'Olavarria', 'Pringles 123', '15344534', 35666222, 'GermanGonzalez123@gmail.com', FALSE),
(4, 2, 'Cintia Keseler', 'Tandil', 'Urquiza 123', '15546231', 35661111, 'CK123@gmail.com', TRUE);

SELECT * FROM oficios;
