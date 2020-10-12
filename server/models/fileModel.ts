import { Model } from "objection";
import knex from "../config/connection";
Model.knex(knex);

export default class FileModel extends Model {

    id?: bigint;
    originalname!: string;
    filename!: string;
    path!: string;
    mimetype!: string;
    created_at?: Date | string;
    updated_at?: Date | string;

    $beforeInsert(): void {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    $beforeUpdate(): void {
        this.updated_at = new Date().toISOString();
    }

    static get tableName(): string {
        return "files";
    }

    static get jsonSchema(): object {
        return {
            type: "object",
            required: ["originalname", "filename", "path", "mimetype"],

            properties: {
                id: { type: "bigint" },
                originalname: { type: "string" },
                filename: { type: "string" },
                path: { type: "string" },
                mimetype: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            }
        };
    }
}
