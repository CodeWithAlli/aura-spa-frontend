# 🌿 AURA SPA

Sistema web de gestión integral para spas y centros de bienestar, desarrollado con **FastAPI**, **React**, **Vite** y **MySQL**. La plataforma permite administrar usuarios, especialistas, servicios y operaciones internas mediante una interfaz moderna y una arquitectura cliente-servidor escalable.
<img width="883" height="958" alt="image" src="https://github.com/user-attachments/assets/2426c8d2-4ebe-4b26-a1d8-646f96e0bd31" />

---

## 📌 Nota para Reclutadores y Evaluadores

Este proyecto utiliza servicios gratuitos para su despliegue. Debido a las limitaciones de estos servicios, el backend puede entrar en modo de suspensión después de períodos prolongados de inactividad.

**Si al acceder al demo observa una carga lenta durante los primeros segundos, espere un momento y recargue la página. El servicio se reactivará automáticamente.**

Si encuentra algún inconveniente al acceder al sistema o desea solicitar credenciales adicionales para evaluación, puede contactarme en:

📧 **[codewithalli.dev@gmail.com](mailto:codewithalli.dev@gmail.com)**

---

## 🚀 Demo en Producción

**Aplicación Web:**
https://aura-spa-frontend.vercel.app/

---

## 🎯 Objetivo del Proyecto

AURA SPA fue desarrollado con el propósito de digitalizar y optimizar la gestión administrativa de un spa, centralizando la información de usuarios, especialistas y servicios en una única plataforma.

El sistema busca mejorar la organización interna, facilitar la administración de recursos y proporcionar una experiencia de usuario intuitiva tanto para administradores como para el personal especializado.

---

## ✨ Características Principales

### Gestión de Usuarios

* Registro y autenticación de usuarios.
* Control de acceso basado en roles.
* Administración de cuentas.

### Gestión de Especialistas

* Registro de especialistas.
* Administración de información profesional.
* Asignación de funciones y actividades.

### Panel Administrativo

* Visualización de información centralizada.
* Gestión completa de registros del sistema.
* Herramientas administrativas para la operación diaria.

### Seguridad

* Autenticación mediante API.
* Protección de rutas.
* Gestión de sesiones de usuario.

### Arquitectura Cliente-Servidor

* Frontend desacoplado del backend.
* API REST desarrollada con FastAPI.
* Base de datos relacional MySQL.

---

## 🏗️ Arquitectura del Sistema

```text
Frontend (React + Vite)
          │
          ▼
Backend (FastAPI)
          │
          ▼
MySQL Database
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* FastAPI
* Python
* REST API

### Base de Datos

* MySQL

### Herramientas

* Git
* GitHub
* Vercel

---

## 📂 Estructura General

```text
AURA-SPA
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── init_db.sql
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

---

## ⚙️ Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/CodeWithAlli/aura-spa.git
cd aura-spa
```

### 2. Configurar la Base de Datos

Ejecutar:

```sql
source backend/init_db.sql
```

### 3. Configurar Backend

```bash
cd backend

python -m venv .venv
```

Activar entorno virtual:

Windows

```bash
.venv/Scripts/activate
```

Linux / Mac

```bash
source .venv/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Configurar archivo `.env`

```env
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=AURA_SPA
MYSQLPORT=3306
```

Ejecutar servidor:

```bash
uvicorn main:app --reload --port 8000
```

### 4. Configurar Frontend

```bash
cd frontend

npm install

npm run dev
```

Archivo `.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## 👤 Credenciales de Prueba

### Administrador

| Email                                         | Contraseña |
| --------------------------------------------- | ---------- |
| [admin@spa.com](mailto:admin@spa.com)         | admin123   |
| [allison@gmail.com](mailto:allison@gmail.com) | allison2   |

### Especialista

| Email                                                   | Contraseña |
| ------------------------------------------------------- | ---------- |
| [especialista@gmail.com](mailto:especialista@gmail.com) | aura1234   |

---

## 📸 Evidencias del Proyecto

Agregar capturas reales del sistema:
[Login]
<img width="429" height="529" alt="image" src="https://github.com/user-attachments/assets/4a4907c4-59af-49b6-a3b5-bf4c50f82ed3" />
[Dashboard]
<img width="1910" height="800" alt="image" src="https://github.com/user-attachments/assets/21d416b6-8b73-4e5e-9dd1-61714959e122" />
[Usuarios]
<img width="1147" height="647" alt="image" src="https://github.com/user-attachments/assets/8bb0afff-6af0-484d-b214-5cda80e5ab93" />
[Servicios]
<img width="1145" height="745" alt="image" src="https://github.com/user-attachments/assets/efa10637-edfa-4791-9108-eacf290ee3e6" />

---

## 💡 Aprendizajes y Competencias Aplicadas

Durante el desarrollo de este proyecto se aplicaron conocimientos relacionados con:

* Desarrollo Full Stack.
* Diseño de APIs REST.
* Integración Frontend y Backend.
* Gestión de bases de datos relacionales.
* Control de acceso basado en roles.
* Arquitectura cliente-servidor.
* Despliegue de aplicaciones web.

---

## 📬 Contacto

Para consultas, comentarios o evaluación técnica del proyecto:

**Email:** [codewithalli.dev@gmail.com](mailto:codewithalli.dev@gmail.com)

---

## 📄 Licencia

Proyecto desarrollado con fines educativos, académicos y de fortalecimiento de competencias profesionales en desarrollo de software.
