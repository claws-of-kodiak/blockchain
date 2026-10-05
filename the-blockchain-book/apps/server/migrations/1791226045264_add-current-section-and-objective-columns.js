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
    pgm.sql(`
    ALTER TABLE user_progress 
    ADD COLUMN current_objective integer DEFAULT 0 NOT NULL;
`);
pgm.sql(`
    ALTER TABLE user_progress 
    ADD COLUMN current_section integer DEFAULT 0 NOT NULL;
`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropColumn('user_progress', 'current_section')
    pgm.dropColumn('user_progress', 'current_objective')
};
