import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return Promise.all([
      db.schema.raw('ALTER TABLE auction_site MODIFY COLUMN site_url varchar(1000) not null;')
  ]);
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return Promise.all([
      db.schema.raw('ALTER TABLE auction_site MODIFY COLUMN site_url varchar(500) not null;')
  ]);

}
