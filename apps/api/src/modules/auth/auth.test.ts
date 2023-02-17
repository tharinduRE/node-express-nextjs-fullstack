import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import app from "../../app";
import config from "../../config";

describe("auth routes", () => {
  let connection: Mongoose;
  beforeAll(async () => {
    connection = await connect(String(config.mongoose.url));
  });

  it("should throw error if not valid provider", async () => {
    await request(app)
      .post(`/api/v1/login`)
      .send({
        provider : 'google',
      })
    
    expect(httpStatus.BAD_REQUEST);
  });

  afterAll(() => {
    connection.disconnect();
  });
});
