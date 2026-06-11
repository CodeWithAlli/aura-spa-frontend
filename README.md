# 🌿 AURA SPA

Sistema de gestión integral para spa y centros de bienestar desarrollado con **FastAPI**, **React**, **Vite** y **MySQL**.

## 🚀 Demo

🔗 **Aplicación en línea:** https://aura-spa-frontend.vercel.app/

---

## 📋 Descripción

AURA SPA es una plataforma web diseñada para administrar los procesos de un spa de manera eficiente.

El sistema permite:

* Gestión de usuarios y roles.
* Administración de especialistas.
* Gestión de servicios y tratamientos.
* Control de citas y reservas.
* Panel administrativo.
* Autenticación segura.
* Historial y seguimiento de actividades.

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
* JWT Authentication

### Base de Datos

* MySQL

### Despliegue

* Vercel (Frontend)

---

## 📂 Estructura del Proyecto

```text
AURA-SPA/
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

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/aura-spa.git

cd aura-spa
```

---

### 2. Configurar la Base de Datos

Ejecutar el script:

```sql
source backend/init_db.sql
```

Esto creará la base de datos:

```text
aura_spa
```

---

### 3. Configurar Backend

```bash
cd backend

python -m venv .venv
```

Activar entorno virtual:

Windows:

```bash
.venv/Scripts/activate
```

Linux/Mac:

```bash
source .venv/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Configurar archivo `.env`:

```env
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=AURA_SPA
MYSQLPORT=3306
```

Iniciar servidor:

```bash
uvicorn main:app --reload --port 8000
```

Backend disponible en:

```text
http://localhost:8000
```

---

### 4. Configurar Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend disponible en:

```text
http://localhost:5173
```

Archivo `.env`:

```env
VITE_API_URL=http://localhost:8000
```

---

## 👤 Usuarios de Prueba

### Administradores

| Email                                         | Contraseña |
| --------------------------------------------- | ---------- |
| [admin@spa.com](mailto:admin@spa.com)         | admin123   |
| [allison@gmail.com](mailto:allison@gmail.com) | allison2   |

### Especialista

| Email                                                   | Contraseña |
| ------------------------------------------------------- | ---------- |
| [especialista@gmail.com](mailto:especialista@gmail.com) | aura1234   |

---

## 🔐 Roles del Sistema

* **Administrador**

  * Gestión completa del sistema.
  * Administración de usuarios.
  * Gestión de especialistas.
  * Visualización de estadísticas.

* **Especialista**

  * Gestión de citas asignadas.
  * Consulta de información relacionada con servicios.

---

## 📸 Capturas

Agregar aquí capturas de pantalla del sistema.
<img width="487" height="381" alt="image" src="https://github.com/user-attachments/assets/492287a9-0985-4f51-bc7e-8247baff3a77" />

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos y de aprendizaje.
