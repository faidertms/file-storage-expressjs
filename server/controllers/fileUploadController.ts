import { Request, Response } from "express";
import File from "../models/fileModel";
import { sendResponse, errorHandler, downloadResponse, getFileExtension } from "./coreController";
import fs from "fs";


export const index = async function (req: Request, res: Response): Promise<void> {
    try {
        const files = await File.query();
        sendResponse({ code: 200, message: "Found", values: files, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const store = async function (req: Request, res: Response): Promise<void> {
    try {
        const filesToSave: Array<Express.Multer.File> = Array.isArray(req.files) ? req.files : [];
        const filesSaved: Array<File> = [];

        for (const file of filesToSave) {
            const fileModel: File = await File.query().insert({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
            });

            filesSaved.push(fileModel);
        }

        sendResponse({
            code: 200,
            message: "Created",
            values: {
                files: filesSaved
            },
            res
        });

    } catch (error) {
        errorHandler({ error, res });
    }
}

export const update = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await File.query().findById(id).throwIfNotFound();

        const updatedFile: File = await File.query().patchAndFetchById(id, {
            originalname: `${req.body.originalname}.${getFileExtension(file.originalname)}`
        }).throwIfNotFound();

        sendResponse({ code: 200, message: "Updated", values: updatedFile, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const remove = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await File.query().findById(id).throwIfNotFound();
        const deleted: number = await File.query().deleteById(id).throwIfNotFound();
        fs.unlinkSync(file.path);
        sendResponse({ code: 200, message: "Removed", values: file, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const show = async function (req: Request, res: Response): Promise<void> {
    try {
        const { id = 0 } = req.params;
        const file: File = await File.query().findById(id).throwIfNotFound();
        sendResponse({ code: 200, message: "Found", values: file, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const download = async function (req: Request, res: Response): Promise<void> {
    try {
        const { id = 0 } = req.params;
        const file: File = await File.query().findById(id).throwIfNotFound();
        downloadResponse({ fileName: file.originalname, filePath: file.path, res });
    } catch (error) {
        errorHandler({ error, res });
    }

}