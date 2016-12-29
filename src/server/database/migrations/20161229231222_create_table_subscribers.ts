import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
	return db.schema.createTable('subscribers', table => {
    table.increments('id');
    table.string('email').notNullable();
    table.timestamps();

    table.unique(['email']);
  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
	return db.schema.dropTable('subscribers');
}
