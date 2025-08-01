import { proyectos } from "../../data/datos";
import { MdHttp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useOnScreen } from "../../hooks/useOnScreen";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";

function DetailedProjectsItem({ proyecto, index }: { proyecto: typeof proyectos[0]; index: number }) {
  const { ref: onScreenRef, isVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgGradient, setBgGradient] = useState<string>("");
  const facRef = useRef<FastAverageColor | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;
  
    if (!facRef.current) facRef.current = new FastAverageColor();
  
    facRef.current.getColorAsync(imgRef.current)
    .then((color) => {
      function darkenRgb(rgb: string, amount = 0.4) {
        const nums = rgb.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
        const darkened = nums.map(n => Math.max(0, Math.floor(n * (1 - amount))));
        return `rgb(${darkened.join(",")})`;
      }
  
      const darkColor = darkenRgb(color.rgb);
      setBgGradient(`linear-gradient(136deg, ${color.rgb} 40%, ${darkColor} 100%)`);
    })
    .catch(() => {
      setBgGradient("");
    })
  
    return () => {
      facRef.current?.destroy();
      facRef.current = null;
    };
  }, [proyecto.image]);
  
  return (
    <div
      ref={onScreenRef}
      className={`proyecto ${isVisible ? "fadeSlide" : ""}`}
      style={{ animationDelay: `${index * 0.2}s` }}
      key={proyecto.id}
    >
      <div className="imagen-proyecto"
        style={{ background: bgGradient, borderRadius: "3rem", padding: "2rem" }}
      >
        <img
          ref={imgRef}
          loading="lazy"
          src={proyecto.image}
          alt={`Imagen del proyecto ${proyecto.title}`}
          crossOrigin="anonymous"
        />
      </div>
      <div className="contenido">
        <h2>{proyecto.title}</h2>
        <div className="tecnologias-usadas">
          {proyecto.tecnologias.map((tecnologia) => (
            <p key={tecnologia}>{tecnologia}</p>
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
  );
}

export default function DetailedProjects() {
  return (
    <section className="proyectos-todos container" id="projects">
      <h1>Proyectos</h1>
      <div className="project-card">
        {proyectos.map((proyecto, index) => (
          <DetailedProjectsItem
            key={proyecto.id}
            proyecto={proyecto}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
