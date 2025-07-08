import { proyectos } from "../../data/datos";
import { MdHttp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function DetailedProjects() {
  return (
    <section className="proyectos-todos container" id="projects">
        <h1>Proyectos</h1>
        <div className="project-card">
        {proyectos.map((proyecto, ) => (
            <div className="proyecto" key={proyecto.id}>
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
  </section>
  )
}
