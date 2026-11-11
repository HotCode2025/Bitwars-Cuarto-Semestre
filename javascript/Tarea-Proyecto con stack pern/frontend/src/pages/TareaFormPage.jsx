import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Input, Label, Textarea } from '../components/ui'
import { useTareas } from '../context/TareasContext'

function TareaFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const params = useParams()
  const { crearTarea, editarTarea, cargarTarea, errors: tareasErrors } = useTareas()

  const onSubmit = handleSubmit(async (data) => {
    const tarea = params.id ? await editarTarea(params.id, data) : await crearTarea(data)
    if (tarea) navigate('/tareas')
  })

  useEffect(() => {
    if (!params.id) return
    cargarTarea(params.id).then((tarea) => {
      if (!tarea) return
      setValue('titulo', tarea.titulo)
      setValue('descripcion', tarea.descripcion ?? '')
    })
  }, [])

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tareasErrors.map((error) => (
          <p key={error} className="bg-red-500 text-white p-2">
            {error}
          </p>
        ))}
        <h2 className="text-3xl font-bold my-4">{params.id ? 'Editar tarea' : 'Crear tarea'}</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input id="titulo" type="text" placeholder="Titulo" autoFocus {...register('titulo', { required: true })} />
          {errors.titulo && <span className="text-red-500">El titulo es requerido</span>}

          <Label htmlFor="descripcion">Descripcion</Label>
          <Textarea id="descripcion" placeholder="Descripcion" rows={3} {...register('descripcion')} />

          <Button>{params.id ? 'Actualizar' : 'Guardar'}</Button>
        </form>
      </Card>
    </div>
  )
}

export default TareaFormPage
