import { knex } from 'chen/sql';

/**
 * Apply database schema changes
 * @param {knex} db
 */
export async function up(db: knex) {
  return db.schema.createTable('users', table => {
    table.increments('id');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('city').nullable();
    table.string('country').nullable();
    table.string('phone').nullable();
    table.text('validation_code').notNullable();
    table.boolean('email_confirmed').notNullable().defaultTo('false');
    table.timestamps();

    table.unique(['email']);

  });
}

/**
 * Rollback database schema changes
 * @param {knex} db
 */
export async function down(db: knex) {
  return db.schema.dropTable('users');
}
