// context/AuthContext.tsx
"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Define el tipo de usuario
interface User {
    id: string
    nombreCompleto: string
    correoElectronico: string
}

// Define el tipo del contexto
interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    loading: boolean
    isAuthenticated: boolean
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true) // Loading inicial
    const router = useRouter()

    // Efecto para cargar el usuario desde localStorage al iniciar
    useEffect(() => {
        const checkAuth = () => {
            try {
                const savedUser = localStorage.getItem('user')
                if (savedUser) {
                    setUser(JSON.parse(savedUser))
                    console.log("✅ Usuario cargado desde localStorage")
                }
            } catch (error) {
                console.error("❌ Error cargando usuario:", error)
                localStorage.removeItem('user') // Limpiar datos corruptos
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    // Función de login
    const login = async (correoElectronico: string, password: string): Promise<boolean> => {
        try {
            setLoading(true)
            console.log("🔐 Intentando login...")

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correoElectronico, password })
            })

            const data = await response.json()
            console.log("📨 Respuesta del login:", data)

            if (data.success && data.user) {
                // Guardar usuario en estado y localStorage
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                console.log("✅ Login exitoso, usuario guardado")
                return true
            } else {
                console.log("❌ Login fallido:", data.error)
                return false
            }
        } catch (error) {
            console.error("💥 Error en login:", error)
            return false
        } finally {
            setLoading(false)
        }
    }

    // Función de logout
    const logout = async (): Promise<void> => {
        try {
            setLoading(true)
            console.log("🚪 Ejecutando logout...")

            // Llamar al endpoint de logout
            await fetch('/api/auth/logout', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        } catch (error) {
            console.error("❌ Error llamando a logout API:", error)
        } finally {
            // Siempre limpiar el estado local sin importar la respuesta del servidor
            setUser(null)
            localStorage.removeItem('user')
            setLoading(false)
            console.log("✅ Sesión local limpiada")
            
            // Redirigir al principal
            router.push('/')
        }
    }

    // Valor del contexto
    const contextValue: AuthContextType = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user // true si user no es null
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}