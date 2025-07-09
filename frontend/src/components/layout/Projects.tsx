import { proyectos } from "../../data/datos";
import { MdHttp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Projects() {

  return (
    <section className="proyectos container" id="projects">
      <h1>Proyectos</h1>
      <div className="project-card">
        {Object.values(proyectos)
          .slice(0, 3)
          .map((proyecto, index) => (
            <div className={`proyecto ${index === 2 ? "tarjeta-tres" : ""}`} key={proyecto.id}>
              <div className="imagen-proyecto">
                <img
                  loading="lazy"
                  src={proyecto.image}
                  alt="Imagen del proyecto"
                />
              </div>
              <div className="contenido">
                <h2>{proyecto.title}</h2>
                <p>{proyecto.description}</p>
                <div className="opciones">
                  <a href={proyecto.url1} className="site">
                    <i><MdHttp /></i>Demo
                  </a>
                  <a href={proyecto.url2} className="git">
                    <i><FaGithub /></i>GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <Link to="/detailed-projects" className="ver-todos">
          Más proyectos <IoIosArrowRoundForward />
        </Link>
      </div>
    </section>
  );
}
