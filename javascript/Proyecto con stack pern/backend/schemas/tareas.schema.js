import { z } from "zod";

export const createTareasSchema = z.object({
  titulo: z
    .string({ error: "El titulo es requerido" })
    .min(1, { message: "El titulo debe tener al menos un caracter" })
    .max(255, { message: "El titulo debe tener como maximo 255 caracteres" }),
  descripcion: z
    .string({ error: "La descripcion debe ser un texto" })
    .max(255, { message: "La descripcion debe tener como maximo 255 caracteres" })
    .optional(),
});

export const updateTareasSchema = createTareasSchema.partial();
