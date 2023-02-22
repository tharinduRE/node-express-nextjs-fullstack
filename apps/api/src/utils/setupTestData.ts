import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

export const createTestProducts = (number = 20) => {
  return Array.from({ length: number }, () => ({
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

export const createTestUser = () => ({
  _id: new mongoose.Types.ObjectId().toString(),
  email: faker.internet.email().toLowerCase(),
  id: faker.random.numeric(8),
  name: "testUserOne",
  role: "USER" as const,
  provider: "github",
});


export const createTestKeyTypes = (number = 20) => {
  return Array.from({ length: number }, () => ({
    name: faker.commerce.department(),
  }));
};

export const createTestKeyValues = (key:string,number = 20) => {
  return Array.from({ length: number }, () => ({
    _id: new mongoose.Types.ObjectId(),
    key,
    value: faker.commerce.department(),
  }));
};