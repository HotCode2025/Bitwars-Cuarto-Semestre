import { z } from "zod";

const email = z.email({ error: "El email debe tener un formato valido" });
const password = z
  .string({ error: "La contraseña es requerida" })
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .max(255, { message: "La contraseña debe tener como maximo 255 caracteres" });

export const signupSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(1, { message: "El nombre debe tener al menos un caracter" })
    .max(255, { message: "El nombre debe tener como maximo 255 caracteres" }),
  email,
  password,
});

export const signinSchema = z.object({ email, password });
