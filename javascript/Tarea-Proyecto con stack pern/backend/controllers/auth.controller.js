import bcrypt from "bcrypt";
import md5 from "md5";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

const cookieOptions = {
  httpOnly: true,
  // los navegadores descartan las cookies SameSite=None que no son Secure
  secure: true,
  sameSite: "none",
  maxAge: 60 * 60 * 24 * 1000, // 1 dia
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

  if (result.rowCount === 0) {
    return res.status(400).json({ message: "El correo no esta registrado" });
  }

  const { password: hash, ...usuario } = result.rows[0];
  const validPassword = await bcrypt.compare(password, hash);

  if (!validPassword) {
    return res.status(400).json({ message: "La contraseña es incorrecta" });
  }

  const token = await createAccessToken({ id: usuario.id });
  res.cookie("token", token, cookieOptions);
  return res.json(usuario);
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

    const result = await pool.query(
      "INSERT INTO usuarios (name, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING id, name, email, fecha_registro, fecha_actualizacion, gravatar",
      [name, email, hashedPassword, gravatar]
    );

    const token = await createAccessToken({ id: result.rows[0].id });
    res.cookie("token", token, cookieOptions);
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.json({ message: "Sesion cerrada" });
};

export const profile = async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, fecha_registro, fecha_actualizacion, gravatar FROM usuarios WHERE id = $1",
    [req.usuarioId]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ message: "El usuario no existe" });
  }
  return res.json(result.rows[0]);
};
