"use strict";

const getService = (name) => {
  return strapi.plugin("oembed").service(name);
};

module.exports = {
  getService,
};
