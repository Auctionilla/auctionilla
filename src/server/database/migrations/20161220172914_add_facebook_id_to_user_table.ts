import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
	return Promise.all([
		db.schema.raw('ALTER TABLE users ADD facebook_id varchar(255) null')
	]);
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
	return Promise.all([
		db.schema.raw('ALTER TABLE users DROP COLUMN facebook_id')
	]);
}
