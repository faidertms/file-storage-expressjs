import { Request, Response } from "express";
import File from "../models/file";
import { deleteFile, getFile, getFiles, saveFiles, updateFileName } from "../services/fileUploadService";
import { sendResponse, errorHandler, downloadResponse } from "./coreController";

export const index = async function (req: Request, res: Response): Promise<void> {
    try {
        const files = await getFiles();
        sendResponse({ code: 200, message: "Found", values: files, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const store = async function (req: Request, res: Response): Promise<void> {
    try {
        const filesToSave: Array<Express.Multer.File> = Array.isArray(req.files) ? req.files : [];
        const filesSaved: Array<File> = await saveFiles(filesToSave);
        sendResponse({ code: 201, message: "Created", values: filesSaved, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const update = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await updateFileName(id, req.body.originalname);
        sendResponse({ code: 200, message: "Updated", values: file, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const remove = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await deleteFile(id);
        sendResponse({ code: 200, message: "Removed", values: file, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const show = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await getFile(id);
        sendResponse({ code: 200, message: "Found", values: file, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}

export const download = async function (req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id) ?? 0;
        const file: File = await getFile(id);
        downloadResponse({ fileName: file.originalname, filePath: file.path, res });
    } catch (error) {
        errorHandler({ error, res });
    }
}