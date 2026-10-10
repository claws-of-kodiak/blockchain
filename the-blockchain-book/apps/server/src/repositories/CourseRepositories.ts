import { Objective } from "@repo/validations";
import { Database } from "../db";

export class CourseRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Create section for admin at highest position
  async createSection(userId: string, title: string) {
    const queryText = `
      INSERT INTO sections (admin_id, title, position)
      VALUES (
       $1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM sections)
      )
       RETURNING created_at;
    `;
    const result = await this.db.query(queryText, [userId, title]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  async insertSection(adminId: string, title: string, position: number) {
    try {
      const result = await this.db.transaction(async (client) => {
        await client.query(
          `
          UPDATE sections 
          SET position = position + 1     
          WHERE position >= $1
          `,
          [position]
        );
        const newSection = await client.query(
          `
            INSERT INTO sections (admin_id, title, position) 
            VALUES ($1, $2, $3)
            RETURNING created_at
          `,
          [adminId, title, position]
        );
        return newSection.rows[0];
      });
      return result;
    } catch (err) {
      console.error("Transaction failed to commit", err);
      throw err;
    }
  }
  // NEED TO SHIFT POSTIONS DOWN AFTER DELETE
  async deleteSection(sectionId: string) {
    try {
      const result = await this.db.transaction(async (client) => {
        const response = await client.query(
          `
            DELETE FROM sections WHERE section_id = $1 RETURNING position;`,
          [sectionId]
        );
        await client.query(
          `
            UPDATE sections 
            SET position = position - 1     
            WHERE position > $1
            `,
          [response.rows[0].position]
        );
        return true;
      });
      return result;
    } catch (err) {
      console.error("Transaction failed to commit", err);
      throw err;
    }
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
  async insertObjective(formData: Objective) {
    const { label, description, sectionId, position } = formData;
    try {
      const result = await this.db.transaction(async (client) => {
        await client.query(
          `
            UPDATE objectives 
            SET position = position + 1     
            WHERE position >= $1
            `,
          [position]
        );
        const newObjective = await client.query(
          `
            INSERT INTO objectives (label, description, section_id, position)
            VALUES ($1, $2, $3, $4)
            RETURNING created_at;
            `,
          [label, description, sectionId, position]
        );
        return newObjective.rows[0];
      });
      return result;
    } catch (err) {
      console.error("Transaction failed to commit", err);
      throw err;
    }
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
