import { imageFront, imageLearning, tools, imageBack} from "../../data/datos";
import { useOnScreen } from "../../hooks/useOnScreen";

export default function Tecnologies() {
    const { ref: frontRef, isVisible: frontVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
    const { ref: backRef, isVisible: backVisible} = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
    const { ref: toolsRef, isVisible: toolsVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
    const { ref: learningRef, isVisible: learningVisible } = useOnScreen<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section className="container contactame" id="contact">
            <div className="tecnologias">
                <h1>Tecnologías</h1>
                <p>
                    A continuación, se presenta un detalle organizado de las tecnologías que utilizo, clasificadas en frontend, backend, herramientas y tecnologías en aprendizaje.
                </p>
                <div className="tecnologia-cards gradiente-texto">
                    <div
                        ref={frontRef}
                        className={`tecnologia ${frontVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".3s" }}
                    >
                        <h2 className="frontend">Frontend</h2>
                        <div className="imagenes">
                            {imageFront.map(image => (
                                <div className="img-container" key={image.id}>
                                    <img src={image.path} alt="Imagen lenguaje" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={backRef}
                        className={`tecnologia ${backVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".3s" }}
                    >
                        <h2 className="backend">Backend</h2>
                        <div className="imagenes">
                            {imageBack.map(image => (
                                <div className="img-container" key={image.id}>
                                    <img src={image.path} alt="Imagen lenguaje" loading="lazy" />
                                </div>
                            ))}
                        </div>
                   
                    </div>

                    <div
                        ref={toolsRef}
                        className={`tecnologia ${toolsVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".6s" }}
                    >
                        <h2 className="herramientas">Herramientas</h2>
                        <div className="imagenes">
                            {tools.map(image => (
                                <div className="img-container" key={image.id}>
                                    <img src={image.path} alt="Imagen herramienta" loading="lazy" />
                                </div>
                            ))}
                        </div>
                       
                    </div>

                    <div
                        ref={learningRef}
                        className={`tecnologia ${learningVisible ? "fadeZoom" : ""}`}
                        style={{ animationDelay: ".6s" }}
                    >
                        <h2 className="aprendiendo">Aprendiendo</h2>
                        <div className="imagenes">
                            {imageLearning.map(image => (
                                <div className="img-container" key={image.id}>
                                    <img src={image.path} alt="Imagen aprendizaje" loading="lazy" />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
