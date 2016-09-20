import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('auction_site', table => {
    table.increments('id');
    table.string('site_name').notNullable();
    table.string('site_url').notNullable();
    table.timestamps();
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('auction_sites');
}
