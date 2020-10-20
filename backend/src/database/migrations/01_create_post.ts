import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("Post",table => {
      table.increments();
      table.string("text_post").notNullable();
      table.integer("like").notNullable();
      table.string("image").notNullable();
  
      table.string("user_id").notNullable();
  
      table.foreign("user_id").references("id").inTable("User");
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable("Post")
}
