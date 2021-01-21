import express from "express";
import * as dotenv from "dotenv";
import fileUploadRoutes from "./routes/fileUploadRoute";
import cors from 'cors';

dotenv.config({ path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env" });

const app = express();
const PORT = process.env.PORT || 8000;
const prefix = "/api";

app.use(cors())
app.use(express.json());
app.use(prefix, fileUploadRoutes);

const server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server(${process.env.NODE_ENV}) is running at https://localhost:${PORT}`);
});

export default server;