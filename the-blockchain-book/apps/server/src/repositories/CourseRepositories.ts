import { Database } from "../db";

export class CourseRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Create section for admin
  async createSection(adminId: string, title: string) {
    // This checks if any sections then add appropiate position
    // If no sections position = 1
    // NEED TO UPDATE sections TO AUTO INCREMENT FROM HIGHEST
    // If sections position = highest poition + 1

    const queryText = `
        INSERT INTO sections (admin_id, title)
        VALUES ($1, $2)
        RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [adminId, title]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  async insertSection(adminId: string, title: string, position: number) {
    // This adds one to all the positions above position prop
    // Then it inserts this new section in at position given
    const queryText = `
        INSERT INTO sections (admin_id, title, position)
        VALUES ($1, $2, $3)
        RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [adminId, title, position]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Create objective for section
  async createObjective(formData: Objective) {
    const { label, description, sectionId, position } = formData;
    const queryText = `
        INSERT INTO objectives (label, description, section_id, position)
        VALUES ($1, $2, $3, $4)
        RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [
      label,
      description,
      sectionId,
      position,
    ]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Get first steps
  async getFirstSteps() {
    const queryText = `
    WITH first_section AS (
        SELECT section_id, title
        FROM sections
        WHERE position = 1
        LIMIT 1
    )
    SELECT 
      fs.section_id,
      fs.title AS title,
      o.objective_id,
      o.label AS label
    FROM first_section fs
    LEFT JOIN objectives o 
      ON o.section_id = fs.section_id 
      AND o.position = 1;`;
    const result = await this.db.query(queryText);
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
  async getSectionById(sectionId: string) {
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
