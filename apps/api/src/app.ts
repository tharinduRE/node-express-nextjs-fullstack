import cors from "cors";
import express, { Express, NextFunction } from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import config from "./config";
import logger from './config/logger';
import ApiError from "./errors/ApiError";
import ErrorHandler from './middleware/errorHandler';
import router from "./routes";

var path = require("path");
var morgan = require("morgan");

/**
 *  Express App
 */
const app: Express = express();

/**
 * CORS
 */
app.use(cors({ credentials: true, origin: config.cors.origin }));
app.options("*", cors());

// set security HTTP headers
app.use(helmet());

app.use(express.json({ limit: "50mb", type: "application/json" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", router);

// send back a 404 error for any unknown endpoints
app.use(function (req: any, res: any, next: NextFunction) {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(logErrors);
// error handler
app.use(ErrorHandler);

function logErrors(err: any, req: any, res: any, next: NextFunction) {
  logger.error(err);
  next(err);
}

export default app;
