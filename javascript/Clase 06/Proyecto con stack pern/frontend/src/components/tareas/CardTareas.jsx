import { useNavigate } from 'react-router-dom'
import { PiPencil, PiTrashSimpleLight } from 'react-icons/pi'
import { Button, Card } from '../ui'
import { useTareas } from '../../context/TareasContext'

export function CardTareas({ tarea }) {
  const { eliminarTarea } = useTareas()
  const navigate = useNavigate()

  const eliminar = async () => {
    if (window.confirm('¿Estas seguro de eliminar esta tarea?')) {
      await eliminarTarea(tarea.id)
    }
  }

  return (
    <Card className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
        <p className="py-4">{tarea.descripcion}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>
          <PiPencil className="text-white" />
          Editar
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={eliminar}>
          <PiTrashSimpleLight className="text-white" />
          Eliminar
        </Button>
      </div>
    </Card>
  )
}
