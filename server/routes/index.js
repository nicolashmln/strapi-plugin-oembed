"use strict";

const adminRoutes = require("./admin");

module.exports = {
  admin: {
    type: "admin",
    routes: adminRoutes,
  },
};
