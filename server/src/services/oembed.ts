// import type { Core } from '@strapi/strapi';

const service = (/* { strapi }: { strapi: Core.Strapi } */) => ({
  async fetch(url: string) {
    try {
      console.log('oembed.fetch', url);

      const map: Record<string, (url: string) => URL> = {
        'youtu.be': this.fetchYouTube,
        'youtube.com': this.fetchYouTube,
        'www.youtube.com': this.fetchYouTube,
        'twitter.com': this.fetchTwitter,
        'www.twitter.com': this.fetchTwitter,
        'soundcloud.com': this.fetchSoundCloud,
        'www.soundcloud.com': this.fetchSoundCloud,
        'vimeo.com': this.fetchVimeo,
        'www.vimeo.com': this.fetchVimeo,
        'tiktok.com': this.fetchTikTok,
        'www.tiktok.com': this.fetchTikTok,
        'open.spotify.com': this.fetchSpotify,
        'codepen.io': this.fetchCodePen,
        'www.codepen.io': this.fetchCodePen,
      };

      const urlObject = new URL(url);

      const fetcher = map[urlObject.hostname];
      if (!fetcher) {
        throw new Error(`No processor is build for the domain: ${urlObject.hostname}`);
      }

      const oembedUrl = fetcher(url);
      const response = await fetch(oembedUrl, { method: 'GET' });
      const oembed = await response.json();

      return {
        url: urlObject.toString(),
        oembed,
      };
    } catch (error) {
      if (error.response.status === 404) {
        return {
          error: "This URL can't be found",
        };
      } else if (error.response.status === 401) {
        return {
          error: 'Embedding has been disabled for this media',
        };
      } else {
        throw new Error(error);
      }
    }
  },

  fetchYouTube(url: string) {
    const fetchURL = new URL('https://www.youtube.com/oembed');
    fetchURL.searchParams.append('format', 'json');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchTwitter(url: string) {
    const fetchURL = new URL('https://publish.twitter.com/oembed');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchSoundCloud(url: string) {
    const fetchURL = new URL('https://www.soundcloud.com/oembed');
    fetchURL.searchParams.append('format', 'json');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchVimeo(url: string) {
    const fetchURL = new URL('https://vimeo.com/api/oembed.json');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchTikTok(url: string) {
    const fetchURL = new URL('https://www.tiktok.com/oembed');
    fetchURL.searchParams.append('format', 'json');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchSpotify(url: string) {
    const fetchURL = new URL('https://open.spotify.com/oembed');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },

  fetchCodePen(url: string) {
    const fetchURL = new URL('https://codepen.io/api/oembed');
    fetchURL.searchParams.append('format', 'json');
    fetchURL.searchParams.append('url', url);
    return fetchURL;
  },
});

export default service;
