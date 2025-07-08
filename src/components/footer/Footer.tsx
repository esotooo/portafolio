import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { opciones } from "../header/informacion"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Footer() {

  const currentYear = new Date().getFullYear()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      const links = document.querySelectorAll('.footer-nav a')

      links.forEach(link => {
        const handleClick = (e: Event) => {
          e.preventDefault()

          const target = e.currentTarget as HTMLAnchorElement
          const href = target.getAttribute('href')

          const scrollToSection = () => {
            if(!href) return
            const section = document.querySelector(href)
            section?.scrollIntoView({behavior: 'smooth'})
          }

          if(location.pathname !== '/'){
            navigate('/', {replace: true})
            setTimeout(scrollToSection, 100)
          }else{
            scrollToSection()
          }
        }

        link.addEventListener('click', handleClick)
        link.setAttribute('data-handler-attached', 'true')
      })
      return () => {
        links.forEach(link => {
          if(link.getAttribute('data-handler-attached')){
            link.replaceWith(link.cloneNode(true))
          }
        })
    }
  },[location.pathname, navigate])

  return (
  <footer>
    <p>{`© ${currentYear} Edwin Soto`}</p>

    <div className="socials">
      <a
        href="https://www.linkedin.com/in/edwin-soto-8793a2266/" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/esotooo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
    </div>

    <nav className="footer-nav">
    {opciones.map((opcion) => (
      <a key={opcion.id}
      href={opcion.url}>
        {opcion.text}
      </a>
    ))}
    </nav>

    <p className="footer-tagline">
      Apasionado por crear experiencias digitales intuitivas.
    </p>
  </footer>

  )
}
