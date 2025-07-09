import type { JSX } from 'react';

export type opcion = {
    id: number
    text: string
    url: string
} 

export type enlace = opcion & {
    icono: JSX.Element
}

export type experiencia = {
    id: number
    title: string
    company: string
    date: string
    summary: string
}

export type proyecto = {
    id: number
    title: string
    image: string
    description: string
    url1: string
    url2: string
}

export type imagen = {
    id: number
    path: string
}