import { NextResponse } from "next/server"
import type { UsuarioRegistro } from "@/types"
import clientPromise, { COLLECTIONS } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body: UsuarioRegistro = await request.json()

    // Validación básica
    if (!body.nombreCompleto || !body.correoElectronico || !body.telefono || !body.rol) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos",
        },
        { status: 400 },
      )
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.correoElectronico)) {
      return NextResponse.json(
        {
          success: false,
          error: "Correo electrónico inválido",
        },
        { status: 400 },
      )
    }


    const client = await clientPromise;
    const db = client.db('UniBoost');

    // Verificar si el correo ya existe
    const existingUser = await db
      .collection(COLLECTIONS.USUARIOS)
      .findOne({ correoElectronico: body.correoElectronico });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Este correo ya está registrado',
        },
        { status: 400 }
      );
    }

    // Insertar nuevo usuario en MongoDB
    const result = await db
      .collection(COLLECTIONS.USUARIOS)
      .insertOne({
        ...body,
        fechaRegistro: new Date(),
      });

    if (!result.acknowledged) {
      return NextResponse.json(
        { success: false, error: 'No se pudo crear el usuario en la base de datos' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: result.insertedId },
      message: 'Usuario registrado exitosamente',
    });


    // Simulación mientras no esté conectado MongoDB
    console.log("[v0] Usuario registrado (simulación):", body)

    return NextResponse.json({
      success: true,
      data: { id: "mock-id-" + Date.now() },
      message: "Usuario registrado exitosamente",
    })
  } catch (error) {
    console.error("[v0] Error al registrar usuario:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al procesar el registro",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("UniBoost");

    // Obtener todos los usuarios
    const usuarios = await db
      .collection(COLLECTIONS.USUARIOS)
      .find({})
      .toArray();

    return NextResponse.json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    console.error("[GET usuarios] Error:", error);

    return NextResponse.json(
      { success: false, error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}