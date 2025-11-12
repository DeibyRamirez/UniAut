// Datos de ejemplo para desarrollo
// Estos datos se reemplazarán con datos reales de MongoDB

import type { Carrera } from "@/types"

export const carrerasMock: Carrera[] = [
  {
    _id: "1",
    titulo: "Ingeniería de Sistemas",
    modalidad: "Presencial",
    descripcion:
      "Forma profesionales capaces de diseñar, desarrollar e implementar soluciones tecnológicas innovadoras.",
    imagen: "/ingenieria-sistemas-computadoras.jpg",
    duracion: "10 semestres",
    facultad: "Facultad de Ingeniería",
  },
  {
    _id: "2",
    titulo: "Administración de Empresas",
    modalidad: "Virtual",
    descripcion: "Prepara líderes empresariales con visión estratégica y capacidad de gestión organizacional.",
    imagen: "/administracion-empresas-negocios.jpg",
    duracion: "9 semestres",
    facultad: "Facultad de Ciencias Económicas",
  },
  {
    _id: "3",
    titulo: "Derecho",
    modalidad: "Presencial",
    descripcion: "Forma abogados íntegros con sólidos conocimientos jurídicos y compromiso social.",
    imagen: "/derecho-justicia-abogado.jpg",
    duracion: "10 semestres",
    facultad: "Facultad de Derecho",
  },
  {
    _id: "4",
    titulo: "Contaduría Pública",
    modalidad: "Híbrida",
    descripcion: "Profesionales expertos en gestión contable, financiera y tributaria de organizaciones.",
    imagen: "/contabilidad-finanzas-calculadora.jpg",
    duracion: "9 semestres",
    facultad: "Facultad de Ciencias Económicas",
  },
  {
    _id: "5",
    titulo: "Psicología",
    modalidad: "Presencial",
    descripcion: "Forma psicólogos con competencias para el bienestar mental y desarrollo humano.",
    imagen: "/psicologia-mente-cerebro.jpg",
    duracion: "10 semestres",
    facultad: "Facultad de Ciencias Sociales",
  },
  {
    _id: "6",
    titulo: "Arquitectura",
    modalidad: "Presencial",
    descripcion: "Desarrolla profesionales creativos en diseño arquitectónico y urbanístico sostenible.",
    imagen: "/arquitectura-edificios-planos.jpg",
    duracion: "10 semestres",
    facultad: "Facultad de Arquitectura",
  },
]
