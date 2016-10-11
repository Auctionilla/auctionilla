import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('popular_search',table => {
    table.increments('id');
    table.string('search_key').notNullable();
    table.timestamps();
  })
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('popular_search');
}
