import { Pool } from "pg";
import "dotenv/config";

console.log(
  "👉",
  `\x1b[34m${process.env.DB_NAME}\x1b[0m`,
  "db live - port:",
  `\x1b[34m${process.env.DB_PORT}\x1b[0m`
);

console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 15,
  idleTimeoutMillis: 3000,
});

export default pool;
