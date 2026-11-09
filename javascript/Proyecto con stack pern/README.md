# PERN Stack: aplicación de tareas

Proyecto con PostgreSQL, Express, React y Node, todo en JavaScript y con pnpm.

## Cómo levantarlo

```bash
pnpm install
pnpm dev
```

El servidor queda en `http://localhost:3000`.

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

`config.js`, `db.js` y `database/init.sql` quedan vacíos hasta la etapa de la base de datos.
