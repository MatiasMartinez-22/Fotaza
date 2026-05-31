DROP TABLE IF EXISTS seguidores CASCADE;
DROP TABLE IF EXISTS valoraciones CASCADE;
DROP TABLE IF EXISTS comentarios CASCADE;
DROP TABLE IF EXISTS publicacion_etiquetas CASCADE;
DROP TABLE IF EXISTS etiquetas CASCADE;
DROP TABLE IF EXISTS imagenes CASCADE;
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;


CREATE TABLE roles (

    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL

);


CREATE TABLE usuarios (

    id_usuario SERIAL PRIMARY KEY,

    id_rol INTEGER NOT NULL,

    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    biografia TEXT,

    estado VARCHAR(20) DEFAULT 'activo',

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY(id_rol)
        REFERENCES roles(id_rol)

);


CREATE TABLE publicaciones (

    id_publicacion SERIAL PRIMARY KEY,

    id_usuario INTEGER NOT NULL,

    titulo VARCHAR(150) NOT NULL,

    descripcion TEXT,

    comentarios_cerrados BOOLEAN DEFAULT FALSE,

    estado VARCHAR(20) DEFAULT 'activa',

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_publicacion_usuario
        FOREIGN KEY(id_usuario)
        REFERENCES usuarios(id_usuario)

);


CREATE TABLE imagenes (

    id_imagen SERIAL PRIMARY KEY,

    id_publicacion INTEGER NOT NULL,

    nombre_original VARCHAR(255),

    mime_type VARCHAR(100),

    imagen_base64 TEXT,

    licencia VARCHAR(100),

    marca_agua_texto VARCHAR(255),

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_imagen_publicacion
        FOREIGN KEY(id_publicacion)
        REFERENCES publicaciones(id_publicacion)

);

CREATE TABLE etiquetas (
    id_etiqueta SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE publicacion_etiquetas (
    id_publicacion INTEGER NOT NULL,
    id_etiqueta INTEGER NOT NULL,

    PRIMARY KEY (id_publicacion, id_etiqueta),

    FOREIGN KEY (id_publicacion)
        REFERENCES publicaciones(id_publicacion)
        ON DELETE CASCADE,

    FOREIGN KEY (id_etiqueta)
        REFERENCES etiquetas(id_etiqueta)
        ON DELETE CASCADE
);

CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_imagen INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    texto TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_imagen)
        REFERENCES imagenes(id_imagen)
        ON DELETE CASCADE,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE valoraciones (
    id_valoracion SERIAL PRIMARY KEY,
    id_imagen INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (id_imagen, id_usuario),

    CHECK (valor >= 1 AND valor <= 5),

    FOREIGN KEY (id_imagen)
        REFERENCES imagenes(id_imagen)
        ON DELETE CASCADE,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE seguidores (
    id_seguidor INTEGER NOT NULL,
    id_seguido INTEGER NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_seguidor, id_seguido),

    CHECK (id_seguidor <> id_seguido),

    FOREIGN KEY (id_seguidor)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_seguido)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

INSERT INTO roles(nombre)
VALUES
('usuario'),
('validador'),
('admin');

INSERT INTO etiquetas(nombre)
VALUES
('naturaleza'),
('paisaje'),
('urbano'),
('retrato'),
('animales');