/** * @type {import('node-pg-migrate').ColumnDefinitions | undefined} */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('sections', {
    section_id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'), // Automatically generates UUIDs
    },
    admin_id: {
      type: 'uuid',
      notNull: true,
      references: 'users', // Assumes your users table is named 'users'
      onDelete: 'CASCADE', // Cleans up sections if a user is deleted
    },
    title: {
      type: 'varchar(255)', // Must be a string literal
      notNull: true,
      default: 'Unlabeled Section',
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('sections'); // Fixed: drops 'sections', not 'users'
};
