import pkgJson from '../../package.json';
import { Initializer } from './components/Initializer';

export default {
  register(app: any) {
    app.registerPlugin({
      id: pkgJson.strapi.name,
      initializer: Initializer,
      isReady: true,
      name: pkgJson.strapi.name,
    });

    app.customFields.register({
      pluginId: pkgJson.strapi.name,
      name: 'oembed',
      type: 'json',
      components: {
        Input: async () => import(/* webpackChunkName: "oembed-input" */ './components/Input'),
      },
      intlLabel: {
        id: 'oembed.custom-field.label',
        defaultMessage: 'oEmbed',
      },
      intlDescription: {
        id: 'oembed.custom-field.description',
        defaultMessage: 'Embed content from external sources',
      },
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            /* webpackChunkName: "oembed-i18n-[request]" */ `./translations/${locale}.json`
          );

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
