import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import { faker } from "@faker-js/faker";
import config from "../../config";
import app from "../../app";

describe("metadata routes", () => {
  let db: Mongoose;
  let token: string;

  beforeAll(async () => {
    db = await connect(String(config.mongoose.url));
    const response = await request(app)
      .post(`/api/v1/auth/login`)
      .send({ email: "test@gmail.com", provider: "github", id: "test" });
    token = response.body;

  });

  
  it("should return 201 & new keytype should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/metadata/keytypes`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: faker.commerce.department()
      })
    expect(httpStatus.CREATED);
  
  });

  it("should return 201 & key value should saved.", async () => {
    const res = await request(app)
      .post(`/api/v1/metadata/keyvalues`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        key: 'CATEGORY',
        value: faker.commerce.department()
      })
    expect(httpStatus.CREATED);
  
  });
  
  afterAll(() => {
    db.disconnect();
  });
});
