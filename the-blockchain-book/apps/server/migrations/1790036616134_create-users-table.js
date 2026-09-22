/** * @type {import('node-pg-migrate').ColumnDefinitions | undefined} */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  // 1. Create the base users table
  pgm.createTable('users', {
    id: { 
      type: 'uuid', 
      primaryKey: true, 
      default: pgm.func('gen_random_uuid()') 
    },
    email: { 
      type: 'varchar(255)', 
      notNull: true, 
      unique: true 
    },
    birth_date: {
        type: 'date',
        notNull: true,
    },
    password_hash: { 
      type: 'varchar(255)', 
      notNull: true 
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // 2. Add a foreign key constraint to your existing user_progress table
  pgm.addConstraint('user_progress', 'fk_user_progress_users', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // Remove the constraint first, then drop the table
  pgm.dropConstraint('user_progress', 'fk_user_progress_users');
  pgm.dropTable('users');
};