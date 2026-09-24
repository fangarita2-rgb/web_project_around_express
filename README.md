# Tripleten web_project_around_express

# Web Project Around Express

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **TypeScript**, que permite gestionar y consultar datos de usuarios y tarjetas desde archivos JSON de forma asíncrona.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **Entorno de ejecución:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express v5
- **Módulos nativos:** `node:fs/promises`, `node:path`
- **Herramientas de desarrollo:** `tsx`, `eslint`, `prettier`, `typescript-eslint`

---

## 📁 Estructura del Proyecto

```
web_project_around_express/
├── data/
│   ├── cards.json
│   └── users.json
├── src/
│   ├── controllers/
│   │   ├── cards.ts
│   │   └── users.ts
│   ├── routes/
│   │   ├── cards.ts
│   │   └── users.ts
│   └── app.ts
├── .editorconfig
├── .gitignore
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🔌 Rutas de la API

| Método     | Ruta               | Descripción                      | Respuesta de error                                        |
| ---------- | ------------------ | -------------------------------- | --------------------------------------------------------- |
| GET        | `/users`           | Lista JSON de todos los usuarios | —                                                         |
| GET        | `/users/:id`       | Usuario por ID                   | 404 `{ "message": "User ID not found" }`                  |
| GET        | `/cards`           | Lista JSON de todas las tarjetas | —                                                         |
| Cualquiera | Ruta inexistente   | —                                | 404 `{ "message": "Requested resource not found" }`       |
| Cualquiera | Error del servidor | —                                | 500 `{ "message": "An error has ocurred on the server" }` |

---

## 📋 Procedimiento Realizado

### 1. Configuración del Entorno y TypeScript

- Se inicializó la configuración de TypeScript (`tsconfig.json`) para trabajar con módulos ES (`"type": "module"`).
- Se definieron los directorios de entrada (`src/`) y salida (`dist/`).
- Se añadieron las definiciones de tipos necesarias (`@types/express`, `@types/node`).

### 2. Creación de Controladores Asíncronos

- Se implementaron controladores en `src/controllers/` utilizando funciones asíncronas (`async/await`).
- Se utilizó el módulo `node:fs/promises` para realizar la lectura no bloqueante de los archivos de datos (`cards.json` y `users.json`).
- Se empleó `path.join` junto con `import.meta.dirname` para construir rutas absolutas seguras hacia los archivos de datos.
- Se implementó manejo de errores con bloques `try...catch` para responder con código HTTP `500` en caso de fallos.

### 3. Definición de Rutas y Servidor

- Se estructuraron las rutas en `src/routes/` para separar la lógica de enrutamiento de los controladores.
- Se configuró la aplicación principal en `src/app.ts` para conectar las rutas y levantar el servidor en el puerto 3000.
- Se agregó un manejador global de rutas no encontradas (404).

### 4. Control de Calidad y Scripts

- Se configuró ESLint con `typescript-eslint` y `prettier` para mantener la calidad del código.
- Se agregaron scripts en `package.json` para desarrollo, compilación, inicio y linting.

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
