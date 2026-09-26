import { Pool, QueryResult, QueryResultRow } from "pg";
import "dotenv/config";
import { camelizeKeys } from "./util/camelCase";

console.log(
  "👉",
  `\x1b[34m${process.env.DB_NAME}\x1b[0m`,
  "db live - port:",
  `\x1b[34m${process.env.DB_PORT}\x1b[0m`
);

export class Database {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const result = await this.pool.query(text, params);
    result.rows = result.rows.map((row) => camelizeKeys<T>(row));
    return result;
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 15,
  idleTimeoutMillis: 3000,
});

const db = new Database(pool);

export default db;
