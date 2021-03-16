//all files belong to a single user, so originalname and filename can be unique
export async function up(knex) {
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

export async function down(knex) {
    return knex.schema
        .dropTable("files");
};
