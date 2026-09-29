import { Objective } from "@repo/validations";
import { Database } from "../db";

export class CourseRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Create section for admin
  async createSection(adminId: string, title: string) {
    const queryText = `
        INSERT INTO sections (admin_id, title)
        VALUES ($1, $2)
        RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [adminId, title]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Create objective for section
  async createObjective(formData: Objective) {
    const { label, description, sectionId } = formData;
    const queryText = `
        INSERT INTO objectives (label, description, section_id)
        VALUES ($1, $2, $3)
        RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [
      label,
      description,
      sectionId,
    ]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get all sections
  async getAllSections() {
    const result = await this.db.query(`SELECT * FROM sections;`);
    if (result.rows.length === 0) return null;
    return result.rows;
  }
  // Get one section
  async getSection(sectionId: string) {
    const result = await this.db.query(
      `SELECT * FROM sections WHERE section_id = $1;`,
      [sectionId]
    );
    if (result.rows.length === 0) return null;
    return result.rows;
  }
  // Get all objectives
  async getAllObjectives() {
    const result = await this.db.query(`SELECT * FROM objectives;`);
    if (result.rows.length === 0) return null;
    return result.rows;
  }
  // Get objectives from section
  async getSectionObjectives(sectionId: string) {
    const result = await this.db.query(
      `SELECT * FROM objectives WHERE section_id = $1;`,
      [sectionId]
    );
    if (result.rows.length === 0) return [];
    return result.rows;
  }
  // Delete section
  async deleteSection(sectionId: string) {
    const result = await this.db.query(
      `DELETE FROM sections WHERE section_id = $1 RETURNING *;`,
      [sectionId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Delete objective
  async deleteObjective(objectiveId: string) {
    const result = await this.db.query(
      `DELETE FROM objectives WHERE objective_id = $1 RETURNING *;`,
      [objectiveId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
