import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa'    
import { opciones } from "./informacion"
import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from  'react-router-dom'

export default function Header() {

    const location = useLocation()
    const navigate = useNavigate()


    //Iniciamos el state para el menu desplegable
    const [openMenu, setOpenMenu] = useState(false)

    //Establecemos 
    const toggleMenu = () => setOpenMenu(prev => !prev)
    const closeMenu = () => setOpenMenu(false)

    useEffect(()=>{
        const scroll = () => {
            const header = document.querySelector('header')
            if(window.scrollY > 10){
                header?.classList.add('scrolled')
            }else{
                header?.classList.remove('scrolled')
            }
        }

        window.addEventListener('scroll', scroll)
        return() => window.removeEventListener('scroll', scroll)
    }, [])

    useEffect(() => {
        const indicator = () => {
            const sections = document.querySelectorAll('section')
            const links = document.querySelectorAll('.navbar a')
            const header = document.querySelector('header')
            const headerHeight = header?.offsetHeight || 0

            let actual = ''

            sections.forEach(section => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.clientHeight

                if (window.scrollY + headerHeight >= (sectionTop - sectionHeight / 3 - 100)) {
                    actual = section.id
                }
            })

            links.forEach(link => {
                const href = link.getAttribute('href')
                if (href && href.startsWith('#')) {
                    link.classList.remove('active')
                    if (href === `#${actual}`) {
                        link.classList.add('active')
                    }
                }
            })
        }

        window.addEventListener('scroll', indicator)
        indicator()
        return () => window.removeEventListener('scroll', indicator)
    }, [])


    useEffect(() => {
        const links = document.querySelectorAll(".navbar a")
      
        links.forEach(link => {
          const handleClick = (e: Event) => {
            e.preventDefault()
      
            const target = e.currentTarget as HTMLAnchorElement
            const href = target.getAttribute("href")
      
            const scrollToSection = () => {
              if (!href) return
              const section = document.querySelector(href)
              section?.scrollIntoView({ behavior: "smooth" })
            }
      
            if (location.pathname !== "/") {
              navigate("/", { replace: true })
              setTimeout(scrollToSection, 100)
            } else {
              scrollToSection()
            }
      
            closeMenu()
          }
      
          link.addEventListener("click", handleClick)
          link.setAttribute("data-handler-attached", "true")
        })
      
        return () => {
          links.forEach(link => {
            if (link.getAttribute("data-handler-attached")) {
              link.replaceWith(link.cloneNode(true))
            }
          })
        }
      }, [location.pathname, navigate])
      
      
    return (
        <>
        <header className="header ">
            <div className="content container">
                <div className="titulo-contenido">
                    <a className="titulo" href='/'>ES</a>
                    
                </div>

                <button className='menu-toggle' onClick={toggleMenu} aria-label='Abrir/cerrar menú'>
                    {openMenu? <FaTimes /> : <FaBars/>}
                </button>

                <nav className={`navbar ${openMenu? 'open' : ''}`}>
                    {opciones.map((opcion) => ( 
                        <a key={opcion.id} 
                        href={opcion.url} 
                        onClick={closeMenu}
                        >
                            {opcion.text}
                        </a>
                    ))}
                    <nav className='variante'>
                        <a href="https://www.linkedin.com/in/edwin-soto-8793a2266/" className='icon-link' target="_blank"  aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/esotooo" target="_blank" className='icon-git' aria-label="GitHub">
                            <FaGithub />
                        </a>
                    </nav>
                </nav>

                <nav className='enlaces'>
                        <a href="https://www.linkedin.com/in/edwin-soto-8793a2266/" target="_blank"  aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/esotooo?tab=repositories" target="_blank"  aria-label="GitHub">
                            <FaGithub />
                        </a>
                </nav>
            </div>
        </header>
        </>
    )
}
