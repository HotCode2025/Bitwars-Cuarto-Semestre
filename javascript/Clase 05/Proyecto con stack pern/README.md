# PERN Stack: aplicación de tareas

Proyecto con PostgreSQL, Express, React y Node, todo en JavaScript y con pnpm.

## Cómo levantarlo

1. Copiar `.env.example` a `.env` y completar los datos de PostgreSQL.
2. Crear la base `pern` y ejecutar `database/init.sql`.
3. Instalar y arrancar:

```bash
pnpm install
pnpm dev
```

El servidor queda en `http://localhost:3000`.

Si PowerShell bloquea `pnpm` por la política de scripts de Windows, usar `pnpm.cmd` (por ejemplo, `pnpm.cmd dev`).

En esta compu PostgreSQL corre en una instancia propia, en el puerto 5433, que no arranca sola con Windows. Antes de `pnpm dev`, en PowerShell:

```powershell
pg_ctl start -D "$env:LOCALAPPDATA\pern-postgres\data" -l "$env:LOCALAPPDATA\pern-postgres\postgres.log" -o "-p 5433"
```

## Parte 1: backend con Express

- Estructura en `backend/`: `controllers`, `router`, `middlewares`, `schemas`, `libs`.
- `index.js` arranca el servidor y `app.js` lo configura.
- `morgan` muestra las peticiones por consola.
- `express.json` y `express.urlencoded` convierten lo que llega en objetos de JavaScript.
- Un middleware final maneja los errores y responde con estado 500.
- Las rutas llaman a controladores, que por ahora solo responden un texto.

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/` | Mensaje de bienvenida (JSON) |
| GET | `/api/tareas` | obteniendo tareas |
| GET | `/api/tareas/:id` | obteniendo tarea unica |
| POST | `/api/tareas` | creando tarea |
| PUT | `/api/tareas/:id` | actualizando tarea unica |
| DELETE | `/api/tareas/:id` | eliminando tarea unica |
| POST | `/api/signin` | ingresando |
| POST | `/api/signup` | registrando |
| POST | `/api/signout` | cerrando sesion |
| GET | `/api/profile` | perfil del usuario |

## Parte 2: base de datos y CRUD de tareas

- `db.js` conecta con PostgreSQL usando el driver `pg` y un `Pool`.
- Los datos de conexión están en `.env`, que no se sube al repositorio, y los lee `config.js`.
- `database/init.sql` crea la tabla `tareas`, con título obligatorio.
- Las consultas usan parámetros (`$1`, `$2`) para no armar SQL con lo que manda el usuario.
- `express-promise-router` manda al manejador de errores lo que falle en las funciones async.

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/api/tareas` | 200 y la lista de tareas |
| GET | `/api/tareas/:id` | 200 y la tarea, o 404 si no existe |
| POST | `/api/tareas` | 200 y la tarea creada |
| PUT | `/api/tareas/:id` | 200 y la tarea actualizada, o 404 si no existe |
| DELETE | `/api/tareas/:id` | 204 sin contenido, o 404 si no existe |

## Parte 3: registro de usuarios

- `database/init.sql` suma la tabla `usuarios`, con email único y fechas automáticas.
- `POST /api/signup` recibe `name`, `email` y `password`.
- La contraseña se guarda encriptada con `bcrypt`, nunca en texto plano.
- `libs/jwt.js` genera un token JWT con el id del usuario, que vence en un día.
- El token viaja en una cookie `httpOnly`, que JavaScript no puede leer desde el navegador.
- La respuesta devuelve los datos del usuario sin la contraseña. Si el correo ya existe, responde 400.

## Parte 4: rutas protegidas

- `cookie-parser` convierte las cookies de la petición en un objeto (`req.cookies`).
- El middleware `isAuth` verifica el token: si falta o es inválido, responde 401 con "No estas autorizado".
- Si el token es válido, guarda el id del usuario en `req.usuarioId` y sigue con `next()`.
- Protege todas las rutas de tareas y `GET /api/profile`.

## Parte 5: fin del backend e inicio del frontend

Backend:

- `POST /api/signin` busca el correo, compara la contraseña con `bcrypt` y guarda el token en la cookie.
- `POST /api/signout` borra la cookie y `GET /api/profile` devuelve los datos del usuario logueado.
- Cada tarea tiene un `usuario_id`: cada usuario solo ve, edita y elimina las suyas.
- Al registrarse se genera el avatar con Gravatar a partir del hash `md5` del correo.

Frontend (`frontend/`, con Vite y React):

```bash
cd frontend
pnpm install
pnpm dev
```

- Queda en `http://localhost:5173`.
- `react-router-dom` define las páginas de `src/pages`.
- Tailwind CSS para los estilos y componentes reutilizables en `src/components/ui`.
- El formulario de registro se valida con `react-hook-form`.

## Parte 6: conexión del frontend con el backend

Backend:

- `cors` permite las peticiones desde `http://localhost:5173`, con credenciales para que viaje la cookie.
- `zod` valida los datos en `backend/schemas`, y el middleware `validateSchema` responde 400 con la lista de errores.

Frontend:

- `axios` hace las peticiones, configurado en `src/api`.
- `AuthContext` guarda el usuario y si está autenticado, y lo comparte con toda la app mediante `useAuth`.
- Al recargar la página, pide `/api/profile` para recuperar la sesión desde la cookie.
- `ProtectedRoute` decide qué páginas se ven según haya sesión o no, y la barra de navegación cambia igual.
- Los errores del backend se muestran en los formularios.
- Se pueden crear, listar y eliminar tareas desde la página.

## Parte 7: tareas completas y producción

- `TareasContext` centraliza crear, listar, editar y eliminar tareas, mediante `useTareas`.
- El mismo formulario crea o edita según haya un `id` en la URL.
- Mientras se comprueba la sesión se muestra "Cargando...", así recargar no saca al usuario de la página.
- Los títulos se pueden repetir.
- Diseño adaptable a pantallas chicas, íconos con `react-icons` y avatar de Gravatar en la barra.
- Los errores desaparecen solos a los 4 segundos.
- `GET /api/ping` comprueba la conexión con la base de datos.
- `src` pasó a llamarse `backend`, y el puerto, la base y el origen se configuran por variables de entorno.

### Despliegue en Railway

Se crean tres servicios en un mismo proyecto, desde el repositorio de GitHub:

1. **PostgreSQL:** ejecutar `database/init.sql` en la base nueva.
2. **Backend** (raíz del repositorio), con estas variables: `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_DATABASE`, `TOKEN_SECRET` y `ORIGIN` (URL del frontend con `https://` y sin barra final).
3. **Frontend** (directorio raíz `frontend`), con la variable `VITE_BACKEND` (URL del backend con `https://`, terminada en `/api`).
