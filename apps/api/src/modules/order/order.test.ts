import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import { createTestProducts, createTestUser } from '../../utils/setupTestData';
import setupTestDB from "../../utils/setupTestDB";
import { generateAuthToken } from "../auth/auth.service";

setupTestDB();

const userOne = createTestUser()

let testOrder = {
  items : createTestProducts(10).map((e) => ({ product: e, quantity: 2 })),
  userId: userOne._id,
};

describe("order module", () => {

  let accessToken:string;

  beforeAll(async function () {
    accessToken = await generateAuthToken(userOne);
  });

  it("should return 201 & new order should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/orders`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(testOrder);
    expect(httpStatus.CREATED);
    expect(res.body.status).toEqual("NEW");
  });

  it("should return 400 if there's no items", async () => {
    testOrder.items = [];

    await request(app)
      .post(`/api/v1/orders`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(testOrder)
      .expect(httpStatus.BAD_REQUEST);
  });
});
