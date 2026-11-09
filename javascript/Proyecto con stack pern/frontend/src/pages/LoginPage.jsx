import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Input, Label } from '../components/ui'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { signin, errors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data)
    if (user) navigate('/perfil')
  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {errors &&
          errors.map((error) => (
            <p key={error} className="bg-red-500 text-white p-2 text-center">
              {error}
            </p>
          ))}
        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesion</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Ingrese su email" {...register('email', { required: true })} />

          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            {...register('password', { required: true })}
          />

          <Button>Ingresar</Button>
        </form>
        <div className="flex justify-between my-4">
          <p>¿No tenes una cuenta?</p>
          <Link to="/register" className="font-bold">
            Registrate
          </Link>
        </div>
      </Card>
    </Container>
  )
}

export default LoginPage
