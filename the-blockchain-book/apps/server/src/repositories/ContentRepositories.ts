import { Database } from "../db";

export class ContentRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  // Get content by Id
  async getContentByObjective(contentId: string) {
    const result = await this.db.query(
      `
        SELECT * FROM content WHERE objective_id = $1
        `,
      [contentId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
  // Create content for objective
  async createContent(objectiveId: string, text: string, userId: string) {
    try {
      const queryText = `
      INSERT INTO content (objective_id, text, last_user)
      VALUES ($1, $2, $3)
        RETURNING updated_at;
    `;
      const result = await this.db.query(queryText, [
        objectiveId,
        text,
        userId,
      ]);
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
  // Update existing content for objective
  async updateContent(contentId: string, text: string, userId: string) {
    try {
      const result = await this.db.query(
        `
          UPDATE content
          SET text = $1, last_user = $2
          WHERE content_id = $3
          RETURNING updated_at
          `,
        [text, userId, contentId]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
  // Delete content for objective
  async deleteContent(contentId: string) {
    try {
      const result = await this.db.query(
        `
          DELETE FROM content
          WHERE content_id = $1
          `,
        [contentId]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
}
