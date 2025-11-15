// app/api/auth/logout/route.ts
import { request } from "https"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        console.log("🚪 Cerrando sesión...")

        // En una aplicación real, aquí invalidarías tokens JWT
        // o limpiarías cookies de sesión

        return NextResponse.json({
            success: true,
            message: "Sesión cerrada exitosamente"

        })



    } catch (error) {
        console.error("❌ Error en logout:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Error al cerrar sesión"
            },
            { status: 500 }
        )
    }
}