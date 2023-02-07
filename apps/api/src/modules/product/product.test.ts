import { Product } from "./product";
import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import config from "../../config";
import { faker } from "@faker-js/faker";
import app from "../../app";
import { slugify } from "../common/utils";
import ProductModel from "./product.model";

const createProducts = (numUsers = 20) => {
  return Array.from({ length: numUsers }, () => ({
    _id: new mongoose.Types.ObjectId().toString(),
    itemId: faker.random.numeric(6, { allowLeadingZeros: true }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    subcategory: faker.commerce.department(),
    listPrice: Math.ceil(parseFloat(faker.commerce.price(1000,10000,0)) / 10) * 10,
    active: faker.datatype.boolean() 
  }));
};

let testProduct = createProducts(1)[0]

const insertProducts = async (products: Record<string, any>[]) => {
  await ProductModel.insertMany(products);
};

describe("product routes", () => {
  let connection: Mongoose;
  beforeAll(async () => {
    connection = await connect(String(config.mongoose.url));
    // await ProductModel.deleteMany({})
    // await insertProducts(createProducts());
  });

  it("should return 201 & new product should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/products`)
      .send(testProduct)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      ...testProduct,
      _id: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      slug: slugify(testProduct.name),
      __v: 0,

    });
  });

  it.skip("should delete product with matching id", async () => {
    await request(app)
      .delete(`/api/v1/employees/${testProduct?._id}`)
      .expect(httpStatus.NO_CONTENT);
  });

  afterAll(() => {
    connection.disconnect();
  });
});
