import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('country_list', table => {
    table.increments('id');
    table.string('country_name').notNullable();
    table.string('country_code').nullable();
    table.timestamps();
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
	return db.schema.dropTable('country_list');
}
