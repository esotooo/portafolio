import dotenv from 'dotenv'
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000

dotenv.config()

// Middleware para permitir solicitudes CORS desde cualquier origen con configuración básica
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Middleware para parsear JSON y datos codificados en la URL con límite de tamaño
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Middleware adicional para cabeceras CORS y Private Network Access (opcional, pero puede ayudar en algunos casos)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});

// Función que envía el correo a tu email personal
function sendEmailToMe({ email, subject, message, name }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
      },
    });

    const mailConfigs = {
      from: process.env.GMAIL_MAIL,
      to: process.env.GMAIL_MAIL,
      subject: `Asunto: ${subject}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
      html: `<div></div>`
    };

    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(info);
    });
  });
}

// Función que envía correo de confirmación al usuario
function sendConfirmationEmailToUser({ email, name, subject }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
      },
    });

    const mailConfigs = {
      from: process.env.GMAIL_MAIL,
      to: email,
      subject: `Confirmación de recepción de mensaje. Asunto: ${subject}`,
      text: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y pronto me pondré en contacto contigo.\n\nSaludos!`,
      html: `<div></div>`
    };

    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(info);
    });
  });
}

// Ruta POST para recibir formulario
app.post("/", async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    await sendEmailToMe(req.body);
    await sendConfirmationEmailToUser(req.body);

    res.json({ success: true, message: "Mensajes enviados correctamente" });
  } catch (error) {
    console.error("Error enviando correos:", error);
    res.status(500).json({ success: false, message: "Error enviando correos" });
  }
});

app.listen(port, () => {
  console.log(`Nodemailer escuchando en http://localhost:${port}`);
});
