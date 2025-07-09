import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/App.scss"
import Header from "./components/header/Header"
import AboutMe from "./components/layout/AboutMe"
import Experience from "./components/layout/Experience"
import Projects from "./components/layout/Projects"
import Contact from "./components/layout/Contact"
import Footer from "./components/footer/Footer"
import DetailedProjects from "./components/layout/DetailedProjects";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Ruta principal con todas las secciones */}
        <Route
          path="/"
          element={
            <>
              <AboutMe />
              <Experience />
              <Projects />
              <Contact />
            </>
          }
        />

        {/* Ruta para los proyectos detallados */}
        <Route path="/detailed-projects" element={<DetailedProjects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
