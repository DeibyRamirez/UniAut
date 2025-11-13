// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import db from "@/lib/mongodb"
import clientPromise, { COLLECTIONS } from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        console.log("🔐 Iniciando proceso de login...")

        const body = await request.json()
        console.log("📨 Datos recibidos:", body)

        const { correoElectronico, password } = body

        if (!correoElectronico || !password) {
            console.log("❌ Campos faltantes")
            return NextResponse.json(
                {
                    success: false,
                    error: "Correo electrónico y contraseña son requeridos"
                },
                { status: 400 }
            )
        }

        console.log("🔍 Buscando usuario:", correoElectronico)

        // Verificar conexión a la base de datos
        let client
        try {
            client = await db
            console.log("✅ Conexión a MongoDB establecida")
        } catch (dbError) {
            console.error("❌ Error de conexión a MongoDB:", dbError)
            return NextResponse.json(
                {
                    success: false,
                    error: "Error de conexión a la base de datos"
                },
                { status: 500 }
            )
        }

        // Buscar usuario
        let usuario
        try {
            const db = client.db('UniBoost');
            usuario = await db.collection(COLLECTIONS.USUARIOS).findOne({
                correoelectronico: correoElectronico,
                password: password
            })

            console.log("👤 Usuario encontrado:", usuario ? "Sí" : "No")
        } catch (findError) {
            console.error("❌ Error buscando usuario:", findError)
            return NextResponse.json(
                {
                    success: false,
                    error: "Error buscando usuario"
                },
                { status: 500 }
            )
        }

        // Verificar si el usuario existe
        if (!usuario) {
            console.log("❌ Usuario no encontrado")
            return NextResponse.json(
                {
                    success: false,
                    error: "Credenciales incorrectas"
                },
                { status: 401 }
            )
        }

        console.log("🔑 Verificando contraseña...")

        // Verificar contraseña
        const passwordValido = password === usuario.password
        console.log("Contraseña válida:", passwordValido)

        if (!passwordValido) {
            console.log("❌ Contraseña incorrecta")
            return NextResponse.json(
                {
                    success: false,
                    error: "Credenciales incorrectas"
                },
                { status: 401 }
            )
        }

        console.log("✅ Login exitoso para:", usuario.correoElectronico)

        const userData = {
            id: usuario._id.toString(),
            nombreCompleto: usuario.nombreCompleto,
            correoElectronico: usuario.correoelectronico,
        }

        const response = NextResponse.json({
            success: true,
            user: userData,
            message: "Login exitoso"
        })

        return response

    } catch (error) {
        console.error("💥 Error general en login:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Error interno del servidor: " + (error instanceof Error ? error.message : 'Unknown error')
            },
            { status: 500 }
        )
    }
}