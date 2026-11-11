import axios from './axios'

export const crearTareaRequest = (tarea) => axios.post('/tareas', tarea)

export const obtenerTareasRequest = () => axios.get('/tareas')

export const listarTareaRequest = (id) => axios.get(`/tareas/${id}`)

export const actualizarTareaRequest = (id, tarea) => axios.put(`/tareas/${id}`, tarea)

export const eliminarTareaRequest = (id) => axios.delete(`/tareas/${id}`)
