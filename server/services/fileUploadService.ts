import File from "../models/file";
import fs from "fs";

export function getFileExtension(filename: string): string {
    let ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
}
export async function getFiles(): Promise<Array<File>> {
    const files: Array<File> = await File.query();
    return files;
}

export async function getFile(id: number): Promise<File> {
    const file: File = await File.query().findById(id).throwIfNotFound();
    return file;
}

export async function saveFile(fileToSave: Express.Multer.File): Promise<File> {
    const file: File = await File.query().insert({
        originalname: fileToSave.originalname,
        filename: fileToSave.filename,
        path: fileToSave.path,
        mimetype: fileToSave.mimetype,
    });
    return file;
}

export async function saveFiles(filesToSave: Array<Express.Multer.File>): Promise<Array<File>> {
    const filesSaved: Array<File> = [];
    for (const file of filesToSave) {
        const fileModel: File = await saveFile(file);
        filesSaved.push(fileModel);
    }
    return filesSaved;
}

export async function updateFile(id: number, values: object): Promise<File> {
    const file: File = await File.query().patchAndFetchById(id, values).throwIfNotFound();
    return file;
}

export async function updateFileName(id: number, name: string): Promise<File> {
    const file: File = await getFile(id);
    const updatedFile: File = await updateFile(id, {
        originalname: `${name}.${getFileExtension(file.originalname)}`
    });
    return updatedFile;
}

export async function deleteFile(id: number): Promise<File> {
    const file: File = await File.query().findById(id).throwIfNotFound();
    const deleted: number = await File.query().deleteById(id).throwIfNotFound();
    fs.unlinkSync(file.path);
    return file;
}

