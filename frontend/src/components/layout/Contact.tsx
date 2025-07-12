import { useEffect, useRef, useState } from "react"
import { imageFront, imageLearning, tools } from "../../data/datos"
import axios from "axios"
import lottie from 'lottie-web'

export default function Contact() {

    //Estado de los datos ingresados por el usuario en el formulario
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    //Estados de los mensajes
    const [showConfirm, setShowConfirm] =useState(false)
    const [showError, setShowError] = useState(false)

    const container  = useRef<HTMLDivElement>(null)
    const animInstance = useRef<any>(null)


    //Conectando a la API pare enviar el correo
    const sendEmail = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios
            .post("https://portafolio-o0bc.onrender.com", {
                    name,
                    email,
                    subject,
                    message
            })
            .then(() => {
                console.log('Enviado exitosamente')
                setShowConfirm(true)
                setName('')
                setEmail('')
                setSubject('')
                setMessage('')
                setTimeout(() => {
                    setShowConfirm(false)
                }, 3000)
            })
            .catch(() => {
                setShowError(true)
                console.log('Algo ha salido mal')
                setTimeout(() => {
                    setShowError(false)
                }, 3000)
            })
    }
    
    useEffect(() => {
        if(showConfirm && container.current){
            animInstance.current = lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '/lottie/confirmation-animation.json'
            })
        }
      
        return () => {
            if(animInstance.current){
                animInstance.current.destroy()
                animInstance.current = null
            }
        }
      }, [showConfirm]);


    useEffect(() => {
        if(showError && container.current){
            animInstance.current = lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '/lottie/error-confirmation.json'
            })
        }

        return () => {
            if(animInstance.current){
                animInstance.current.destroy()
                animInstance.current = null
            }
        }
    }, [showError])


    return (
        <section className="container contactame" id="contact">
            <div className="sobre-mi">
                <h1>Sobre Mí</h1>
                <p>
                    Estudio Ingeniería en Sistemas y actualmente curso mi tercer año. 
                     Me especializo en desarrollo frontend, con enfoque en crear interfaces atractivas y funcionales. 
                     He trabajado como representante de servicio al cliente, donde desarrollé habilidades en comunicación, empatía y resolución de problemas. 
                     También colaboré como asistente de documentación en un laboratorio, apoyando en la creación de material gráfico y técnico. 
                     Estas experiencias reforzaron mi atención al detalle y enfoque centrado en el usuario, cualidades que aplico hoy como desarrollador frontend en formación.
                </p>
                <a href="/CV_EdwinSoto_FrontendDeveloper.pdf" className="boton-principal" download>Descargar CV</a>
            </div>
            <div className="tecnologias">
                <h1>Tecnologías</h1>
                <div className="tecnologia-cards gradiente-texto">
                    <div className="tecnologia">
                        <h2 className="frontend">Frontend</h2>
                        {/*Iteramos nuestro objeto con la informacion de las tecnologias que manejo*/}
                        {imageFront.map(image => (
                            <div className="img-container"  key={image.id} >
                                <img src={image.path} alt="Imagen lenguaje"  key={image.id} loading="lazy" />
                            </div>
                        ))}
                    </div>
                    <div className="tecnologia">
                        <h2 className="herramientas">Herramientas</h2>
                        {tools.map(image => (
                            <div className="img-container"  key={image.id}>
                                <img src={image.path} alt="Imagen lenguaje" key={image.id} loading="lazy"/>
                            </div>
                        ))}
                    </div>
                    <div className="tecnologia aprendiendo">
                        <h2 className="aprendiendo">Aprendiendo</h2>
                        {imageLearning.map(image => (
                            <div className="img-container"  key={image.id}>
                                <img src={image.path} alt="Imagen lenguaje" key={image.id}  loading="lazy"/>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={sendEmail} className="contacto">
                    <h1>Contacto</h1>
                    <p>¿Estás interesado en que trabajemos juntos?</p>

                    <label htmlFor="nombre">Nombre:</label>
                    <input required type="text" name="nombre" id="nombre" 
                    value={name}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input required type="email" name="correo" id="correo"  
                    value={email} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>

                    <label htmlFor="asunto">Asunto:</label>
                    <input required type="text" name="asunto" id="asunto" 
                    value={subject} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}/>

                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea required name="mensaje"
                    value={message} onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} id="mensaje"  placeholder="Coloque su mensaje acá" ></textarea>

                    <input type="submit" className="boton-enviar" value="Enviar" />
                    </form>
            </div>

            {/*VENTANA DE CONFIRMACION (EXITOSO) */}
            {showConfirm && (
                <div className="ventana-confirmacion">
                    <div className="contenido">
                        <div className="animacion" ref={container}> </div>
                        <div className="texto">
                            <h4>Gracias por contactarme!</h4>
                            <p>Has recibido un correo de confirmación al correo ingresado.
                                Muy pronto me pondré en contacto contigo 😁.
                            </p>
                        </div>
                    </div>

                </div>
            )}

            {/*VENTANA DE CONFIRMACION (ERROR) */}
            {showError && (
                <div className="ventana-confirmacion">
                    <div className="contenido">
                        <div className="animacion" ref={container}> </div>
                        <div className="texto">
                            <h4>Error 🙁</h4>
                            <p>
                                Algo ha salido mal, porfavor intenta de nuevo. 
                            </p>
                        </div>
                    </div>

                </div>
            )}

        </section>
    )
}
