"use strict"

const services = require("./services");
const routes = require("./routes");
const controllers = require("./controllers");

const pkgJson = require('../package.json');

module.exports = {
  controllers,
  routes,
  services,

  register({ strapi }) {
    strapi.customFields.register({
      name: 'oembed',
      plugin: pkgJson.strapi.name,
      type: 'text'
    })
  }
};
