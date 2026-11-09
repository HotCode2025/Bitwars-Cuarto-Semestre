import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, Label, Textarea } from '../components/ui'
import { crearTareaRequest } from '../api/tareas.api'

function TareaFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [postError, setPostError] = useState([])

  const onSubmit = handleSubmit(async (data) => {
    try {
      await crearTareaRequest(data)
      navigate('/tareas')
    } catch (error) {
      const respuesta = error.response.data
      setPostError(Array.isArray(respuesta) ? respuesta : [respuesta.message])
    }
  })

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {postError.map((error) => (
          <p key={error} className="bg-red-500 text-white p-2">
            {error}
          </p>
        ))}
        <h2 className="text-3xl font-bold my-4">Formulario de tareas</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input id="titulo" type="text" placeholder="Titulo" autoFocus {...register('titulo', { required: true })} />
          {errors.titulo && <span className="text-red-500">El titulo es requerido</span>}

          <Label htmlFor="descripcion">Descripcion</Label>
          <Textarea id="descripcion" placeholder="Descripcion" rows={3} {...register('descripcion')} />

          <Button>Guardar</Button>
        </form>
      </Card>
    </div>
  )
}

export default TareaFormPage
