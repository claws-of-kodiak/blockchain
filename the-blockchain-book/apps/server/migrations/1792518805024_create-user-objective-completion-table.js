/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('user_objective_completion', {
        user_id: { type: 'integer', notNull: true },
        objective_id: { type: 'integer', notNull: true },
        completed_at: { type: 'timestamp', notNull: true },
    });

    pgm.addConstraint('user_objective_completion', 'pk_user_objective_completion', {
        primaryKey: ['user_id', 'objective_id'],
    });
    pgm.dropTable("user_progress")
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    CREATE TABLE user_progress (
        user_id uuid NOT NULL,
        updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
        current_objective uuid NOT NULL,
        current_section uuid NOT NULL,
    
    -- Constraints
    CONSTRAINT user_progress_pkey PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_current_objective FOREIGN KEY (current_objective) REFERENCES objectives (id),
    CONSTRAINT fk_current_section FOREIGN KEY (current_section) REFERENCES sections (id)
);
`);
pgm.dropConstraint("user_objective_completion", "pk_user_objective_completion");
pgm.dropTable('user_objective_completion');
};


