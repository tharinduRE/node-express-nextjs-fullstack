import { Mongoose, connect } from "mongoose";
import config from ".";
import logger from "./logger";

let mongoose: Mongoose | null = null;
/**
 *  Mongo DB Connection
 */
const mongodb = async () => {
  try {
    const mongoURI = config.mongoose.url;
    mongoose = await connect(mongoURI as string);
    logger.info("MongoDB Connected.");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default mongodb;
