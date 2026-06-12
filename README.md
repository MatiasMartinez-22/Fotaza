# 📸 Fotaza

Aplicación web desarrollada para la materia **Programación Web II - Desarrollador de Software**.

---

# Usuarios de prueba

| Usuario | Email                                     | Contraseña |
| ------- | ----------------------------------------- | ---------- |
| Matías  | [matias@test.com](mailto:matias@test.com) | 123456     |
| Gisela  | [gise@test.com](mailto:gise@test.com)     | 123456     |

---

# Pasos para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar al proyecto

```bash
cd Fotaza
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Copiar el archivo `.env.example` a `.env` y completar los valores correspondientes.

### 5. Inicializar la base de datos

```bash
npm run db:init
```

### 6. Ejecutar la aplicación

```bash
npm start
```

La aplicación quedará disponible en:

```
http://localhost:3000
```

---

# Funcionalidades implementadas

*  Registro de usuarios
*  Inicio de sesión
*  Crear publicaciones con imágenes
*  Buscar publicaciones
*  Comentar publicaciones
*  Valorar publicaciones con estrellas
*  Seguir y dejar de seguir usuarios
*  Perfil de usuario

---

# Tecnologías utilizadas

* Node.js
* Express
* Pug
* PostgreSQL
* CSS
* express-session

---

# Variables de entorno

Las variables necesarias se encuentran en el archivo:

```
.env.example
```

---

# Autor

Matías Martínez

Universidad Nacional de La Punta

Programación Web II - Desarrollador de Software
