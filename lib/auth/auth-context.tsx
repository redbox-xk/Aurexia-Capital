'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - in production, call your API
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Demo accounts for testing
      const demoAccounts: Record<string, { password: string; user: User }> = {
        'client@aurexia.com': {
          password: 'demo123',
          user: {
            id: '1',
            email: 'client@aurexia.com',
            name: 'John Client',
            role: 'client',
          },
        },
        'admin@aurexia.com': {
          password: 'demo123',
          user: {
            id: '2',
            email: 'admin@aurexia.com',
            name: 'Admin User',
            role: 'admin',
          },
        },
      }

      const account = demoAccounts[email]
      if (!account || account.password !== password) {
        throw new Error('Invalid email or password')
      }

      setUser(account.user)
      localStorage.setItem('auth_user', JSON.stringify(account.user))
      localStorage.setItem('auth_token', `token_${Date.now()}`)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
