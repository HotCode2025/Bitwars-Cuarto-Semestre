import pg from "pg";
import { DB } from "./config.js";

export const pool = new pg.Pool(DB);

pool.on("connect", () => {
  console.log("conectado a la base de datos");
});
