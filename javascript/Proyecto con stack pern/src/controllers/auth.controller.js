import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const signin = (req, res) => res.send("ingresando");

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, fecha_registro, fecha_actualizacion",
      [name, email, hashedPassword]
    );

    const token = await createAccessToken({ id: result.rows[0].id });
    res.cookie("token", token, {
      httpOnly: true,
      // los navegadores descartan las cookies SameSite=None que no son Secure
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000, // 1 dia
    });
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }
    next(error);
  }
};

export const signout = (req, res) => res.send("cerrando sesion");

export const profile = (req, res) => res.send("perfil del usuario");
