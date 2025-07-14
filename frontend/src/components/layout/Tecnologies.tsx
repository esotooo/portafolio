import { imageFront, imageLearning, tools } from "../../data/datos";
import { useOnScreen } from "../../hooks/useOnScreen";

export default function Tecnologies() {
    const { ref: frontRef, isVisible: frontVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
    const { ref: toolsRef, isVisible: toolsVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
    const { ref: learningRef, isVisible: learningVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section className="container contactame" id="contact">
            <div className="tecnologias">
                <h1>Tecnologías</h1>
                <p>
                    A continuación, se presenta un detalle organizado de las tecnologías que utilizo, clasificadas en frontend, herramientas y tecnologías en aprendizaje.
                </p>
                <div className="tecnologia-cards gradiente-texto">
                    <div
                        ref={frontRef}
                        className={`tecnologia ${frontVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".3s" }}
                    >
                        <h2 className="frontend">Frontend</h2>
                        {imageFront.map(image => (
                            <div className="img-container" key={image.id}>
                                <img src={image.path} alt="Imagen lenguaje" loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <div
                        ref={toolsRef}
                        className={`tecnologia ${toolsVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".6s" }}
                    >
                        <h2 className="herramientas">Herramientas</h2>
                        {tools.map(image => (
                            <div className="img-container" key={image.id}>
                                <img src={image.path} alt="Imagen herramienta" loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <div
                        ref={learningRef}
                        className={`tecnologia aprendiendo ${learningVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".9s" }}
                    >
                        <h2 className="aprendiendo">Aprendiendo</h2>
                        {imageLearning.map(image => (
                            <div className="img-container" key={image.id}>
                                <img src={image.path} alt="Imagen aprendizaje" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
