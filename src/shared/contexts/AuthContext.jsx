import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock authentication logic
    if (email === "admin@matriz.com" && password === "admin123") {
      setUser({ 
        id: 1, 
        name: "Admin Principal", 
        email, 
        role: "admin",
        avatar: "/avatar-1.jpg"
      })
      setIsLoading(false)
      return { success: true, role: "admin" }
    } else if (email === "subadmin@matriz.com" && password === "subadmin123") {
      setUser({ 
        id: 2, 
        name: "Sub Admin", 
        email, 
        role: "subadmin",
        avatar: "/avatar-2.jpg"
      })
      setIsLoading(false)
      return { success: true, role: "subadmin" }
    } else if (email === "usuario@matriz.com" && password === "user123") {
      setUser({ 
        id: 3, 
        name: "Juan Pérez", 
        email, 
        role: "user",
        avatar: "/avatar-user.jpg"
      })
      setIsLoading(false)
      return { success: true, role: "user" }
    } else {
      setIsLoading(false)
      return { success: false, error: "Credenciales incorrectas" }
    }
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (userData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock registration
    const newUser = {
      id: Date.now(),
      name: userData.nombre,
      email: userData.email,
      role: "user",
      avatar: "/avatar-user.jpg"
    }
    
    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}