import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import mongoose, { connect, Mongoose } from "mongoose";
import request from "supertest";
import app from "../../app";
import config from "../../config";
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
    listPrice:
      Math.ceil(parseFloat(faker.commerce.price(1000, 10000, 0)) / 10) * 10,
    active: faker.datatype.boolean(),
  }));
};

let testProduct = createProducts(1)[0];

const insertProducts = async (products: Record<string, any>[]) => {
  await ProductModel.insertMany(products);
};

describe("product routes", () => {
  let connection: Mongoose;
  let token: string;
  beforeAll(async () => {
    connection = await connect(String(config.mongoose.url));
    const response = await request(app)
      .post(`/api/v1/auth/login`)
      .send({ email: "test@gmail.com", provider: "github", id: "test" });
    token = response.body;
    // await ProductModel.deleteMany({})
    // await insertProducts(createProducts());
  });

  it("should return 201 & new product should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/products`)
      .set("Authorization", `Bearer ${token}`)
      .send(testProduct)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      ...testProduct,
      _id: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      photoUrls:expect.anything(),
      slug: slugify(testProduct.name),
      __v: 0,
    });
  });

  it("should delete product with matching id", async () => {
    await request(app)
      .delete(`/api/v1/products/${testProduct?._id}`)
      .expect(httpStatus.NO_CONTENT);
  });

  afterAll(() => {
    connection.disconnect();
  });
});
