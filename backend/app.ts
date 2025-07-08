import dotenv from 'dotenv'
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000

// Carga variables de entorno desde archivo .env
dotenv.config()

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use(cors());

// Middleware para parsear JSON y datos codificados en la URL con límite de tamaño
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Middleware personalizado para configurar cabeceras CORS y Private Network Access
app.use((req, res, next) => {
  // Permite acceso desde cualquier origen - en producción considera restringirlo
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Métodos HTTP permitidos para CORS
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  // Cabeceras permitidas para solicitudes CORS
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Cabecera necesaria para que Chrome permita solicitudes a redes privadas (PNA)
  res.setHeader("Access-Control-Allow-Private-Network", "true");

  // Si la solicitud es OPTIONS (preflight) responder inmediatamente con 204 sin contenido
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next(); // Pasar al siguiente middleware o ruta
});

// Función que envía el correo a tu email personal
function sendEmailToMe({ email, subject, message, name }) {
  return new Promise((resolve, reject) => {
    // Configuración del transportador SMTP con Gmail y credenciales de entorno
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_MAIL,  // Tu correo Gmail
        pass: process.env.GMAIL_PASS   // Contraseña o token de app
      },
    });

    // Configuración del correo que enviarás a ti mismo
    const mailConfigs = {
      from: process.env.GMAIL_MAIL, // Remitente (tu correo)
      to: process.env.GMAIL_MAIL,   // Destinatario (tu correo)
      subject: `Asunto: ${subject}`, // Asunto del correo
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`, // Texto plano
      html: `<div></div>` // Aquí podrías poner HTML si quieres
    };

    // Envía el correo y maneja error o éxito
    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(info);
    });
  });
}

// Función que envía un correo de confirmación al usuario que llenó el formulario
function sendConfirmationEmailToUser({ email, name, subject }) {
  return new Promise((resolve, reject) => {
    // Configuración SMTP igual que para enviar a ti mismo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
      },
    });

    // Configuración del correo de confirmación para el usuario
    const mailConfigs = {
      from: process.env.GMAIL_MAIL,  // Remitente (tu correo)
      to: email,                     // Destinatario: correo del usuario
      subject: `Confirmación de recepción de mensaje. Asunto: ${subject}`, // Asunto
      text: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y pronto me pondré en contacto contigo.\n\nSaludos!`, // Mensaje plano
      html: `<div></div>` // Aquí podrías poner HTML si quieres
    };

    // Envía el correo y maneja error o éxito
    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(info);
    });
  });
}

// Ruta POST principal para recibir el formulario de contacto
app.post("/", async (req, res) => {
  try {
    console.log("Body recibido:", req.body); // Log de lo recibido

    // Enviar correo a ti mismo con los datos del formulario
    await sendEmailToMe(req.body);

    // Enviar correo de confirmación al usuario que llenó el formulario
    await sendConfirmationEmailToUser(req.body);

    // Respuesta exitosa al cliente
    res.send("Mensajes enviados correctamente");
  } catch (error) {
    console.error("Error enviando correos:", error);
    // Respuesta de error en caso de falla
    res.status(500).send("Error enviando correos");
  }
});

// Inicia el servidor en el puerto definido
app.listen(port, () => {
  console.log(`Nodemailer escuchando en http://localhost:${port}`);
});
