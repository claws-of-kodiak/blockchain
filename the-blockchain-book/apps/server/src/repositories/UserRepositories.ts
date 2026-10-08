import { Database } from "../db";

export class UserRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Begin progress for user
  async beginCourse(userId: string, objectiveId: string, sectionId: string) {
    const queryText = `
        INSERT INTO user_progress (user_id, current_objective, current_section)
        VALUES ($1, $2, $3)
        RETURNING updated_at;
    `;
    const result = await this.db.query(queryText, [
      userId,
      objectiveId,
      sectionId,
    ]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get user progress
  async getProgressById(userId: string) {
    const result = await this.db.query(
      `
      SELECT current_objective, current_section FROM user_progress WHERE user_id = $1
      `,
      [userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get user progress
  async getUserById(userId: string) {
    const result = await this.db.query(
      `
      SELECT id, email, birth_date, created_at, is_admin FROM users WHERE id = $1
      `,
      [userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Unlock next step
  async unlockNextStep(userId: string, nextObj: number) {
    const result = await this.db.query(
      `UPDATE user_progress SET current_objective = $1 WHERE user_id = $2 RETURNING current_objective`,
      [nextObj, userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  async deleteProgress(userId: string) {
    const result = await this.db.query(
      `DELETE FROM user_progress WHERE user_id = $1`,
      [userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
