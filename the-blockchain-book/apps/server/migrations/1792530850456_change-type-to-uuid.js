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
    pgm.alterColumn('user_objective_completion', 'user_id', {
        type: 'uuid',
        using: 'user_id::text::uuid', // Casts the int value to string, then to uuid
        notNull: true
    });

    pgm.alterColumn('user_objective_completion', 'objective_id', {
        type: 'uuid',
        using: 'objective_id::text::uuid',
        notNull: true
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.alterColumn('user_objective_completion', 'user_id', {
        type: 'integer',
        using: 'user_id::text::integer', 
        notNull: true
    });

    pgm.alterColumn('user_objective_completion', 'objective_id', {
        type: 'integer',
        using: 'objective_id::text::integer',
        notNull: true
    });
};
