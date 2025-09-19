import { enlaces } from "../header/informacion"


export default function AboutMe() {

  return (
    <section className="container">
        <div className="inicio">
            <div className="informacion">
              <div className="texto">
                <h1>Hola! Soy <span>Edwin Soto</span></h1>
                <h2>Desarrollador Fullstack</h2>
                <p>
                  Soy un desarrollador fullstack en crecimiento, enfocado en crear aplicaciones web intuitivas, 
                  eficientes y adaptables a cualquier dispositivo.
                </p>
              </div>
              <div className="imagen">
                    <img loading="lazy" src="/img/FOTOCV.png" alt="Foto de perfil" />
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
