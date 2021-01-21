import { Response } from "express";
import {
    ValidationError,
    NotFoundError,
    DBError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} from "objection";

export type DownloadResponse = {
    filePath: string,
    fileName: string,
    res: Response,
}

export type ErrorHandler = {
    message?: string | Array<string>,
    values?: object,
    code?: number,
    res: Response,
    error: any,
}

export type SendResponse = {
    message: string | Array<string>,
    values?: object | Array<any>,
    code: number,
    res: Response,
}

export const sendResponse = ({ values, message, code, res }: SendResponse): void => {
    res.status(code)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            code,
            values,
            message,
        });
}


export const errorHandler = ({ values, message, code, res, error }: ErrorHandler) => {
    if (error instanceof ValidationError) {
        switch (error.type) {
            case 'ModelValidation':
                res.status(400).send({
                    code: 400,
                    message: "Model Validation",
                });
                break;
            case 'RelationExpression':
                res.status(400).send({
                    code: 400,
                    message: "Relation Expression",
                });
                break;
            case 'UnallowedRelation':
                res.status(400).send({
                    code: 400,
                    message: "Unallowed Relation",
                });
                break;
            case 'InvalidGraph':
                res.status(400).send({
                    code: 400,
                    message: "Invalid Graph",
                });
                break;
            default:
                res.status(400).send({
                    code: 400,
                    message: "Unknow Error Validation"
                });
                break;
        }
    } else if (error instanceof NotFoundError) {
        res.status(404).send({
            code: 404,
            message: "Not Found"
        });
    } else if (error instanceof UniqueViolationError) {
        console.log(error)
        res.status(409).send({
            code: 409,
            message: 'Unique Violation',
            values: {
                columns: error.columns
            }
        });
    } else if (error instanceof NotNullViolationError) {
        res.status(400).send({
            code: 400,
            message: 'Not Null Violation',
            values: {
                column: error.column,
            }
        });
    } else if (error instanceof ForeignKeyViolationError) {
        res.status(409).send({
            code: 409,
            message: 'Foreign-Key Violation',
            values: {
                constraint: error.constraint
            }
        });
    } else if (error instanceof CheckViolationError) {
        res.status(400).send({
            code: 400,
            message: 'Check Violation',
            values: {
                constraint: error.constraint
            }
        });
    } else if (error instanceof DataError) {
        res.status(400).send({
            code: 400,
            message: 'Invalid Data'
        });
    } else if (error instanceof DBError) {
        res.status(500).send({
            code: 500,
            message: 'Unknown Database Error',
        });
    } else {
        res.status(500).send({
            code: code ?? 500,
            message: message ?? 'Server Error',
            values
        });
    }
}

export const downloadResponse = ({ filePath, fileName, res }: DownloadResponse): void => {
    res.download(filePath, fileName);
}

