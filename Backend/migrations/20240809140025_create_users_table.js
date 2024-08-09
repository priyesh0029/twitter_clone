/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up (knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    return knex.schema.createTable('users', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.boolean('isDeleted').notNullable().defaultTo(false);
      table.string('profileImage').nullable();
      table.specificType('following', 'uuid ARRAY').nullable();
      table.specificType('followers', 'uuid ARRAY').nullable();
      table.timestamps(true, true); 
    });
  };

  export async function down (knex) {
    return knex.schema.dropTable('users');
  };
  