import express, { Router } from "express";
import multer, { Multer } from "multer";

import {
    index,
    store,
    update,
    remove,
    download,
    show
} from "../controllers/fileUploadController";

type MulterConfig = {
    dest: string,
    arrayKey: string
}

const dest: string = "/server/public/files";
const multerConfig: MulterConfig = { dest, arrayKey: "[]" };
const upload: Multer = multer(multerConfig);
const router: Router = express.Router();

router.get("/file", index);

router.get("/file/:id", show);

router.get("/file/:id/download", download);

router.post("/file", upload.array("files[]"), store);

router.put("/file/:id", update);

router.delete("/file/:id", remove);

export default router;
