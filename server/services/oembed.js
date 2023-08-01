'use strict';

const axios = require('axios');
const providers = require('./providers');

/**
 * media-embed.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = ({ strapi }) => ({
  async fetch(url) {
    const matchedProvider = this.resolveProvider(url);
  
    if (!matchedProvider) {
      return {
        error: 'Invalid URL'
      };
    }
  
    try {
      const fetchedData = await matchedProvider.embedData(url);
  
      return {
        url,
        title: fetchedData.title,
        thumbnail: fetchedData.thumbnail_url,
        mime: matchedProvider.mime,
        rawData: fetchedData,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return {
            error: 'This URL can\'t be found'
          };
        } else if (error.response?.status === 401) {
          return {
            error: 'Embedding has been disabled for this media'
          };
        }
      }
  
      throw new Error(error);
    }
  },

  resolveProvider(url) {
    return Object.values(providers).find(provider => provider.pattern.test(url));
  },
})
