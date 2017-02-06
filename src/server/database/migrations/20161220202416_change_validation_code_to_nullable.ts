import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
	return Promise.all([
		db.schema.raw('ALTER TABLE users CHANGE COLUMN `validation_code` `validation_code` TEXT NULL')
	]);
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
	return Promise.all([
		db.schema.raw('ALTER TABLE users CHANGE COLUMN `validation_code` `validation_code` TEXT NOT NULL')
	]);
}