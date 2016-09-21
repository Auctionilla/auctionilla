import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
    return db.schema.createTable('search_alerts', table => {
    table.increments('id');
    table.string('search_item').notNullable();
    table.integer('user_id_fk').unsigned().notNullable();
    table.integer('category_id_fk').unsigned().nullable();
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());

    table.foreign('user_id_fk').references('id').inTable('users');
    table.foreign('category_id_fk').references('id').inTable('categories');
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('search_alerts');
}
