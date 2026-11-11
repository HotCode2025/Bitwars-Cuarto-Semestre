import { existsSync } from "node:fs";

if (existsSync(".env")) process.loadEnvFile();

export const PORT = process.env.PORT || 3000;

export const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const DB = {
  port: process.env.PG_PORT || 5432,
  host: process.env.PG_HOST || "localhost",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE || "pern",
};
