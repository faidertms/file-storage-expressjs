
import knex from "knex";
import * as dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env" });

export default knex({
    client: "sqlite3",
    debug: true,
    connection: { 
        filename: process.env.dbFilename ?? "./server/database/database.sqlite3"
    }
});