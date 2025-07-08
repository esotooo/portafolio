import type { experiencia, proyecto, imagen } from "../types/type"
import caloriasImg from '../assets/img/calorias.png'
import carrito from '../assets/img/guitarla.png'
import propinas from '../assets/img/propinas.png'
import html from '../assets/img/HTML5.png'
import css from '../assets/img/CSS3.png'
import sass from '../assets/img/SASS.png'
import git from '../assets/img/GIT.png'
import tailwind from '../assets/img/TAILWIND.png'
import ts from '../assets/img/TS.png'
import js from '../assets/img/JS.png'
import mysql from '../assets/img/MYSQL.png'
import react from '../assets/img/react.png'
import php from '../assets/img/PHP.png'
import figma from '../assets/img/FIGMA.png'
import vscode from '../assets/img/VSCODE.png'
import ph from '../assets/img/PHOTOSHOP.png'
import ai from '../assets/img/ILLUSTRATOR.png'
import npm from '../assets/img/NPM.png'



export const experiencias : experiencia[] = [
    {
      "id": 1,
      "title": "Representante de Servicio al Cliente",
      "company": "Conduent Business Services",
      "date": "Octubre 2023 - Abril 2025",
      "summary": "Responsable de brindar atención a clientes internacionales en el área de logística y seguimiento de envíos. " +
      "Desarrollé competencias en comunicación efectiva en inglés, resolución de problemas, manejo de herramientas digitales y trabajo colaborativo en entornos remotos."
    },
    {
      "id": 2,
      "title": "Representante de Servicio al Cliente",
      "company": "Telus International",
      "date": "Febrero 2023 - Octubre 2023",
      "summary": "Encargado de atender consultas técnicas y de servicio para usuarios en Estados Unidos." +
      "Adquirí experiencia en soporte técnico, atención al cliente en tiempo real, manejo de conflictos y documentación de incidencias."
    },
    {
      "id": 3,
      "title": "Asistente de Documentación",
      "company": "Qualiser Laboratorio",
      "date": "Julio 2021 - Febrero 2023",
      "summary": "Colaboré en la elaboración y gestión de Procedimientos Específicos de Operación (PEO) en el área de calidad, cumpliendo con normativas internas del sector farmacéutico."+
      "También me desempeñé en el diseño de materiales gráficos institucionales, como tarjetas de presentación, infografías y anuncios."+
      "Durante este período desarrollé un software interno para la gestión de reactivos, experiencia que despertó mi interés por la programación y el desarrollo web."
    }
  ]
  
export const proyectos : proyecto[] = [
    {
        "id": 1,
        "title": "Carrito de Compras",
        "image": carrito,
        "description": "Carrito de compras utilizando useState y useEffect. También aplicando tailwind CSS.",
        "url1": "#",
        "url2": "#"
    },
    {
        "id": 2,
        "title": "Contador de Calorías",
        "image": caloriasImg,
        "description": "Carrito de compras utilizando useState y useEffect. También aplicando tailwind CSS.",
        "url1": "#",
        "url2": "#"
    },
    {
        "id": 3,
        "title": "Administrador de Bienes Raíces",
        "image": propinas,
        "description": "Carrito de compras utilizando useState y useEffect. También aplicando tailwind CSS.",
        "url1": "#",
        "url2": "#"
    },
    {
        "id": 4,
        "title": "Portfolio Edwin Soto",
        "image": "",
        "description": "Carrito de compras utilizando useState y useEffect. También aplicando tailwind CSS.",
        "url1": "#",
        "url2": "#"
    }
]

export const imageFront : imagen[] = [
  {
    "id": 1,
    "path": html
  },
  {
    "id": 2,
    "path": css
  },
  {
    "id": 3,
    "path": js
  },
  {
    "id": 4,
    "path": sass
  },
  {
    "id": 5,
    "path": tailwind
  },
  {
    "id": 6,
    "path": react
  },
]


export const imageLearning : imagen[] = [
  {
    "id": 1,
    "path": ts
  },
  {
    "id": 2,
    "path": php
  },
  {
    "id": 3,
    "path": mysql
  },
  {
    "id": 4,
    "path": figma
  },
]

export const tools : imagen[] = [
  {
    "id": 1,
    "path": git
  },
  {
    "id": 2,
    "path": npm
  },
  {
    "id": 3,
    "path": vscode
  },
  {
    "id": 4,
    "path": ai,
  },
  {
    "id": 5,
    "path": ph
  },
  
]