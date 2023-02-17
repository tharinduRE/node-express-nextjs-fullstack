import { status } from './../../../../web/src/types/order';
import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import { faker } from "@faker-js/faker";
import config from "../../config";
import { Order } from "./order";
import app from "../../app";

describe("order routes", () => {
  let db: Mongoose;
  let items: any[] = [];
  let token: string;

  beforeAll(async () => {
    db = await connect(String(config.mongoose.url));
    const response = await request(app)
      .post(`/api/v1/auth/login`)
      .send({ email: "test@gmail.com", provider: "github", id: "test" });
    token = response.body;

    let products = await db.model("Product").find().limit(5);
    items.push(...products.map((e) => ({ product: e, quantity: 2 })));
  });

  let testOrder = {
    items,
    userId: "test",
  };
  
  it.skip("should return 201 & new order should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/orders`)
      .set("Authorization", `Bearer ${token}`)
      .send(testOrder)
    expect(httpStatus.CREATED);
    expect(res.body.status).toEqual("NEW");
  
  });
  

  it("should return 400 if there's no items", async () => {
    testOrder.items = [];

    await request(app)
      .post(`/api/v1/orders`)
      .set("Authorization", `Bearer ${token}`)
      .send(testOrder)
      .expect(httpStatus.BAD_REQUEST);
  });

  afterAll(() => {
    db.disconnect();
  });
});
