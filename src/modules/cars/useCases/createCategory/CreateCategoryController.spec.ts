import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = uuidv4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at,driver_license)
    VALUES('${id}','admin','admin@rentx.com.br','${password}',true,'now()','XXX-1234')`
    );
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({ name: "Category Super Test", description: "Category Super Test" })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(201);
  });

  it("should mot be able to create a new category with name exists", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({ name: "Category Super Test", description: "Category Super Test" })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
