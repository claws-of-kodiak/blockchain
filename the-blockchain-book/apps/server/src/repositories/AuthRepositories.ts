import { Pool } from "pg";

export class AuthRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  // Begin progress for user
  async registerUser(email: string, birthDate: Date, hash: string) {
    const queryText = `
        INSERT INTO users ()
        VALUES ()
        RETURNING *;
    `;
    const result = await this.pool.query(queryText, [email, birthDate, hash]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
