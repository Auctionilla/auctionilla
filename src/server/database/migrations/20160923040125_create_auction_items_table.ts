import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
   return db.schema.createTable('auction_items', table => {
    table.increments('id');
    table.string('item_title').notNullable();
    table.text('item_description').notNullable();
    table.string('auction_url').notNullable();
    table.string('item_image').notNullable();
    table.string('price_status').notNullable();
    table.integer('price').notNullable();
    table.string('currency').notNullable();
    table.string('location').nullable();
    table.string('auction_date').nullable();
    table.integer('category_id_fk').unsigned().notNullable();
    table.integer('auction_site_fk').unsigned().notNullable();
    table.timestamps();

    table.foreign('category_id_fk').references('id').inTable('categories');
    table.foreign('auction_site_fk').references('id').inTable('auction_site');

  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('auction_items');
}
