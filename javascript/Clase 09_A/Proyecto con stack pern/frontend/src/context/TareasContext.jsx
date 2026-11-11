import { createContext, useContext, useEffect, useState } from 'react'
import {
  actualizarTareaRequest,
  crearTareaRequest,
  eliminarTareaRequest,
  listarTareaRequest,
  obtenerTareasRequest,
} from '../api/tareas.api'

const TareasContext = createContext()

export const useTareas = () => {
  const context = useContext(TareasContext)
  if (!context) throw new Error('useTareas debe usarse dentro de un TareasProvider')
  return context
}

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState([])
  const [errors, setErrors] = useState([])

  const guardarError = (error) => {
    const respuesta = error.response.data
    setErrors(Array.isArray(respuesta) ? respuesta : [respuesta.message])
  }

  const cargarTareas = async () => {
    const res = await obtenerTareasRequest()
    setTareas(res.data)
  }

  const cargarTarea = async (id) => {
    try {
      const res = await listarTareaRequest(id)
      return res.data
    } catch (error) {
      guardarError(error)
    }
  }

  const crearTarea = async (tarea) => {
    try {
      const res = await crearTareaRequest(tarea)
      setTareas([...tareas, res.data])
      return res.data
    } catch (error) {
      guardarError(error)
    }
  }

  const editarTarea = async (id, tarea) => {
    try {
      const res = await actualizarTareaRequest(id, tarea)
      return res.data
    } catch (error) {
      guardarError(error)
    }
  }

  const eliminarTarea = async (id) => {
    const res = await eliminarTareaRequest(id)
    if (res.status === 204) setTareas(tareas.filter((tarea) => tarea.id !== id))
  }

  useEffect(() => {
    if (errors.length === 0) return
    const timer = setTimeout(() => setErrors([]), 4000)
    return () => clearTimeout(timer)
  }, [errors])

  return (
    <TareasContext.Provider value={{ tareas, errors, cargarTareas, cargarTarea, crearTarea, editarTarea, eliminarTarea }}>
      {children}
    </TareasContext.Provider>
  )
}
