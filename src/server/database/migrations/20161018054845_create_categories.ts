import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('categories', table => {
    table.increments('id');
    table.integer('item_count').nullable();
    table.string('category_name').notNullable();
    table.text('description').nullable();
    table.timestamps();
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('categories');
}
