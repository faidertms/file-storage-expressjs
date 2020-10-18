import request from "supertest";
import app from "../index";


//Simple Test
describe("Testing all life circle of FileUpload", () => {
    let fileId: number;

    test("Get All files", async () => {
        const response: request.Response = await request(app).get("/api/file");
        expect(response.status).toBe(200);
    });

    test("Create a File", async () => {
        const response: request.Response = await request(app).post("/api/file").attach('files[]', './server/tests/files/init.txt');
        fileId = response.body.values.files[0].id;
        expect(response.status).toBe(201);
        expect(response.body.values.files[0].originalname).toBe('init.txt');
    });

    test("Creating a file that exists", async () => {
        const response: request.Response = await request(app).post("/api/file").attach('files[]', './server/tests/files/init.txt');
        expect(response.status).toBe(409);
    });

    test("Update a File", async () => {
        const response: request.Response = await request(app).put(`/api/file/${fileId}`).send({ originalname: "1152123131313131313213131231321313131312313" });
        expect(response.status).toBe(200);
        expect(response.body.values.originalname).toBe('1152123131313131313213131231321313131312313.txt');
        expect(response.body.values.id).toBe(fileId);
    });

    test("Updating a File that not exists", async () => {
        const response: request.Response = await request(app).put("/api/file/0").send({ originalname: "1152123131313131313213131231321313131312313" });
        expect(response.status).toBe(404);
    });

    test("Get a specific File", async () => {
        const response: request.Response = await request(app).get(`/api/file/${fileId}`);
        expect(response.status).toBe(200);
        expect(response.body.values.originalname).toBe('1152123131313131313213131231321313131312313.txt');
        expect(response.body.values.id).toBe(fileId);
    });

    test("Download a specific File", async () => {
        const response: request.Response = await request(app).get(`/api/file/${fileId}/download`);
        expect(response.status).toBe(200);
    });

    test("Delete a File", async () => {
        const response: request.Response = await request(app).delete(`/api/file/${fileId}`);
        expect(response.status).toBe(200);
        expect(response.body.values.originalname).toBe('1152123131313131313213131231321313131312313.txt');
        expect(response.body.values.id).toBe(fileId);
    });
});