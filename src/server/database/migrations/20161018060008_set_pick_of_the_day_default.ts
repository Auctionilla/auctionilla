import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return Promise.all([
      db.schema.raw('ALTER TABLE pick_of_the_day ALTER COLUMN item_id_fk SET DEFAULT 1')
  ]);
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return Promise.all([
      db.schema.raw('ALTER TABLE pick_of_the_day ALTER COLUMN item_id_fk DROP DEFAULT')
  ]);

}
