import { Pool, QueryResult } from "pg";

export class CourseRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  // Begin progress for user
  async beginCourse(userId: number) {
    const queryText = `
        INSERT INTO user_progress (user_id, current_step, updated_at)
        VALUES ($1, $2, $3)
        RETURNING updated_at;
    `;
    const result = await this.pool.query(queryText, [userId, 0.0, Date.now()]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
