import mongoose from "mongoose";
import config from "../config";

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, { dbName: "testdb" });
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        await mongoose.connection.collection(collection.collectionName).deleteMany({})
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
