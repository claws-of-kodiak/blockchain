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
  // 0. Drop existing defaults on integer columns before altering types
  pgm.alterColumn('user_progress', 'current_objective', { default: null });
  pgm.alterColumn('user_progress', 'current_section', { default: null });
  // 1. Drop the current_step column
  pgm.dropColumns('user_progress', ['current_step']);

  // 2. Change current_objective to UUID with FK referencing objectives(id)
  // Note: changing type from integer to uuid requires setting USING expression
  pgm.alterColumn('user_progress', 'current_objective', {
    type: 'uuid',
    using: 'NULL::uuid',
    references: 'objectives(objective_id)',
    onDelete: 'SET NULL',
  });

  // 3. Change current_section to UUID with FK referencing sections(id)
  pgm.alterColumn('user_progress', 'current_section', {
    type: 'uuid',
    using: 'NULL::uuid',
    references: 'sections(section_id)',
    onDelete: 'SET NULL',
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    // Revert current_section back to integer and drop FK
  pgm.alterColumn('user_progress', 'current_section', {
    type: 'integer',
    using: 'NULL::integer',
    dropReferences: 'sections(section_id)',
    default: 0
  });

  // Revert current_objective back to integer and drop FK
  pgm.alterColumn('user_progress', 'current_objective', {
    type: 'integer',
    using: 'NULL::integer',
    dropReferences: 'objectives(objective_id)',
    default: 0
  });

  // Restore current_step column
  pgm.addColumns('user_progress', {
    current_step: {
      type: 'numeric(2,1)',
      notNull: false,
    },
  });
};
