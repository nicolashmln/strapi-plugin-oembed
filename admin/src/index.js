import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import OEmbedField from "./components/OEmbedField";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({ type: 'oembed', Component: OEmbedField });

    app.registerPlugin({
      id: pluginId,
      name,
    })
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
