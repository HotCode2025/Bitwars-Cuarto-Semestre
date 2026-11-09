import { Link, useLocation } from 'react-router-dom'
import { Container } from '../ui'
import { PrivateRoutes, PublicRoutes } from './navigation'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const location = useLocation()
  const { isAuth, signout } = useAuth()
  const rutas = isAuth ? PrivateRoutes : PublicRoutes

  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Proyecto PERN</h1>
        </Link>
        <ul className="flex gap-x-2">
          {rutas.map(({ name, path }) => (
            <li key={name} className={location.pathname === path ? 'bg-sky-500 text-white px-3 py-1' : 'text-slate-300'}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
          {isAuth && (
            <li className="text-slate-300">
              <button onClick={signout}>Salir</button>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
