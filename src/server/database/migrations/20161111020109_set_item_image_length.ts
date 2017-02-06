import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
	return Promise.all([
		db.schema.raw('ALTER TABLE auction_items MODIFY COLUMN item_image text not null;')
	]);
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
	return Promise.all([
    	db.schema.raw('ALTER TABLE auction_items MODIFY COLUMN item_image varchar(255) not null;')
	]);
}
