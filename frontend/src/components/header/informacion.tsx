import type { enlace, opcion } from "../../types/type"
import { FaLinkedin, FaGithub } from 'react-icons/fa';      
import { MdWork } from 'react-icons/md';                    
import { HiOutlineMail } from 'react-icons/hi';  

export const opciones : opcion[] = [
    {
        "id": 1,
        "text": "Experiencia",
        "url": "#experience"
    },
    {
        "id": 2,
        "text": "Proyectos",
        "url": "#projects"
    },
    {
        "id": 3,
        "text": "Contacto",
        "url": "#contact"
    }
]

export const enlaces: enlace[] = [
    {
      id: 1,
      text: "LinkedIn",
      url: "https://www.linkedin.com/in/edwin-soto-8793a2266/",
      icono: <FaLinkedin />
    },
    {
      id: 2,
      text: "GitHub",
      url: "https://github.com/esotooo",
      icono: <FaGithub />
    },
    {
      id: 3,
      text: "Correo",
      url: "mailto:edwinsoto.developer@gmail.com",
      icono: <HiOutlineMail />
    },
    {
      id: 4,
      text: "Proyectos",
      url: "#projects",
      icono: <MdWork />
    }
  ];

