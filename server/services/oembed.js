'use strict';
const axios = require('axios');

/**
 * media-embed.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = (
  {
    strapi
  }
) => {
  return {
    async fetch(url) {
      let data;

      const matches = url.match(/^(https?:\/\/)?(www\.)?(youtu\.be|youtube\.com|soundcloud\.com|vimeo\.com|tiktok\.com|open\.spotify\.com|twitter\.com|codepen\.io)/i);

      if (matches) {
        try {
          let fetchedData;
          let title;
          let mime;
          let thumbnail;

          switch (matches[3]) {
            case 'youtu.be':
            case 'youtube.com':
              fetchedData = await axios.get(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`).then(res => res.data);
              title = fetchedData.title;
              mime = 'video/youtube';
              thumbnail = fetchedData.thumbnail_url;
              break;

            case 'twitter.com':
              fetchedData = await axios.get(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`).then(res => res.data);
              title = fetchedData.author_name;
              mime = 'text/twitter';
              thumbnail = null; // Twitter oEmbed may not provide a thumbnail
              break;
            
            case 'soundcloud.com':
              fetchedData = await axios.get(`https://www.soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`).then(res => res.data);
              title = fetchedData.title;
              mime = 'audio/soundcloud';
              thumbnail = fetchedData.thumbnail_url;
              break;
            
            case 'vimeo.com':
              fetchedData = await axios.get(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`).then(res => res.data);
              title = fetchedData.title;
              mime = 'video/vimeo';
              thumbnail = fetchedData.thumbnail_url;
              break;

            case 'tiktok.com':
              fetchedData = await axios.get(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}&format=json`).then(res => res.data);
              title = fetchedData.title;
              mime = 'video/tiktok';
              thumbnail = fetchedData.thumbnail_url;
              break;

            case 'open.spotify.com':
              fetchedData = await axios.get(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`).then(res => res.data);
              title = fetchedData.title;
              mime = 'audio/spotify';
              thumbnail = fetchedData.thumbnail_url;
              break;

            case 'codepen.io':
              fetchedData = await axios.get(`https://codepen.io/api/oembed?format=json&url=${encodeURIComponent(url)}`).then((res) => res.data);
              title = fetchedData.title;
              mime = 'application/codepen';
              thumbnail = fetchedData.thumbnail_url;
              break;
          
            default:
              break;
          }
            
          data = {
            url,
            title,
            thumbnail,
            mime,
            rawData: fetchedData,
          }
          
        } catch (error) {
          if (error.response.status === 404) {
            data = {
              error: 'This URL can\'t be found'
            }
          } else if (error.response.status === 401) {
            data = {
              error: 'Embedding has been disabled for this media'
            }
          } else {
            throw new Error(error);
          }
        }
      } else {
        data = {
          error: 'Invalid URL'
        }
      }

      return data;
    }
  };
};