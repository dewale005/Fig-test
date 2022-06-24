const express = require("express");
const eventRoute = require("./event.router");
const userRoute = require("./user.router");
const authRoute = require("./auth.router");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/event",
    route: eventRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
