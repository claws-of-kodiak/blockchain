import { Pool } from "pg";

export class CourseRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
}
