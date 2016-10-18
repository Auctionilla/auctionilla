import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('pick_of_the_day', table => {
    table.increments('id');
    table.integer('item_id_fk').unsigned().notNullable().defaultTo(1);

    table.timestamps();

    table.foreign('item_id_fk').references('id').inTable('auction_items');
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('pick_of_the_day');
}
