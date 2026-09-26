import { Database } from "../db";

export class AuthRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Begin progress for user
  async registerUser(email: string, birthDate: Date, hash: string) {
    const queryText = `
        INSERT INTO users (email, birth_date, password_hash)
        VALUES ($1, $2, $3)
        RETURNING email;
    `;
    const result = await this.db.query(queryText, [email, birthDate, hash]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Begin progress for user
  async findUserByEmail(email: string) {
    const queryText = `
        SELECT id, email, birth_date, password_hash
        FROM users
        WHERE email = $1;
    `;
    const result = await this.db.query(queryText, [email]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
