import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
    return db.schema.createTable('search_alerts', table => {
    table.increments('id');
    table.string('search_item').notNullable();
    table.string('auction_house').nullable();
    table.string('category').nullable();
    table.string('location').nullable();
    table.integer('user_id_fk').unsigned().notNullable();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());

    table.foreign('user_id_fk').references('id').inTable('users');
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('search_alerts');
}
