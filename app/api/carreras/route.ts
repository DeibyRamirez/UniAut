import { NextResponse } from "next/server"
import { carrerasMock } from "@/lib/data-mock"
import clientPromise, { COLLECTIONS } from "@/lib/mongodb";

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
