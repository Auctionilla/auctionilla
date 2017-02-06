import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('favorites', table => {
    table.increments('id');
    table.integer('user_id_fk').unsigned().notNullable();
    table.integer('item_id_fk').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());

    table.foreign('user_id_fk').references('id').inTable('users');
    table.foreign('item_id_fk').references('id').inTable('auction_items');
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('favorites');
}
