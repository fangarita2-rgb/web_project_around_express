# Web Project Around Express

API REST desarrollada con **Node.js**, **Express**, **TypeScript** y **MongoDB**, que permite gestionar usuarios y tarjetas con operaciones CRUD completas y manejo centralizado de errores.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **Entorno de ejecución:** Node.js
- **Lenguaje:** TypeScript (Módulos ES)
- **Framework:** Express v5
- **Base de datos:** MongoDB con Mongoose
- **Herramientas de desarrollo:** `tsx`, `eslint`, `prettier`, `typescript-eslint`

---

## 📁 Estructura del Proyecto

web_project_around_express/
├── src/
│ ├── controllers/
│ │ ├── cards.ts
│ │ └── users.ts
│ ├── middleware/
│ │ └── error-handler.ts
│ ├── models/
│ │ ├── card.ts
│ │ └── user.ts
│ ├── routes/
│ │ ├── cards.ts
│ │ ├── index.ts
│ │ └── users.ts
│ ├── types/
│ │ └── express/
│ │ └── index.d.ts
│ └── app.ts
├── .editorconfig
├── .gitignore
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json

---

## 🔌 Rutas de la API

### Usuarios

| Método | Ruta               | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/users`           | Devuelve todos los usuarios      |
| GET    | `/users/me`        | Devuelve el usuario actual       |
| GET    | `/users/:id`       | Devuelve un usuario por su `_id` |
| POST   | `/users`           | Crea un nuevo usuario            |
| PATCH  | `/users/me`        | Actualiza el perfil del usuario  |
| PATCH  | `/users/me/avatar` | Actualiza el avatar del usuario  |

### Tarjetas

| Método | Ruta               | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/cards`           | Devuelve todas las tarjetas      |
| POST   | `/cards`           | Crea una nueva tarjeta           |
| DELETE | `/cards/:id`       | Elimina una tarjeta por su `_id` |
| PUT    | `/cards/:id/likes` | Da like a una tarjeta            |
| DELETE | `/cards/:id/likes` | Quita el like a una tarjeta      |

### Códigos de error

| Código | Descripción                                                                 |
| ------ | --------------------------------------------------------------------------- |
| 400    | Datos inválidos o `_id` con formato incorrecto                              |
| 404    | Recurso no encontrado — `{ "message": "Requested resource not found" }`     |
| 500    | Error del servidor — `{ "message": "Ha ocurrido un error en el servidor" }` |

---

## 📋 Funcionalidades Implementadas

### 1. Conexión a MongoDB

- Conexión a `mongodb://127.0.0.1:27017/aroundb` mediante Mongoose al iniciar la aplicación.

### 2. Modelos y Esquemas

- **User:** campos `name`, `about` (string, 2–30 caracteres) y `avatar` (URL validada con expresión regular), todos obligatorios.
- **Card:** campos `name` (string, 2–30 caracteres), `link` (URL validada), `owner` (ObjectId referencia a User), `likes` (array de ObjectId, vacío por defecto) y `createdAt` (fecha, valor por defecto `Date.now`).

### 3. Autorización Temporal

- Middleware que agrega `req.user._id` a cada petición, tipado correctamente mediante extensión de tipos en `src/types/express/index.d.ts`.

### 4. Campo `isLiked`

- Todas las rutas que devuelven tarjetas incluyen el campo booleano `isLiked`, calculado comparando el array `likes` con el `_id` del usuario actual.

### 5. Manejo Centralizado de Errores

- Middleware `errorHandler` registrado al final de la aplicación con cuatro parámetros (`err, req, res, next`).
- Los errores de validación y casteo de Mongoose se convierten automáticamente en respuestas `400`.
- Los errores inesperados responden con `500` ocultando el mensaje interno.
- Códigos de estado asignados de forma type-safe con `Object.assign`.

---

## 🚀 Comandos Principales

```bash
# Iniciar servidor en modo desarrollo con recarga automática
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Iniciar servidor compilado en producción
npm start

# Ejecutar el linter para verificación de código
npm run lint
```
