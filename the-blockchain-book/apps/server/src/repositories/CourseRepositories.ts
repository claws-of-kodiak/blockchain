import { Pool, QueryResult } from "pg";

export class CourseRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  // Begin progress for user
  async beginCourse(userId: string) {
    const queryText = `
        INSERT INTO user_progress (user_id, current_step)
        VALUES ($1, $2)
        RETURNING updated_at;
    `;
    const result = await this.pool.query(queryText, [userId, 0.1]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get user progress
  async getProgressById(userId: string) {
    const result = await this.pool.query(
      `
      SELECT current_step FROM user_progress WHERE user_id = $1
      `,
      [userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Unlock next step
  async unlockNextStep(userId: string, nextStep: number) {
    const result = await this.pool.query(
      `UPDATE user_progress SET current_step = $1 WHERE user_id = $2 RETURNING current_step`,
      [nextStep, userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
