import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.string('id').primary();
    table.string('title').notNullable();
    table.integer('amount').notNullable();
    table.string('type').notNullable();
    table.string('session_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
