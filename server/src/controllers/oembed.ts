import type { Core } from '@strapi/strapi';

import pkgJson from '../../../package.json';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async fetch(ctx) {
    ctx.body = await strapi
      .plugin(pkgJson.strapi.name)
      .service('oembed')
      .fetch(ctx.request.query.url);
  },
});

export default controller;
