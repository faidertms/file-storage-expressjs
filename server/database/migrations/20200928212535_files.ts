import * as Knex from "knex";

//all files belong to a single user, so originalname and filename can be unique
export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("files", function (table) {
            table.bigIncrements("id").primary().unsigned();
            table.string("originalname").notNullable().unique();
            table.string("filename").notNullable().unique();
            table.string("path").notNullable().unique();
            table.string("mimetype").notNullable();
            table.dateTime("created_at");
            table.dateTime("updated_at");
        })
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("files");
};
