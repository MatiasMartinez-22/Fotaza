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



INSERT INTO roles(nombre)
VALUES
('usuario'),
('validador'),
('admin');