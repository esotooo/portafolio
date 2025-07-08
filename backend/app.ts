import dotenv from 'dotenv'
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = 4000;

dotenv.config()

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

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
      from: process.env.GMAIL_MAIL, //correo desde que se envia el mensaje
      to: process.env.GMAIL_MAIL, // correo para recibir mensajes
      subject: `Asunto: ${subject}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
      html: `
        <div>

        </div>
      `
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
      to: email, // correo del usuario al cual enviar el mensaje de confirmacion
      subject: `Confirmación de recepción de mensaje. Asunto: ${subject}`,
      text: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y pronto me pondré en contacto contigo.\n\nSaludos!`,
      html: `
        <div>
          
        </div>
      `
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

app.post("/", async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    await sendEmailToMe(req.body); // Enviar a mi correo
    await sendConfirmationEmailToUser(req.body); // Confirma al usuario que lleno el formulario

    res.send("Mensajes enviados correctamente");
  } catch (error) {
    console.error("Error enviando correos:", error);
    res.status(500).send("Error enviando correos");
  }
});

app.listen(port, () => {
  console.log(`Nodemailer escuchando en http://localhost:${port}`);
});
