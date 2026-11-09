import { Button, Card } from '../ui'
import { eliminarTareaRequest } from '../../api/tareas.api'

export function CardTareas({ tarea }) {
  const eliminar = async () => {
    if (window.confirm('¿Estas seguro de eliminar esta tarea?')) {
      await eliminarTareaRequest(tarea.id)
    }
  }

  return (
    <Card className="px-7 py-4">
      <div>
        <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
        <p>{tarea.descripcion}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button>Editar</Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={eliminar}>
          Eliminar
        </Button>
      </div>
    </Card>
  )
}
