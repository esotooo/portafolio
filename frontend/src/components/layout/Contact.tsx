import { useEffect, useRef, useState } from "react"
import axios from "axios"
import lottie from 'lottie-web'
import { useOnScreen } from "../../hooks/useOnScreen";



export default function Contact() {

    const { ref, isVisible } = useOnScreen<HTMLFormElement>({ threshold: 0.2 });


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
            .post("http://localhost:4000/", {
                    name,
                    email,
                    subject,
                    message
            })
            .then(() => {
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
            <form 
                ref={ref}
                onSubmit={sendEmail} 
                className={`contacto ${isVisible ? "fadeZoom" : ""}`}
                style={{animationDelay: ".6s"}}
            >
                <h1>Contacto</h1>
                <p>
                    ¿Te gustaría colaborar o tienes alguna consulta? ¡Estoy listo para ayudarte!
                </p>

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
