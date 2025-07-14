import { CiCalendar } from "react-icons/ci";
import { experiencias } from "../../data/datos";
import { useOnScreen } from "../../hooks/useOnScreen";

function ExperienceItem({ experiencia, index }: { experiencia: typeof experiencias[0]; index: number }) {
  const { ref, isVisible } = useOnScreen<HTMLLIElement>({ threshold: 0.2 });

  return (
    <li
      ref={ref}
      className={isVisible ? "visible" : ""}
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div className="titulo">
        <CiCalendar className="calendario" />
        <h2>
          {experiencia.title} - <span>{experiencia.company}</span>
        </h2>
      </div>
      <div className="datos">
        <h3>{experiencia.date}</h3>
        <p>{experiencia.summary}</p>
      </div>
    </li>
  )
}

export default function Experience() {
  const { ref: titleRef, isVisible: titleVisible } = useOnScreen<HTMLHeadingElement>({ threshold: 0.2 });

  return (
    <section className="experiencia container" id="experience">
      <h1 ref={titleRef} className={titleVisible ? "fadeInLeft" : ""}>Experiencia</h1>
      <ul>
        {experiencias.map((experiencia, index) => (
          <ExperienceItem key={experiencia.id} experiencia={experiencia} index={index} />
        ))}
      </ul>
    </section>
  );
}
