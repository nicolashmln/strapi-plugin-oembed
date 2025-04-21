import type { OembedData } from '@extractus/oembed-extractor';

const service = (/* { strapi }: { strapi: Core.Strapi } */) => ({
  async fetch(url: string) {
    const { extract } = await import('@extractus/oembed-extractor');

    try {
      new URL(url);
    } catch {
      return {
        error: 'The URL is invalid.',
      };
    }

    try {
      const rawOembed = await extract(url);
      const oembed = await this.postprocess(rawOembed);
      const thumbnail = await this.generateThumbnail(oembed);

      return {
        url,
        oembed,
        thumbnail,
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

  postprocess(oembed: OembedData) {
    if (oembed.provider_name === 'YouTube') {
      return this.postprocessYouTube(oembed);
    }

    return oembed;
  },

  /**
   * YouTube offers high resolution images
   */
  postprocessYouTube(oembed: OembedData) {
    const thumbnailUrl = oembed.thumbnail_url;
    if (!thumbnailUrl) {
      return null;
    }

    oembed.thumbnail_url =
      oembed.thumbnail_url.substring(0, thumbnailUrl.lastIndexOf('/') + 1) + 'maxresdefault.jpg';

    return oembed;
  },

  /**
   * For cookie privacy, download the thumbnail and store as an inline image.
   * This also gets around CSP issues.
   */
  async generateThumbnail(oembed: OembedData) {
    const thumbnailUrl = oembed.thumbnail_url;
    if (!thumbnailUrl) {
      return null;
    }

    return await this.generateBase64FromUrl(thumbnailUrl);
  },

  async generateBase64FromUrl(url: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const string = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type');
    return `data:${contentType};base64,${string}`;
  },
});

export default service;
