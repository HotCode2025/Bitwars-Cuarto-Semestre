import { existsSync } from "node:fs";

if (existsSync(".env")) process.loadEnvFile();

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const DB = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
