/**
 * Module dependencies.
 */

import http from "http";
import { AddressInfo } from "net";
import app from "./app";
import config from "./config";
import logger from "./config/logger";
import mongodb from "./config/mongodb";
var debug = require("debug")("api:server");

/**
 * Connect to MongoDB
 */
mongodb();

var port = config.port;
app.set("port", port);

var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address() as AddressInfo;
  logger.info(`Environment : ${config.env}`);
  logger.info(`Server is running at http://${addr.address}${port}`);

  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}
