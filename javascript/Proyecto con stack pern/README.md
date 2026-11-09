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

En esta compu PostgreSQL corre en una instancia propia, en el puerto 5433, que no arranca sola con Windows. Antes de `pnpm dev`, en PowerShell:

```powershell
pg_ctl start -D "$env:LOCALAPPDATA\pern-postgres\data" -l "$env:LOCALAPPDATA\pern-postgres\postgres.log" -o "-p 5433"
```

## Parte 1: backend con Express

- Estructura en `src/`: `controllers`, `router`, `middlewares`, `schemas`, `libs`.
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
- `database/init.sql` crea la tabla `tareas`, con título único y obligatorio.
- Las consultas usan parámetros (`$1`, `$2`) para no armar SQL con lo que manda el usuario.
- `express-promise-router` manda al manejador de errores lo que falle en las funciones async.

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/api/tareas` | 200 y la lista de tareas |
| GET | `/api/tareas/:id` | 200 y la tarea, o 404 si no existe |
| POST | `/api/tareas` | 200 y la tarea creada, o 409 si el título ya existe |
| PUT | `/api/tareas/:id` | 200 y la tarea actualizada, o 404 si no existe |
| DELETE | `/api/tareas/:id` | 204 sin contenido, o 404 si no existe |
