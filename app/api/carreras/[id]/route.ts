import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise, { COLLECTIONS } from "@/lib/mongodb";

// ===============================
// ✅ GET: Obtener carrera por ID
// ===============================
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID no proporcionado" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("UniBoost");

    const carrera = await db.collection(COLLECTIONS.CARRERAS).findOne({ _id: new ObjectId(id) });

    if (!carrera) {
      return NextResponse.json({ success: false, error: "Carrera no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: carrera }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo carrera:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

// ===============================
// ⚙️ PUT: Actualizar carrera por ID
// ===============================
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // ✅ Esperar los params correctamente (Next.js 14)
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID no proporcionado" }, { status: 400 });
    }

    const body = await request.json();

    // ✅ Nueva validación flexible
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No se recibieron datos para actualizar" },
        { status: 400 }
      );
    }

    // ✅ Conexión directa a MongoDB (sin Mongoose)
    const client = await clientPromise;
    const db = client.db("UniBoost");

    // Actualizar carrera
    const result = await db.collection(COLLECTIONS.CARRERAS).updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (!result || result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Carrera no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Carrera actualizada correctamente",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error actualizando carrera:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
