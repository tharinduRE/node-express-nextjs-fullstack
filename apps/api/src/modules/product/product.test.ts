import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import { createTestProducts } from "../../utils/setupTestData";
import setupTestDB from "../../utils/setupTestDB";
import { slugify } from "../../utils/slugify";
import ProductModel from "./product.model";

setupTestDB();

let testProduct = createTestProducts(1)[0];

const insertProducts = async (products: Record<string, any>[]) => {
  await ProductModel.insertMany(products);
};

describe("product module", () => {
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
      photoUrls: expect.anything(),
      attributes: expect.anything(),
      slug: slugify(testProduct.name),
      __v: 0,
    });
  });

  it("should delete product with matching id", async () => {
    await request(app)
      .delete(`/api/v1/products/${testProduct?._id}`)
      .expect(httpStatus.NO_CONTENT);
  });
});
