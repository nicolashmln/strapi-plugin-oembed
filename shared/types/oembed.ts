import type { OembedData } from '@extractus/oembed-extractor';

export type Oembed = {
  url: string;
  oembed: OembedData;
  thumbnail: string;
};
