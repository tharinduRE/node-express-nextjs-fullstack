/* eslint-disable turbo/no-undeclared-env-vars */
import Joi from "joi";
import * as dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .default("development"),
    PORT: Joi.number().default(8080),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    WEBAPP_URL:Joi.string().default("http://localhost:3000")
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  cors: {
    origin: envVars.WEBAPP_URL
  }
};
export default config;
