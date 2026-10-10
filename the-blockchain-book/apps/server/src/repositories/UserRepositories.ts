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
      SELECT 
        s.section_id,
        s.title AS section_title,
        o.objective_id,
        o.label AS objective_label
      FROM user_progress p
      LEFT JOIN sections s ON s.section_id = p.current_section
      LEFT JOIN objectives o ON o.objective_id = p.current_objective
      WHERE p.user_id = $1;
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
  // Try to move to next objective in same section, if doesnt exist try to move to next section, if doesnt exist course complete
  // SELECT objective_id and section_id where position = nextObj
  // Then SELECT section_id WHERE position is +1 current section_id and SELECT objective_id WHERE section_id is = next section
  // Then UPDATE user_progress

  // First, try simple increment to next objective
  // If fail, try to increment to next section and objective with position 1 in that section
  // If fail, Course has been completed! return no more steps to complete
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
