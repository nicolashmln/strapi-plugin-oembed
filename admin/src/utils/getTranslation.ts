import pkgJson from '../../../package.json';

const getTranslation = (id: string) => `${pkgJson.strapi.name}.${id}`;

export { getTranslation };
