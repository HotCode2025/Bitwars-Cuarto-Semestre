import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { BiLogOut } from 'react-icons/bi'
import { Container } from '../ui'
import { PrivateRoutes, PublicRoutes } from './navigation'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const location = useLocation()
  const { isAuth, signout, user } = useAuth()
  const rutas = isAuth ? PrivateRoutes : PublicRoutes

  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Proyecto PERN</h1>
        </Link>
        <ul className="flex items-center justify-center gap-x-1">
          {rutas.map(({ name, path, icon }) => (
            <li key={name}>
              <Link
                to={path}
                aria-label={name}
                className={twMerge(
                  'text-slate-300 flex items-center gap-x-1 px-3 py-1',
                  location.pathname === path && 'bg-sky-500 text-white',
                )}
              >
                {icon}
                <span className={icon ? 'hidden sm:block' : ''}>{name}</span>
              </Link>
            </li>
          ))}
          {isAuth && (
            <>
              <li className="text-slate-300">
                <button onClick={signout} aria-label="Salir" className="flex items-center gap-x-1 px-3 py-1">
                  <BiLogOut className="h-5 w-5" />
                  <span className="hidden sm:block">Salir</span>
                </button>
              </li>
              <li className="flex gap-x-2 items-center justify-center">
                <img src={user.gravatar} alt={`Avatar de ${user.name}`} className="h-8 w-8 rounded-full" />
                <span className="font-medium">{user.name}</span>
              </li>
            </>
          )}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
