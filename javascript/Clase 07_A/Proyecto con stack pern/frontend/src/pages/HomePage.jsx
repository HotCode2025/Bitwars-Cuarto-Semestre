import { Card } from '../components/ui'

function HomePage() {
  return (
    <Card>
      <h1 className="text-3xl font-bold py-4">Esto es un proyecto PERN</h1>
      <h3 className="text-2xl">
        Una aplicacion de tareas con registro de usuarios, hecha con PostgreSQL, Express, React y Node.
      </h3>
    </Card>
  )
}

export default HomePage
