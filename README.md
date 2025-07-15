# Portafolio Profesional — Edwin Soto

Mi portafolio personal, diseñado y desarrollado para presentar mi experiencia, habilidades y proyectos como desarrollador frontend.

**Frontend:** React + TypeScript + Sass  
**Backend:** Node.js + Express + Nodemailer

---

## Demo

Puedes ver el portafolio en vivo aquí:  
[https://esportafolio.netlify.app](https://esportafolio.netlify.app)

---

## Estructura del proyecto

El proyecto está organizado en dos carpetas principales: `backend` para la API y envío de correos, y `frontend` para la aplicación web.  
A continuación, la estructura completa:

PORTFOLIO-REACT/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   └── layout/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── sass/
│   │   │   ├── global/
│   │   │   ├── layout/
│   │   │   ├── utilities/
│   │   │   └── App.scss
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   └── tsconfig.json

---

## Tecnologías usadas

### Frontend
- React con TypeScript
- Sass para estilos
- Hooks personalizados para animaciones e interactividad
- React Router para navegación
- React Icons para íconos
- Axios para llamadas a la API

### Backend
- Node.js con Express
- Nodemailer para envío de correos electrónicos
- dotenv para manejo de variables de entorno
- CORS configurado para permitir peticiones desde el frontend

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/esotooo/portafolio.git
cd portafolio
```

#### Configura el Backend
```bash
cd backend
npm install
```

Crea un archivo .env en la carpeta backend/ con las siguientes variables:

```
GMAIL_MAIL=tu_correo@gmail.com
GMAIL_PASS=tu_contraseña_app
PORT=4000
```
> **Nota:** para Gmail, se recomienda generar una contraseña de aplicación para mayor seguridad.

Inicia el servidor backend:

```bash
node ./app.js
```

El servidor escuchara por defecto en http://localhost:4000

#### Configura el Frontend
```bash
cd ../frontend
npm install
```

Inicial el frontend en modo de desarrollo: 
```bash
npm run dev
```
La aplicación estará disponible por defecto en http://localhost:5173

## Uso 
- Navega por las secciones de experiencia, proyectos y tecnologías.
- Utiliza el formulario de contacto para enviar mensajes.
- Los mensajes se enviarán a tu correo y se enviará un correo de confirmación al remitente.

## Funcionalidad 
- El backend recibe el formulario de contacto mediante una petición POST.
- Utiliza Nodemailer para enviar el correo con el mensaje a tu dirección.
- Envía una confirmación automática al usuario que envió el formulario.
- Está configurado para aceptar solicitudes CORS desde cualquier origen.

## Proyectos Destacados
- El portafolio muestra una selección de proyectos desarrollados, con enlaces a la demo y al repositorio GitHub.
- Cada proyecto incluye una descripción breve y las tecnologías utilizadas.

## Créditos

Desarrollado por Edwin Soto.
- LinkedIn: https://www.linkedin.com/in/edwin-soto-5226a5374/
- GitHub: https://github.com/esotooo