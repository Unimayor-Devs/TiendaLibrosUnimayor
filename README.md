# TiendaLibrosUnimayor

Este proyecto es una tienda en línea desarrollada como parte de las materias Formulación y Evaluación de Proyectos y Aseguramiento de la Calidad de Software y Pruebas de Ingeniería Informática de la Institución Universitaria Colegio Mayor del Cauca. Permite gestionar libros mediante operaciones CRUD, gestionar usuarios y procesar pagos utilizando la API de Mercado Pago.

Visitala en:
https://tiendalibrosunimayor.web.app/

## Descripción del Proyecto

La TiendaLibrosUnimayor es una aplicación web destinada a la venta y gestión de libros en línea. Proporciona a los usuarios la capacidad de explorar un catálogo de libros, realizar compras seguras utilizando la integración con la API de Mercado Pago, y gestionar cuentas de usuario.

## Tecnologías Utilizadas

- **Backend**:
  - JavaScript
  - Node.js
  - Firebase (Firestore para la base de datos)

- **Frontend**:
  - JavaScript
  - React
  - HTML
  - CSS

## Dependencias Principales

### Backend (Firebase Functions)

- `firebase-admin`: SDK oficial de Firebase para Node.js, utilizado para interactuar con Firebase desde el backend.

### Frontend (React)

- `react`: Biblioteca de JavaScript para construir interfaces de usuario.

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

### 1. Instalar node.js y npm (Administrador de paquetes de Node.js)
Puedes verificar la instalación con
```bash
node --version
npm --version
```

### 2. Instalación de FirebaseCli
```bash
npm install -g firebase-tools
```

### 3. Clonar este repositorio
- Puedes clonar este repositorio con este código
```bash
git clone https://github.com/Unimayor-Devs/TiendaLibrosUnimayor.git
cd TiendaLibrosUnimayor
```

- O también puedes utilizar la herramienta GitHub Desktop
https://desktop.github.com/

### 4. Ejecución local Frontend (React)
```bash
cd frontend
npm start
```
