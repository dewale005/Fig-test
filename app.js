const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const { default: helmet } = require("helmet");
const httpStatus = require("http-status");
const logs = require("./src/config/logger");
const config = require("./src/config/config");
const morgan = require("./src/config/morgan");
const { jwtStrategy } = require('./src/config/passport');
const routes = require("./src/routes");
const ApiError = require("./src/util/ApiError");
const { errorConverter, errorHandler } = require("./src/middlewares/error");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// setting up logger
app.use(logger("dev"));

// connecting the database
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logs.info("Connected to MongoDB");
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
