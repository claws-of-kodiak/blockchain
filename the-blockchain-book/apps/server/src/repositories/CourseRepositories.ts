import { Pool } from "pg";

export class CourseRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  // Begin progress for user
  async createSection(adminId: string, title: string) {
    const queryText = `
        INSERT INTO sections (admin_id, title)
        VALUES ($1, $2)
        RETURNING created_at;
    `;
    const result = await this.pool.query(queryText, [adminId, title]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get all sections
  async getSections() {
    const result = await this.pool.query(`SELECT * FROM sections;`);
    if (result.rows.length === 0) return null;
    return result.rows;
  }
  // Get all objectives
  async getObjectives() {
    const result = await this.pool.query(`SELECT * FROM objectives;`);
    if (result.rows.length === 0) return null;
    return result.rows;
  }
  // Delete section
  async deleteSection(sectionId: string) {
    const result = await this.pool.query(
      `DELETE FROM sections WHERE section_id = $1;`,
      [sectionId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get all objectives
  async deleteObjective(objectiveId: string) {
    const result = await this.pool.query(
      `DELETE FROM sections WHERE objective_id = $1;`,
      [objectiveId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
