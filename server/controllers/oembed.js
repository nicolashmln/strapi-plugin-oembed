'use strict';

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
    return await strapi.plugins.oembed.services.oembed.fetch(ctx.request.query.url);
  }
};
