import pluginPkg from '../../package.json';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

export default {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      name,
    });

    app.customFields.register({
      name: 'oembed',
      pluginId: PLUGIN_ID,
      type: 'json',
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ './components/Input'),
      },
      intlLabel: {
        id: 'oembed-label',
        defaultMessage: 'oEmbed',
      },
      intlDescription: {
        id: 'oembed-description',
        defaultMessage: 'Add videos from external sources',
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: true,
      name: pluginPkg.strapi.name,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            /* webpackChunkName: "oembed-translations-[request]" */ `./translations/${locale}.json`
          );

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
