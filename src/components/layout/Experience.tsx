import { CiCalendar } from "react-icons/ci";
import { experiencias } from "../../data/datos";


export default function Experience() {
  
  return (
    <section className="experiencia container" id="experience">
      <h1>Experiencia</h1>
      <ul>
          {experiencias.map(experiencia => (
            <li key={experiencia.id}>
            <div className="titulo">
              <CiCalendar className="calendario" />
              <h2>{experiencia.title} - <span>{experiencia.company}</span></h2>
            </div>
            <div className="datos">
              <h3>{experiencia.date}</h3>
              <p>{experiencia.summary}</p>
            </div>
        </li>
          ))}
      </ul>
    </section>

  )
}
