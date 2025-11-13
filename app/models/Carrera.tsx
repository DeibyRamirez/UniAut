import mongoose, { Schema, Document } from "mongoose"

export interface ICarrera extends Document {
  titulo: string
  descripcion: string
  modalidad: string
  duracion: string
  imagenR: string
  videoUrl?: string // ✅ Nuevo campo
}

const CarreraSchema = new Schema<ICarrera>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  modalidad: { type: String, required: true },
  duracion: { type: String, required: true },
  imagenR: { type: String, required: true },
  videoUrl: { type: String, default: "" }, // ✅ nuevo campo en el schema
})

export default mongoose.models.Carrera || mongoose.model<ICarrera>("Carrera", CarreraSchema)
