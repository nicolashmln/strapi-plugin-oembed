import type { Core } from '@strapi/strapi';

import pkgJson from '../../package.json';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'oembed',
    plugin: pkgJson.strapi.name,
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};

export default register;
