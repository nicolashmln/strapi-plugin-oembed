import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async fetch(ctx) {
    const response = await strapi.plugin('oembed').service('oembed').fetch(ctx.request.query.url);

    ctx.body = response;
  },
});

export default controller;
