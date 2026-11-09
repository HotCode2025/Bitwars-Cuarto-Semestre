import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Input, Label } from '../components/ui'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signup, errors: signupErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data)
    if (user) navigate('/perfil')
  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {signupErrors &&
          signupErrors.map((error) => (
            <p key={error} className="bg-red-500 text-white p-2 text-center">
              {error}
            </p>
          ))}
        <h3 className="text-4xl font-bold my-2">Registro</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Ingrese su nombre" {...register('name', { required: true })} />
          {errors.name && <p className="text-red-500">Este campo es requerido</p>}

          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Ingrese su email" {...register('email', { required: true })} />
          {errors.email && <p className="text-red-500">Este campo es requerido</p>}

          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-red-500">Este campo es requerido</p>}

          <Button>Registrarse</Button>
        </form>
        <div className="flex justify-between my-4">
          <p>¿Ya tenes una cuenta?</p>
          <Link to="/login" className="font-bold">
            Iniciar sesion
          </Link>
        </div>
      </Card>
    </Container>
  )
}

export default RegisterPage
