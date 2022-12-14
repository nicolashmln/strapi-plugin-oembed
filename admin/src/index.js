import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import { prefixPluginTranslations } from '@strapi/helper-plugin';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name,
    })

    app.customFields.register({
      name,
      pluginId,
      type: 'text',
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/OEmbedField"),
      },
      intlLabel: {
        id: 'oembed-label',
        defaultMessage: "oEmbed"
      },
      intlDescription: {
        id: 'oembed-description',
        defaultMessage: "Add videos from external sources"
      }
    });

  },
  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(
          /* webpackChunkName: "oembed-translations-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  }
}
