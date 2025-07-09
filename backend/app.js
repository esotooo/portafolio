import dotenv from 'dotenv'
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

// Configura CORS de forma explícita
app.use(cors({
  origin: '*', // o pon el dominio específico de tu frontend para mayor seguridad
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));

// Middleware para parsear JSON y URL-encoded
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Opcional: responder OPTIONS para todas las rutas, aunque cors ya lo maneja
app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Funciones para enviar correos (igual que tú las tienes)...

// Tu ruta POST principal
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
