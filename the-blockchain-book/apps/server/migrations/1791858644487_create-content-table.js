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
    pgm.createTable('content', {
        content_id: {
          type: 'uuid',
          primaryKey: true,
          default: pgm.func('gen_random_uuid()'),
        },
        objective_id: {
          type: 'uuid',
          notNull: true,
          references: 'objectives(objective_id)',
          onDelete: 'CASCADE',
        },
        text: {
          type: 'TEXT',
          notNull: true,
        },
        last_user: {
            type: 'uuid', 
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE'
          },
        updated_at: {
          type: 'timestamptz',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("content")
};
