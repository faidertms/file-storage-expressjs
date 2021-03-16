import express from "express";
import fileUploadRoutes from "./routes/fileUploadRoute";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../file-storage-swagger.json';

if (process.env.NODE_ENV !== 'production') {
    import('dotenv')
    .then((dotenv) => {
        dotenv.config({ path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env" });
    });
}

const app = express();
const PORT = process.env.PORT || 3000;
const prefix = "/api";

app.use(cors())
app.use(express.json());
app.use(prefix, fileUploadRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server(${process.env.NODE_ENV}) is running`);
});

export default server;