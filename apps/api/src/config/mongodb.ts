import { connect, ConnectOptions, Mongoose } from "mongoose";
import config from "./config";
import logger from "./logger";

let mongoose: Mongoose | null = null;
let mongooseOpts: ConnectOptions = {
  dbName: config.mongoose.dbName,
};
/**
 *  Mongo DB Connection
 */
const mongodb = async () => {
  try {
    const mongoURI = config.mongoose.url;
    mongoose = await connect(mongoURI as string, mongooseOpts);
    logger.info("MongoDB Connected.")
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default mongodb;
