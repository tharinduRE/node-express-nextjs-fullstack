import { connect } from "mongoose";
import config from ".";

/**
 *  Mongo DB Connection
 */
const mongodb = async () => {
  try {
    const mongoURI = config.mongoose.url;
    await connect(mongoURI as string);
    console.log("☁️ [database]: MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default mongodb;
