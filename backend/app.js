import dotenv from 'dotenv'
import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"

const app = express()
const port = process.env.PORT || 4000

dotenv.config()

// Middleware para permitir solicitudes CORS desde cualquier origen con configuración básica
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

// Middleware para parsear JSON y datos codificados en la URL con límite de tamaño
app.use(express.json({ limit: "25mb" }))
app.use(express.urlencoded({ limit: "25mb", extended: true }))

// Middleware adicional para cabeceras CORS y Private Network Access (opcional, pero puede ayudar en algunos casos)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Private-Network", "true")
  next()
})

// Función que envía el correo a mi email personal
function sendEmailToMe({ email, subject, message, name }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
      },
    })

    const mailConfigs = {
      from: process.env.GMAIL_MAIL,
      to: process.env.GMAIL_MAIL,
      subject: `Asunto: ${subject}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
      html: `
        <div style="font-family: 'Jost', sans-serif; background-color: #ffffff; color: #333333; padding: 2rem; border-radius: 1rem; border: 1px solid #ddd;">
          <h2 style="font-family: 'Cal Sans', sans-serif; font-size: 2rem; color: #d97706; margin-bottom: 1rem;">
            Nuevo mensaje desde mi portafolio
          </h2>
          <p style="margin: 0.5rem 0;">
            <strong>Nombre:</strong> <span>${name}</span>
          </p>
          <p style="margin: 0.5rem 0;">
            <strong>Email:</strong> <span>${email}</span>
          </p>
          <p style="margin: 0.5rem 0;">
            <strong>Asunto:</strong> <span>${subject}</span>
          </p>
          <hr style="border: 1px solid #ccc; margin: 1rem 0;">
          <p style="margin-top: 1rem;">${message}</p>
        </div>
    `
    
    }

    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error)
        return reject(error)
      }
      return resolve(info)
    })
  })
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
    })

    const mailConfigs = {
      from: process.env.GMAIL_MAIL,
      to: email,
      subject: `Confirmación de recepción de mensaje. Asunto: ${subject}`,
      text: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y pronto me pondré en contacto contigo.\n\nSaludos!`,
      html: `
        <div style="font-family: 'Jost', sans-serif; background-color: #ffffff; color: #333333; padding: 2rem; border-radius: 1rem; border: 1px solid #ddd;">
          <h2 style="font-family: 'Cal Sans', sans-serif; font-size: 2rem; color: #d97706; margin-bottom: 1rem;">
            ¡Hola ${name}!
          </h2>
          <p style="margin: 0.5rem 0;">
            Gracias por contactarme. He recibido tu mensaje con el asunto: <span><strong>${subject}</strong></span>
          </p>
          <p style="margin: 0.5rem 0;">
            En breve me pondré en contacto contigo para atender tu solicitud.
          </p>
          <p style="margin-top: 1rem;">
            ¡Saludos cordiales!
          </p>
        </div>
    `
    
    }
    
    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error)
        return reject(error)
      }
      return resolve(info)
    })
  })
}


// Ruta POST para recibir formulario
app.post("/", async (req, res) => {
  try {
    console.log("Body recibido:", req.body)

    await Promise.all([
      sendEmailToMe(req.body),
      sendConfirmationEmailToUser(req.body)
    ])

    res.json({ success: true, message: "Mensajes enviados correctamente" })
  } catch (error) {
    console.error("Error enviando correos:", error)
    res.status(500).json({ success: false, message: "Error enviando el correo" })
  }
})

app.listen(port, () => {
  console.log(`Nodemailer escuchando en http://localhost:${port}`)
})
