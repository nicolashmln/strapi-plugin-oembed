"use strict";
const { getService } = require("../utils");

/**
 * media-embed.js controller
 *
 * @description: A set of functions called "actions" of the `media-embed` plugin.
 */

module.exports = {
  /**
   *
   *
   * @return {Object}
   */

  fetch: async (ctx) => {
    return await getService("oembed").fetch(ctx.request.query.url);
  },
};
