// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import clientPromise, { COLLECTIONS } from "@/lib/mongodb"

export async function POST(request: Request) {
    try {
        console.log("🔐 Iniciando proceso de login...")

        const body = await request.json()
        console.log("📨 Datos recibidos:", body)

        const { correoElectronico, password } = body

        if (!correoElectronico || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Correo electrónico y contraseña son requeridos"
                },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db('UniBoost')
        
        // Buscar usuario - nota que usamos correoelectronico (en minúsculas)
        const usuario = await db.collection(COLLECTIONS.USUARIOS).findOne({
            correoelectronico: correoElectronico.toLowerCase()
        })

        console.log("👤 Usuario encontrado:", usuario ? "Sí" : "No")

        if (!usuario) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Credenciales incorrectas"
                },
                { status: 401 }
            )
        }

        // ⚠️ PROBLEMA: Estás comparando contraseñas en texto plano
        // SOLUCIÓN TEMPORAL (para testing) - luego implementa bcrypt
        const passwordValido = password === usuario.password
        
        if (!passwordValido) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Credenciales incorrectas"
                },
                { status: 401 }
            )
        }

        console.log("✅ Login exitoso para:", usuario.correoelectronico)

        // Datos del usuario sin la contraseña
        const userData = {
            id: usuario._id.toString(),
            nombreCompleto: usuario.nombreCompleto,
            correoElectronico: usuario.correoelectronico,
            // Agrega más campos si los necesitas
        }

        return NextResponse.json({
            success: true,
            user: userData,
            message: "Login exitoso"
        })

    } catch (error) {
        console.error("💥 Error general en login:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Error interno del servidor"
            },
            { status: 500 }
        )
    }
}