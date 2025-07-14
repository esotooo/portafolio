import { proyectos } from "../../data/datos";
import { MdHttp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useOnScreen } from "../../hooks/useOnScreen";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";


function ProjectsItem({ proyecto, index }: { proyecto: typeof proyectos[0]; index: number }) {
  const { ref: onScreenRef, isVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgGradient, setBgGradient] = useState<string>("");
  const facRef = useRef<FastAverageColor | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    if (!facRef.current) facRef.current = new FastAverageColor();

    facRef.current.getColorAsync(imgRef.current)
    .then((color: {
      rgb: string
      rgba: string
      hex: string
      hex8: string
      isDark: boolean
    }) => {
      setBgGradient(`linear-gradient(136deg, ${color.rgb} 100%)`);
    })
    .catch(() => {
      setBgGradient("")
    })
  
    return () => {
      facRef.current?.destroy();
      facRef.current = null;
    };
  }, [proyecto.image]);

  return (
    <div
      ref={onScreenRef}
      className={`proyecto ${index === 2 ? "tarjeta-tres" : ""} ${isVisible ? "fadeSlide" : ""}`}
      style={{ animationDelay: `${index * 0.5}s` }}
      key={proyecto.id}
    >
      <div
        className="imagen-proyecto"
        style={{ background: bgGradient, borderRadius: "3rem", padding: "2rem" }} 
      >
        <img
          ref={imgRef}
          loading="lazy"
          src={proyecto.image}
          alt={`Imagen del proyecto ${proyecto.title}`}
          crossOrigin="anonymous"
          style={{ width: "90%", objectFit: "cover", display: "block", margin: "0 auto" }}
        />
      </div>
      <div className="contenido">
        <h2>{proyecto.title}</h2>
        <div className="tecnologias-usadas">
          {proyecto.tecnologias.map((tecnologia, i) => (
            <p key={i}>{tecnologia}</p>
          ))}
        </div>
        <p>{proyecto.description}</p>
        <div className="opciones">
          <a href={proyecto.url1} className="site" target="_blank" rel="noopener noreferrer">
            <i><MdHttp /></i>Demo
          </a>
          <a href={proyecto.url2} className="git" target="_blank" rel="noopener noreferrer">
            <i><FaGithub /></i>GitHub
          </a>
        </div>
      </div>
    </div>
  )
}


export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useOnScreen<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: linkRef, isVisible: linkVisible } = useOnScreen<HTMLAnchorElement>({ threshold: 0.2 });

  return (
    <section className="proyectos container" id="projects">
      <h1 ref={titleRef} className={titleVisible ? "fadeInLeft" : ""}>Proyectos</h1>
      <div className="project-card">
        {proyectos
          .slice(0, 3)
          .map((proyecto, index) => (
            <ProjectsItem key={proyecto.id} proyecto={proyecto} index={index} />
          ))}
      </div>
      <div>
        <Link
          to="/detailed-projects"
          className={`ver-todos ${linkVisible ? "fadeSlide" : ""}`}
          ref={linkRef}
          onClick={() => window.scrollTo(0, 0)}
        >
          Más proyectos <IoIosArrowRoundForward />
        </Link>
      </div>
    </section>
  );
}
