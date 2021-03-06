import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("User",table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("perfil_image").notNullable()
        table.string("email").notNullable()
        table.string("password").notNullable()
        table.string("token_challenger")
        table.specificType('follow', 'integer ARRAY');
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable("User")
}
