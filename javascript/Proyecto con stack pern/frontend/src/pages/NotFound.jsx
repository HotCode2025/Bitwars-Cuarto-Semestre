import { Link } from 'react-router-dom'
import { Card } from '../components/ui'

function NotFound() {
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">404</h1>
        <h3 className="text-xl text-center">Pagina no encontrada</h3>
        <Link to="/" className="block text-center text-sky-400 mt-4">
          Volver al inicio
        </Link>
      </Card>
    </div>
  )
}

export default NotFound
