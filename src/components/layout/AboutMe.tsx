import { enlaces } from "../header/informacion"


export default function AboutMe() {

  return (
    <section className="container">
        <div className="inicio">
            <div className="informacion">
              <div className="texto">
                <h1>Hola! Soy <span>Edwin Soto</span></h1>
                <h2>Desarrollador Frontend</h2>
                <p>
                    Soy un desarrollador frontend en crecimiento, apasionado por crear
                    páginas web que sean fáciles de usar y que se vean bien tanto en 
                    computadoras como en celulares
                </p>
              </div>
              <div className="imagen">
                    <img loading="lazy" src="/img/imagenEjemplo.jpg" alt="Foto de perfil" />
              </div>
            </div>
            <div className="boton boton-enlaces ">
                {enlaces.map((enlace => (
                    <a key={enlace.id} href={enlace.url} className="deslizar"><i>{enlace.icono}</i>{enlace.text}</a>
                )))}
            </div> 
        </div>
      </section>
      
  )
}
