import { NextResponse } from "next/server"
import { carrerasMock } from "@/lib/data-mock"
import clientPromise, { COLLECTIONS } from "@/lib/mongodb";

// ===============================
// ⚙️ GET: Obtener todas las carreras
// ===============================
export async function GET() {
  try {
    
    const client = await clientPromise;
    const db = client.db('UniBoost');
    console.log('Conectado a la base de datos MongoDB');
    const carreras = await db
      .collection(COLLECTIONS.CARRERAS)
      .find({})
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: carreras,
    });
    

    // Datos de ejemplo mientras no esté conectado MongoDB
    return NextResponse.json({
      success: true,
      data: carrerasMock,
    })
  } catch (error) {
    console.error("[v0] Error al obtener carreras:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las carreras",
      },
      { status: 500 },
    )
  }
}

// ===============================
// ⚙️ POST: Crear una carrera
// ===============================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.titulo || !body.descripcion) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("UniBoost");

    const newCarrera = {
      titulo: body.titulo,
      descripcion: body.descripcion,
      duracion: body.duracion || null,
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTIONS.CARRERAS).insertOne(newCarrera);

    return NextResponse.json(
      { success: true, data: { ...newCarrera, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando carrera:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
