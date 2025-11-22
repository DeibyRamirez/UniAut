import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise, { COLLECTIONS } from "@/lib/mongodb";

// ===============================
// ⚙️ PUT: Actualizar usuario por ID
// ===============================
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID no proporcionado" }, { status: 400 });
    }

    const body = await request.json();

    console.log("📨 Datos recibidos en PUT usuario:", body);

    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No se recibieron datos para actualizar" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("UniBoost");

    // Campos permitidos para actualizar
    const updateData = {
      ...(body.nombreCompleto && { nombreCompleto: body.nombreCompleto }),
      ...(body.correoElectronico && { correoElectronico: body.correoElectronico }),
      ...(body.telefono && { telefono: body.telefono }),
      ...(body.rol && { rol: body.rol }),
      ...(body.password && { password: body.password }), // si deseas permitir cambiar la contraseña
      updatedAt: new Date(),
    };

    console.log("🔄 Actualizando usuario con:", updateData);

    const result = await db.collection(COLLECTIONS.USUARIOS).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (!result || result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usuario actualizado correctamente",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
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
// ⚙️ DELETE: Eliminar usuario por ID
// ===============================
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID no proporcionado" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("UniBoost");

    const result = await db.collection(COLLECTIONS.USUARIOS).deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
