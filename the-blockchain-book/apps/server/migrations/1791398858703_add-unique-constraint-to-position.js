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
        	ALTER TABLE sections
	        ADD CONSTRAINT uq_section_position
	        UNIQUE (section_id, position)
        `)
    pgm.sql(`
        	ALTER TABLE objectives
	        ADD CONSTRAINT uq_objective_position
	        UNIQUE (objective_id, position)
        `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropConstraint('sections', 'uq_section_position')
    pgm.dropConstraint('objectives', 'uq_objective_position')
};
