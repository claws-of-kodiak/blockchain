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
    const queryText = `
      SELECT s.section_id AS "sectionId", s.title AS "sectionTitle",
        o.objective_id AS "objectiveId", o.label AS "objectiveLabel"
      FROM objectives o
      JOIN sections s ON s.section_id = o.section_id
      LEFT JOIN user_objective_completion c
        ON c.objective_id = o.objective_id AND c.user_id = $1
      WHERE c.objective_id IS NULL
      ORDER BY s.position, o.position 
      LIMIT 1;    
      `;
    const result = await this.db.query(queryText, [userId]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get next objective
  async getNextObjective(currentObjectiveId: string) {
    const queryText = `
      SELECT o.objective_id AS "objectiveId", o.label AS "objectiveLabel",
        s.section_id AS "sectionId", s.title AS "sectionTitle"
      FROM objectives o
      JOIN sections s ON s.section_id = o.section_id
      WHERE o.position = (
        SELECT position + 1 FROM objectives WHERE objective_id = $1
      )
      LIMIT 1;
    `;
    const result = await this.db.query(queryText, [currentObjectiveId]);
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

  // Add objective to completion table
  async unlockNextStep(userId: string, objectiveId: string) {
    try {
      const result = await this.db.query(
        `
        INSERT INTO user_objective_completion (user_id, objective_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *
        `,
        [userId, objectiveId]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (err) {
      console.error("Unlock next step error", err);
      throw err;
    }
  }
  async deleteProgress(userId: string) {
    const result = await this.db.query(
      `DELETE FROM user_objective_completion WHERE user_id = $1 RETURNING *`,
      [userId]
    );
    return result.rows;
  }
}
