import { createTestKeyValues } from './../../utils/setupTestData';
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";
import setupTestDB from "../../utils/setupTestDB";
import { KeyValueModel } from "./keyvalue/keyvalue.model";

setupTestDB();

let keyValues = createTestKeyValues('CATEGORY')

const insertKeyValues = async (data: Record<string, any>[]) => {
  await KeyValueModel.insertMany(data);
};


describe("metadata module", () => {
  it("should return 201 & new keytype should created.", async () => {
    const res = await request(app)
      .post(`/api/v1/metadata/keytypes`)
      // .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: faker.commerce.department(),
      });
    expect(httpStatus.CREATED);
  });

  it("should return 201 & key value should saved.", async () => {
    const res = await request(app)
      .post(`/api/v1/metadata/keyvalues`)
      // .set("Authorization", `Bearer ${accessToken}`)
      .send({
        key: "CATEGORY",
        value: faker.commerce.department(),
      });
    expect(httpStatus.CREATED);
  });

  it("should return keyvalue by type", async () => {
    await insertKeyValues(keyValues)

    const res = await request(app)
      .get(`/api/v1/metadata/keyvalues/CATEGORY`)
      .send()

      expect(httpStatus.OK);
      expect(res.body.data).toHaveLength(10);
  });
});
