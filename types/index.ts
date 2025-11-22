// Tipos para la aplicación Uniboost

export interface Carrera {
  _id: string
  titulo: string
  modalidad: "Presencial" | "Virtual" | "Híbrida"
  descripcion: string
  imagen: string
  imagenR: string 
  duracion: string
  facultad: string
}

export interface UsuarioRegistro {
  _id: any
  nombreCompleto: string
  correoElectronico: string
  telefono: string
  fechaRegistro?: Date
  rol: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
