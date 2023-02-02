import { Product } from "./product";
import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import config from "../../config";
import { faker } from "@faker-js/faker";
import app from "../../app";

describe("product routes", () => {
  let connection: Mongoose;
  beforeAll(async () => {
    connection = await connect(String(config.mongoose.url));
  });

  let testProduct: Product = {
    _id: new mongoose.Types.ObjectId().toString(),
    itemId : faker.random.numeric(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    subcategory: faker.commerce.department(),
    listPrice: faker.datatype.float(),
  }
 
  it.only("should return 201 & new product should created.", async () => {

    console.log(testProduct);
    const res = await request(app)
      .post(`/api/v1/products`)
      .send(testProduct)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      _id: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      __v: 0,
      ...testProduct,
    });
  });



  it("should delete product with matching id", async () => {
     await request(app)
      .delete(`/api/v1/employees/${testProduct?._id}`)
      .expect(httpStatus.NO_CONTENT);

  });

  afterAll(() => {
    connection.disconnect();
  });
});
