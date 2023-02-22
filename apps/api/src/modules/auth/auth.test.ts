import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import { faker } from "@faker-js/faker";
import setupTestDB from "../../utils/setupTestDB";

setupTestDB();

describe("auth module", () => {

  it("should throw error if not valid provider", async () => {
    await request(app)
      .post(`/api/v1/auth/login`)
      .send({
        id: faker.random.numeric(0),
        email: faker.internet.email(),
        provider : 'google',
      })
    
    expect(httpStatus.BAD_REQUEST);
  });

  it("should throw error if email not provided", async () => {
    await request(app)
      .post(`/api/v1/auth/login`)
      .send({
        id: faker.random.numeric(0),
        provider : 'github',
      })
    
    expect(httpStatus.BAD_REQUEST);
  });

});
