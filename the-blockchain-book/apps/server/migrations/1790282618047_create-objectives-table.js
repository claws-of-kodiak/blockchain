/** * @type {import('node-pg-migrate').ColumnDefinitions | undefined} */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('objectives', {
    objective_id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    section_id: {
      type: 'uuid',
      notNull: true,
      references: 'sections',
      onDelete: 'CASCADE', // Deletes objectives if their section is deleted
    },
    label: {
      type: 'varchar(20)', // Holds strings like '1.1', '1.4', '1.8'
      notNull: true,
    },
    description: {
      type: 'varchar(255)', // Big enough for a sentence or two
      notNull: true,
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // CRITICAL: Ensures the label is unique ONLY within its own section
  pgm.addConstraint('objectives', 'unique_section_label', {
    unique: ['section_id', 'label'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('objectives');
};
