# Tripleten web_project_around_express

# Web Project Around Express

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **TypeScript**, que permite gestionar y consultar datos de usuarios y tarjetas desde archivos JSON de forma asíncrona.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **Entorno de ejecución:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express v5
- **Módulos nativos:** `node:fs/promises`, `node:path`
- **Herramientas de desarrollo:** `tsx`, `eslint`, `prettier`

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
- Se implementó manejo de errores con bloques `try...catch` para responder con un código HTTP `500` e indicar un error interno del servidor en caso de fallos de lectura.

### 3. Definición de Rutas y Servidor

- Se estructuraron las rutas en la carpeta `src/routes/` para separar la lógica de enrutamiento de los controladores.
- Se configuró la aplicación principal en `src/app.ts` para conectar las rutas y levantar el servidor.

### 4. Control de Calidad y Scripts

- Se agregaron scripts en `package.json` para ejecutar el servidor en modo desarrollo (`npm run dev`), realizar la compilación (`npm run build`) y validar el código con linter (`npm run lint`).

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
