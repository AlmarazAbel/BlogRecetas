# 🍳 Blog de Recetas

Backend desarrollado como proyecto práctico para un curso de **Full Stack Web**, utilizando Node.js, Express, MongoDB y JWT.

El proyecto permite registrar usuarios, iniciar sesión y administrar recetas de cocina mediante una API REST.

## 👨‍💻 Autor

**Almaraz Abel**

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* morgan
* cors
* Nodemon

## 📋 Funcionalidades

### 👤 Usuarios

* Registro de usuarios.
* Validación de datos.
* Encriptación de contraseñas mediante bcrypt.
* Login.
* Generación de tokens JWT.
* Autenticación mediante middleware.

### 🍲 Recetas

* Listar todas las recetas.
* Obtener una receta por ID.
* Crear recetas.
* Modificar recetas.
* Eliminar recetas.
* Validación de los datos recibidos.
* Asociación de cada receta con el usuario que la creó.
* Control de permisos para modificar y eliminar recetas.

## 🔐 Autenticación

Las operaciones que requieren autenticación utilizan JWT.

Para acceder a las rutas protegidas se debe enviar el token mediante el encabezado:

```text
Authorization: Bearer TOKEN
```

## 📌 Endpoints

### Usuarios

| Método | Endpoint                 | Descripción          |
| ------ | ------------------------ | -------------------- |
| POST   | `/api/usuarios/registro` | Registrar un usuario |
| POST   | `/api/usuarios/login`    | Iniciar sesión       |

### Recetas

| Método | Endpoint           | Autenticación |
| ------ | ------------------ | ------------- |
| GET    | `/api/recetas`     | No            |
| GET    | `/api/recetas/:id` | No            |
| POST   | `/api/recetas`     | Sí            |
| PUT    | `/api/recetas/:id` | Sí            |
| DELETE | `/api/recetas/:id` | Sí            |

## 📁 Estructura del proyecto

```text
BlogRecetas/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── usuario.controller.js
│   │   └── receta.controller.js
│   │
│   ├── middlewares/
│   │   ├── validarUsuario.js
│   │   ├── validarReceta.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── usuario.model.js
│   │   └── receta.model.js
│   │
│   └── routes/
│       ├── usuario.routes.js
│       └── receta.routes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta:

```bash
cd BlogRecetas
```

Instalar las dependencias:

```bash
pnpm install
```

## 🔧 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=TU_CONEXION_DE_MONGODB
JWT_SECRET=TU_CLAVE_SECRETA
```

No subir el archivo `.env` al repositorio.

## ▶️ Ejecutar el proyecto

Para ejecutar en modo desarrollo:

```bash
pnpm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## 🧪 Pruebas

Los endpoints pueden probarse utilizando :

* Postman


## 🌿 Flujo de trabajo con Git

El proyecto utiliza ramas para organizar el desarrollo:

```text
main
  │
  └── dev
       │
       ├── feature/mongodb
       ├── feature/registro-usuarios
       ├── feature/login
       ├── feature/auth-middleware
       └── feature/recetas
```

Las funcionalidades se desarrollan en ramas `feature/*`, luego se integran en `dev` y finalmente `dev` se integra en `main`.

## 📚 Objetivo

Este proyecto fue desarrollado con fines educativos para practicar:

* Desarrollo de APIs REST.
* Node.js y Express.
* MongoDB y Mongoose.
* Modelado de datos.
* CRUD.
* Validaciones.
* Autenticación y autorización.
* JWT.
* Hashing de contraseñas.
* Manejo de ramas con Git y GitHub.

---

**Autor:** Almaraz Abel
**Proyecto:** Blog de Recetas

