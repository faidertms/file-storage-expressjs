import express, { Router } from "express";

import {
    index,
    store,
    update,
    remove,
    download,
    show
} from "../controllers/fileUploadController";

const router: Router = express.Router();

router.get("/file", index);

router.get("/file/:id", show);

router.get("/file/:id/download", download);

router.post("/file", store);

router.put("/file/:id", update);

router.delete("/file/:id", remove);

export default router;
