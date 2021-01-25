
import knex from "knex";
if (process.env.NODE_ENV !== 'production') {
    import('dotenv')
        .then((dotenv) => {
            dotenv.config({ path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env" });
        });
}

export default knex({
    client: "sqlite3",
    connection: {
        filename: process.env.dbFilename ?? "./server/database/database.sqlite3"
    }
});