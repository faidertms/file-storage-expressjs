
import knex from "knex";

const NODE_ENV: string = process.env.NODE_ENV || "production";
const knexconfig = require("../../knexfile")[NODE_ENV];

export default knex(knexconfig);