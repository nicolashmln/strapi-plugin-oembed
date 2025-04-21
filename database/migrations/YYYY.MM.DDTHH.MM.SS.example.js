'use strict';

const MIGRATION_MAP = [
  // ["collection_name", "field_name"],
];

module.exports = {
  async up(knex) {
    const oembedService = strapi.plugin('oembed').service('oembed');

    for (const [collectionName, fieldName] of MIGRATION_MAP) {
      const rows = await knex.select(['id', fieldName]).from(collectionName);

      for (const row of rows) {
        const data = row[fieldName];
        if (!data) {
          strapi.log.warn(`Skipping ${collectionName}.${fieldName}`);
          continue;
        }

        const { url, rawData } = JSON.parse(data);
        if (!url || !rawData) {
          strapi.log.warn(
            `Skipping ${collectionName}.${fieldName} as "url" and "rawData" were not defined`
          );
          continue;
        }

        try {
          const processed = await oembedService.postprocess(rawData);
          const thumbnail = await oembedService.generateThumbnail(processed);
          await knex(collectionName)
            .where({ id: row.id })
            .update({
              [fieldName]: JSON.stringify({
                url,
                oembed: processed,
                thumbnail: thumbnail ?? undefined,
              }),
            });

          strapi.log.info(`Migrated: ${collectionName} → ${fieldName} (ID: ${row.id}`);
        } catch (err) {
          strapi.log.error(
            `Migration error: ${collectionName} → ${fieldName} (ID: ${row.id})`,
            err
          );

          throw err;
        }
      }
    }
  },
};
