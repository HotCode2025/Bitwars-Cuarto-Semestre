import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../api/axios'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  const iniciarSesion = async (ruta, data) => {
    try {
      const res = await axios.post(ruta, data)
      setUser(res.data)
      setIsAuth(true)
      setErrors(null)
      return res.data
    } catch (error) {
      const respuesta = error.response.data
      setErrors(Array.isArray(respuesta) ? respuesta : [respuesta.message])
    }
  }

  const signup = (data) => iniciarSesion('/signup', data)

  const signin = (data) => iniciarSesion('/signin', data)

  const signout = async () => {
    await axios.post('/signout')
    setUser(null)
    setIsAuth(false)
  }

  // la cookie es httpOnly: JavaScript no la puede leer, asi que se le pregunta al backend
  useEffect(() => {
    axios
      .get('/profile')
      .then((res) => {
        setUser(res.data)
        setIsAuth(true)
      })
      .catch(() => {
        setUser(null)
        setIsAuth(false)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!errors) return
    const timer = setTimeout(() => setErrors(null), 4000)
    return () => clearTimeout(timer)
  }, [errors])

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
