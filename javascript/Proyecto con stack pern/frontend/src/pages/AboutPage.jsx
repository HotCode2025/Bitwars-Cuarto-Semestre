function AboutPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center py-4 px-3">Tecnologias utilizadas</h1>
      <h3 className="text-xl text-center py-4 px-2">PostgreSQL, Express, React y Node.js, todo en JavaScript.</h3>
      <h2 className="text-2xl font-bold text-center py-4 px-2">Backend</h2>
      <h3 className="text-xl text-center py-4 px-2">
        API REST con Express, consultas con pg, validaciones con Zod y autenticacion con JWT en una cookie.
      </h3>
      <h2 className="text-2xl font-bold text-center py-4 px-2">Frontend</h2>
      <h3 className="text-xl text-center py-4 px-2">
        React con Vite, React Router, React Hook Form, Axios, Context y Tailwind CSS.
      </h3>
    </div>
  )
}

export default AboutPage
